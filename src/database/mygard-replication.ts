import { Subject } from "rxjs";
import type { RxCollection, RxDatabase } from "rxdb/plugins/core";
import { replicateRxCollection, type RxReplicationState } from "rxdb/plugins/replication";
import type { DatabaseCollections } from "./Db";

// Map RxDB collection names to Lexicon NSIDs
const COLLECTION_TO_NSID: Record<string, string> = {
  transactions: "io.mygard.finance.transaction",
  tags: "io.mygard.finance.tag",
  merchants: "io.mygard.finance.merchant",
  accounts: "io.mygard.finance.account",
  merchant_rules: "io.mygard.finance.merchantRule",
  dashboard_charts: "io.mygard.finance.dashboardChart",
  dashboard_tables: "io.mygard.finance.dashboardTable",
};

const SYNCABLE_COLLECTIONS: (keyof DatabaseCollections)[] = [
  "transactions",
  "tags",
  "merchants",
  "accounts",
  "merchant_rules",
  "dashboard_charts",
  "dashboard_tables",
];

interface OwnerCheckpoint {
  seq: number;
  epoch?: string;
}

interface MygardCheckpoint {
  own: OwnerCheckpoint;
  shared?: Record<string, OwnerCheckpoint>;
}

interface RpcResponse {
  id: string;
  type?: string;
  result?: unknown;
  error?: string;
  epoch?: string;
}

interface PullResult {
  documents: Record<string, unknown>[];
  checkpoint: MygardCheckpoint | OwnerCheckpoint;
  epoch?: string;
}

interface SyncState {
  epoch: string;
  lastSyncedAt: number;
}

const SYNC_STATE_KEY = "mygard-sync-state";

function loadSyncState(): SyncState | null {
  try {
    const raw = localStorage.getItem(SYNC_STATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SyncState;
  } catch {
    return null;
  }
}

function saveSyncState(state: SyncState): void {
  try {
    localStorage.setItem(SYNC_STATE_KEY, JSON.stringify(state));
  } catch {
    console.warn("[mygard] failed to persist sync state");
  }
}

let rpcCounter = 0;

function nextId(): string {
  return `rpc-${++rpcCounter}`;
}

export async function startMygardReplication(opts: {
  serverUrl: string;
  token?: string;
  rxdb: RxDatabase<DatabaseCollections>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReplications?: (replications: RxReplicationState<any, any>[]) => void;
}): Promise<() => Promise<void>> {
  const { serverUrl, token, rxdb, onReplications } = opts;
  let wsUrl = serverUrl.replace(/^http/, "ws") + "/ws";
  if (token) wsUrl += `?token=${encodeURIComponent(token)}`;

  // Pending RPC responses keyed by message id
  const pending = new Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();

  // Per-collection stream subjects
  const streamSubjects = new Map<
    string,
    Subject<{ documents: Record<string, unknown>[]; checkpoint: OwnerCheckpoint }>
  >();

  let sharedCheckpoints: Record<string, OwnerCheckpoint> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let replications: RxReplicationState<any, any>[] = [];
  let ws: WebSocket;
  let closed = false;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
  let currentEpoch: string | undefined;
  let reconciling = false;

  function onMessage(event: MessageEvent): void {
    let msg: RpcResponse;
    try {
      msg = JSON.parse(String(event.data));
    } catch {
      return;
    }

    // epoch_reset event from server
    if (msg.id === "stream" && msg.type === "epoch_reset" && msg.epoch) {
      const newEpoch = msg.epoch;
      console.log(`[mygard] received epoch_reset, new epoch=${newEpoch}`);
      reconcileEpochChange(newEpoch).catch((err) =>
        console.error("[mygard] epoch_reset reconciliation failed:", err),
      );
      return;
    }

    // Stream event from server (normal document updates)
    if (msg.id === "stream" && !("ok" in ((msg.result as Record<string, unknown>) ?? {}))) {
      const result = msg.result as PullResult | undefined;
      if (!result) return;
      const serverCheckpoint = result.checkpoint;
      const ownCheckpoint = "own" in serverCheckpoint ? serverCheckpoint.own : serverCheckpoint;
      for (const [nsid, subject] of streamSubjects) {
        const filtered = result.documents.filter((d) => d.collection === nsid);
        if (filtered.length > 0) {
          const stripped = filtered.map((d) => {
            const { collection: _, ...rest } = d;
            if (rest._owner) {
              rest.id = `${rest._owner}/${rest.id}`;
            }
            return rest;
          });
          subject.next({ documents: stripped, checkpoint: ownCheckpoint });
        }
      }
      return;
    }

    // RPC response
    const entry = pending.get(msg.id);
    if (entry) {
      pending.delete(msg.id);
      if (msg.error) {
        entry.reject(new Error(msg.error));
      } else {
        entry.resolve(msg.result);
      }
    }
  }

  function sendRpc(method: string, params: unknown[]): Promise<unknown> {
    const id = nextId();
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      try {
        ws.send(JSON.stringify({ id, method, params }));
      } catch (err) {
        pending.delete(id);
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }

  function subscribe(): Promise<unknown> {
    const id = "subscribe";
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      try {
        ws.send(JSON.stringify({ id, method: "stream", params: [] }));
      } catch (err) {
        pending.delete(id);
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }

  /** Pull ALL server documents for a collection, paginating through results. */
  async function pullAllServerDocs(
    nsid: string,
    epoch: string,
    batchSize = 100,
  ): Promise<Record<string, unknown>[]> {
    const allDocs: Record<string, unknown>[] = [];
    let checkpoint: MygardCheckpoint = { own: { seq: 0, epoch } };

    while (true) {
      const result = (await sendRpc("pull", [checkpoint, batchSize, nsid])) as PullResult;
      for (const doc of result.documents) {
        if (doc._deleted) continue;
        const { collection: _, ...rest } = doc;
        allDocs.push(rest);
      }
      if (result.documents.length < batchSize) break;
      const serverCheckpoint = result.checkpoint;
      const ownCheckpoint = "own" in serverCheckpoint ? serverCheckpoint.own : serverCheckpoint;
      checkpoint = { own: { ...ownCheckpoint, epoch: result.epoch ?? epoch } };
    }

    return allDocs;
  }

  /**
   * Reconcile local state with the server after an epoch change.
   *
   * Follows git-like semantics:
   * - Docs on server but not locally → insert locally
   * - Docs on both sides, same content → no-op
   * - Docs on both sides, different content → update local to match server
   *   (or flag conflict if local was modified since lastSyncedAt)
   * - Docs locally but not on server:
   *   - Not modified since last sync → delete locally (server removed them)
   *   - Modified since last sync → CONFLICT (log for MVP)
   */
  async function reconcileEpochChange(newEpoch: string): Promise<void> {
    if (reconciling) {
      console.warn("[mygard] reconciliation already in progress, skipping");
      return;
    }
    reconciling = true;

    try {
      const savedState = loadSyncState();
      const lastSyncedAt = savedState?.lastSyncedAt ?? 0;
      const isFirstSync = !savedState;

      console.log(
        `[mygard] reconciling epoch change: ${currentEpoch ?? "none"} → ${newEpoch}` +
          (isFirstSync ? " (first sync)" : ""),
      );

      // 1. Tear down existing RxDB replications
      if (replications.length > 0) {
        await teardownReplications();
      }

      // 2. For each syncable collection, diff local vs server
      for (const collectionName of SYNCABLE_COLLECTIONS) {
        const nsid = COLLECTION_TO_NSID[collectionName]!;
        const collection: RxCollection = rxdb[collectionName];

        // Pull ALL server docs for this collection
        const serverDocs = await pullAllServerDocs(nsid, newEpoch);
        const serverDocMap = new Map<string, Record<string, unknown>>();
        for (const doc of serverDocs) {
          const id = doc.id as string;
          if (id) serverDocMap.set(id, doc);
        }

        // Load ALL local docs
        const localRxDocs = await collection.find().exec();
        const localDocMap = new Map<string, { json: Record<string, unknown>; lwt: number }>();
        for (const rxDoc of localRxDocs) {
          const json = rxDoc.toJSON(true) as Record<string, unknown>;
          const meta = rxDoc.toJSON(false) as Record<string, unknown>;
          const lwtRaw = (meta._meta as Record<string, unknown> | undefined)?.lwt;
          const lwt = typeof lwtRaw === "number" ? lwtRaw : 0;
          localDocMap.set(json.id as string, { json, lwt });
        }

        const toInsert: Record<string, unknown>[] = [];
        const toUpdate: Record<string, unknown>[] = [];
        const toDelete: string[] = [];
        const conflicts: { id: string; local: Record<string, unknown>; reason: string }[] = [];

        // (d) Docs on server but not locally → insert
        for (const [id, serverDoc] of serverDocMap) {
          if (!localDocMap.has(id)) {
            toInsert.push(serverDoc);
          }
        }

        // (e, f) Docs on both sides
        for (const [id, local] of localDocMap) {
          const serverDoc = serverDocMap.get(id);
          if (serverDoc) {
            // Compare content (ignoring RxDB metadata fields)
            const localClean = stripMeta(local.json);
            const serverClean = stripMeta(serverDoc);
            if (!shallowEqual(localClean, serverClean)) {
              // Content differs
              if (!isFirstSync && local.lwt > lastSyncedAt) {
                // Local was modified since last sync → conflict
                conflicts.push({
                  id,
                  local: local.json,
                  reason: "modified locally, differs on server",
                });
                // MVP: keep server version
                toUpdate.push(serverDoc);
              } else {
                toUpdate.push(serverDoc);
              }
            }
            // else: same content → no-op
          }
        }

        // (g) Docs locally but not on server
        for (const [id, local] of localDocMap) {
          if (!serverDocMap.has(id)) {
            if (!isFirstSync && local.lwt > lastSyncedAt) {
              // Modified locally since last sync but server deleted → conflict
              conflicts.push({
                id,
                local: local.json,
                reason: "modified locally, deleted on server",
              });
              // MVP: log and keep local version (will be pushed after replication starts)
            } else {
              // Not modified locally → server intentionally removed it
              toDelete.push(id);
            }
          }
        }

        // Log conflicts
        if (conflicts.length > 0) {
          console.warn(
            `[mygard] ${collectionName}: ${conflicts.length} conflict(s) during epoch reconciliation:`,
            conflicts.map((c) => `${c.id}: ${c.reason}`),
          );
        }

        // Apply changes
        if (toInsert.length > 0) {
          await collection.bulkUpsert(toInsert);
          console.log(`[mygard] ${collectionName}: inserted ${toInsert.length} docs from server`);
        }
        if (toUpdate.length > 0) {
          await collection.bulkUpsert(toUpdate);
          console.log(
            `[mygard] ${collectionName}: updated ${toUpdate.length} docs to match server`,
          );
        }
        if (toDelete.length > 0) {
          await collection.bulkRemove(toDelete);
          console.log(
            `[mygard] ${collectionName}: deleted ${toDelete.length} docs (server removed)`,
          );
        }
      }

      // 3. Persist new sync state
      currentEpoch = newEpoch;
      saveSyncState({ epoch: newEpoch, lastSyncedAt: Date.now() });

      // 4. Create new RxDB replications with the new epoch
      createReplications(newEpoch);
      onReplications?.(replications);

      console.log(`[mygard] epoch reconciliation complete, now on epoch=${newEpoch}`);
    } finally {
      reconciling = false;
    }
  }

  function createReplications(epoch: string): void {
    for (const collectionName of SYNCABLE_COLLECTIONS) {
      const nsid = COLLECTION_TO_NSID[collectionName];
      const collection: RxCollection = rxdb[collectionName];

      const streamSubject = new Subject<{
        documents: Record<string, unknown>[];
        checkpoint: OwnerCheckpoint;
      }>();
      streamSubjects.set(nsid, streamSubject);

      const replication = replicateRxCollection({
        collection,
        replicationIdentifier: `mygard-${nsid}-${epoch}`,
        live: true,
        pull: {
          batchSize: 100,
          stream$: streamSubject.asObservable(),
          async handler(
            checkpoint: OwnerCheckpoint | undefined,
            batchSize: number,
          ): Promise<{ documents: Record<string, unknown>[]; checkpoint: OwnerCheckpoint }> {
            const ownCheckpoint = checkpoint ?? { seq: 0, epoch };
            const compound: MygardCheckpoint = { own: ownCheckpoint, shared: sharedCheckpoints };
            const result = (await sendRpc("pull", [compound, batchSize, nsid])) as PullResult;

            const serverCheckpoint = result.checkpoint;
            if ("own" in serverCheckpoint) {
              if (serverCheckpoint.shared) {
                sharedCheckpoints = { ...sharedCheckpoints, ...serverCheckpoint.shared };
              }
            }

            const ownResult = "own" in serverCheckpoint ? serverCheckpoint.own : serverCheckpoint;

            const documents = result.documents.map((d) => {
              const { collection: _, ...rest } = d;
              if (rest._owner) {
                rest.id = `${rest._owner}/${rest.id}`;
              }
              return rest;
            });

            return {
              documents,
              checkpoint: { ...ownResult, epoch: result.epoch ?? epoch },
            };
          },
        },
        push: {
          batchSize: 1000,
          async handler(
            docs: {
              newDocumentState: Record<string, unknown>;
              assumedMasterState?: Record<string, unknown>;
            }[],
          ): Promise<Record<string, unknown>[]> {
            const ownDocs = docs.filter((d) => !d.newDocumentState._owner);
            const enriched = ownDocs.map((d) => ({
              ...d.newDocumentState,
              collection: nsid,
            }));
            if (enriched.length === 0) return [];
            const conflicts = (await sendRpc("push", [enriched])) as Record<string, unknown>[];
            return conflicts;
          },
        },
      });

      replications.push(replication);
    }
  }

  async function teardownReplications(): Promise<void> {
    await Promise.all(replications.map((r) => r.cancel().catch(console.error)));
    for (const subject of streamSubjects.values()) {
      subject.complete();
    }
    streamSubjects.clear();
    replications = [];
  }

  async function onOpen(): Promise<void> {
    try {
      const result = (await subscribe()) as { ok: boolean; epoch?: string; seq?: number };
      const epoch = result.epoch ?? "unknown";
      console.log(`[mygard] connected, epoch=${epoch}`);

      const savedState = loadSyncState();

      if (epoch !== currentEpoch) {
        // Epoch changed (or first connect)
        if (savedState && savedState.epoch !== epoch) {
          // We had a previous epoch and it differs → reconcile
          console.log(`[mygard] epoch changed (${savedState.epoch} → ${epoch}), reconciling`);
          await reconcileEpochChange(epoch);
        } else if (!savedState && currentEpoch && currentEpoch !== epoch) {
          // No saved state but in-memory epoch differs (reconnect scenario)
          await reconcileEpochChange(epoch);
        } else {
          // First connection ever, or saved epoch matches server → normal startup
          if (replications.length > 0) {
            await teardownReplications();
          }
          currentEpoch = epoch;
          createReplications(epoch);
          onReplications?.(replications);
          saveSyncState({ epoch, lastSyncedAt: Date.now() });
        }
      } else {
        // Same epoch — just resync existing replications
        for (const rep of replications) {
          rep.reSync();
        }
      }
    } catch (err) {
      console.error("[mygard] subscribe failed:", err);
    }
  }

  function connect(): void {
    ws = new WebSocket(wsUrl);

    ws.addEventListener("message", onMessage);

    ws.addEventListener("open", () => {
      onOpen().catch((err) => console.error("[mygard] open handler error:", err));
    });

    ws.addEventListener("close", () => {
      if (!closed) {
        for (const [, entry] of pending) {
          entry.reject(new Error("WebSocket closed"));
        }
        pending.clear();
        scheduleReconnect();
      }
    });

    ws.addEventListener("error", () => {
      // error fires before close, so close handler will do cleanup
    });
  }

  function scheduleReconnect(): void {
    if (closed) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = undefined;
      connect();
    }, 5000);
  }

  // Connect — replications are created after we receive the epoch
  connect();

  // Return cleanup function
  return async () => {
    closed = true;
    if (reconnectTimer !== undefined) {
      clearTimeout(reconnectTimer);
    }
    await teardownReplications();
    ws.close();
  };
}

/** Strip RxDB metadata fields for content comparison. */
function stripMeta(doc: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(doc)) {
    if (key === "_rev" || key === "_meta" || key === "_deleted" || key === "_attachments") continue;
    result[key] = value;
  }
  return result;
}

/** Shallow equality check for flat document objects. */
function shallowEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    const va = a[key];
    const vb = b[key];
    if (va === vb) continue;
    // Handle arrays and objects via JSON comparison
    if (typeof va === "object" && typeof vb === "object" && va !== null && vb !== null) {
      if (JSON.stringify(va) !== JSON.stringify(vb)) return false;
    } else {
      return false;
    }
  }
  return true;
}
