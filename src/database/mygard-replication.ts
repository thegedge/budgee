import { Subject } from "rxjs";
import type { RxCollection, RxDatabase } from "rxdb/plugins/core";
import { replicateRxCollection, type RxReplicationState } from "rxdb/plugins/replication";
import type { DatabaseCollections } from "./Db";
import { setKnownDids } from "../knownDids.svelte";
import { showToast } from "../ui/shared/toast";

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

// Reverse map: Lexicon NSID → RxDB collection name
const NSID_TO_COLLECTION: Record<string, keyof DatabaseCollections> = Object.fromEntries(
  Object.entries(COLLECTION_TO_NSID).map(([k, v]) => [v, k as keyof DatabaseCollections]),
) as Record<string, keyof DatabaseCollections>;

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
  v?: number;
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
}

interface PullResult {
  documents: Record<string, unknown>[];
  checkpoint: MygardCheckpoint | OwnerCheckpoint;
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
  const lastPullCheckpoints = new Map<string, OwnerCheckpoint>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let replications: RxReplicationState<any, any>[] = [];
  let ws: WebSocket;
  let closed = false;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

  function onMessage(event: MessageEvent): void {
    let msg: RpcResponse;
    try {
      msg = JSON.parse(String(event.data));
    } catch {
      return;
    }

    // capability_revoked event from server
    if (msg.id === "stream" && msg.type === "capability_revoked") {
      const event = msg as unknown as {
        capability: { subject: string; object: string };
        remainingGrants: { object: string; permission: string }[];
      };
      console.log("[mygard] capability revoked:", event.capability.object);
      removeRevokedDocs(
        event.capability.subject,
        event.capability.object,
        event.remainingGrants,
      ).catch((err) => console.error("[mygard] revocation cleanup failed:", err));
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
            const { collection: _, _rev: __, ...rest } = d;
            if (rest._owner) {
              rest.id = `${rest._owner}~${rest.id}`;
            }
            return rest;
          });
          const hasSharedDocs = stripped.some((d) => d._owner);
          // For shared doc events the server checkpoint is the owner's seq, not
          // ours.  Use the last pull checkpoint (per-collection) so we don't
          // corrupt our own seq — only bump `v` to signal new data to RxDB.
          const base = hasSharedDocs
            ? (lastPullCheckpoints.get(nsid) ?? { seq: 0 })
            : ownCheckpoint;
          const checkpoint: OwnerCheckpoint = hasSharedDocs
            ? { ...base, v: (base.v ?? 0) + 1 }
            : ownCheckpoint;
          subject.next({ documents: stripped, checkpoint });
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

  /**
   * Remove local docs that are no longer accessible after a capability revocation.
   *
   * Shared docs are stored with id `${ownerDid}~${rkey}`. When a capability is
   * revoked, we remove docs from the affected collection unless they're still
   * covered by a remaining grant.
   */
  function effectivePermission(
    remainingGrants: { object: string; permission: string }[],
    nsid: string,
    ownerDid: string,
    rkey: string,
  ): string | null {
    const RANK: Record<string, number> = { read: 0, write: 1, admin: 2 };
    let best: string | null = null;
    const recordUri = `at://${ownerDid}/${nsid}/${rkey}`;
    for (const g of remainingGrants) {
      if (g.object !== nsid && g.object !== recordUri) continue;
      if (!best || (RANK[g.permission] ?? 0) > (RANK[best] ?? 0)) best = g.permission;
    }
    return best;
  }

  async function removeRevokedDocs(
    ownerDid: string,
    revokedObject: string,
    remainingGrants: { object: string; permission: string }[],
  ): Promise<void> {
    // Parse the revoked object to determine affected collection(s)
    let revokedNsid: string;
    let revokedRkey: string | undefined;

    if (revokedObject.startsWith("at://")) {
      const parts = revokedObject.slice(5).split("/");
      revokedNsid = parts.slice(1, -1).join("/");
      revokedRkey = parts[parts.length - 1]!;
    } else {
      revokedNsid = revokedObject;
    }

    const collectionName = NSID_TO_COLLECTION[revokedNsid];
    if (!collectionName) return;

    const collection: RxCollection = rxdb[collectionName];
    const prefix = `${ownerDid}~`;

    if (revokedRkey) {
      // Record-specific revocation — only affects that one doc
      const docId = `${prefix}${revokedRkey}`;
      const newPerm = effectivePermission(remainingGrants, revokedNsid, ownerDid, revokedRkey);

      if (newPerm === null) {
        const doc = await collection.findOne(docId).exec();
        if (doc) {
          await doc.remove();
          console.log(`[mygard] removed revoked doc ${docId} from ${collectionName}`);
        }
      } else {
        const doc = await collection.findOne(docId).exec();
        if (doc) {
          const current = (doc.toJSON(true) as Record<string, unknown>)._permission as
            | string
            | undefined;
          if (current !== newPerm) {
            await doc.incrementalPatch({ _permission: newPerm } as never);
            const RANK: Record<string, number> = { read: 0, write: 1, admin: 2 };
            if ((RANK[current ?? ""] ?? 0) > (RANK[newPerm] ?? 0)) {
              showToast({
                message: "Edit access revoked \u2014 record is now read-only",
                type: "info",
              });
            }
          }
        }
      }
    } else {
      // Collection-wide revocation — check each doc from this owner
      const allDocs = await collection.find().exec();
      const toRemove: string[] = [];

      for (const doc of allDocs) {
        const id = doc.primary as string;
        if (!id.startsWith(prefix)) continue;

        const rkey = id.slice(prefix.length);
        const newPerm = effectivePermission(remainingGrants, revokedNsid, ownerDid, rkey);

        if (newPerm === null) {
          toRemove.push(id);
        } else {
          const current = (doc.toJSON(true) as Record<string, unknown>)._permission as
            | string
            | undefined;
          if (current !== newPerm) {
            await doc.incrementalPatch({ _permission: newPerm } as never);
          }
        }
      }

      if (toRemove.length > 0) {
        await collection.bulkRemove(toRemove);
        console.log(`[mygard] removed ${toRemove.length} revoked doc(s) from ${collectionName}`);
      }

      // Check if any docs were downgraded (not removed) and show a single toast
      const remainingDocs = await collection.find().exec();
      const downgraded = remainingDocs.some((doc) => {
        const id = doc.primary as string;
        if (!id.startsWith(prefix)) return false;
        const perm = (doc.toJSON(true) as Record<string, unknown>)._permission;
        return perm === "read";
      });
      if (downgraded && toRemove.length === 0) {
        showToast({
          message: "Edit access revoked \u2014 record is now read-only",
          type: "info",
        });
      }
    }
  }

  function createReplications(): void {
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
        replicationIdentifier: `mygard-${nsid}`,
        live: true,
        pull: {
          batchSize: 100,
          stream$: streamSubject.asObservable(),
          async handler(
            checkpoint: OwnerCheckpoint | undefined,
            batchSize: number,
          ): Promise<{ documents: Record<string, unknown>[]; checkpoint: OwnerCheckpoint }> {
            const ownCheckpoint = checkpoint ?? { seq: 0 };
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
              const { collection: _, _rev: __, ...rest } = d;
              if (rest._owner) {
                rest.id = `${rest._owner}~${rest.id}`;
              }
              return rest;
            });

            const hasSharedDocs = documents.some((d) => d._owner);
            const prevV = ownCheckpoint.v ?? 0;

            const pullCheckpoint: OwnerCheckpoint = {
              ...ownResult,
              v: hasSharedDocs ? prevV + 1 : prevV,
            };
            lastPullCheckpoints.set(nsid, pullCheckpoint);

            return { documents, checkpoint: pullCheckpoint };
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
      await subscribe();
      console.log("[mygard] connected");

      if (replications.length === 0) {
        createReplications();
        onReplications?.(replications);
      } else {
        for (const rep of replications) {
          rep.reSync();
        }
      }

      try {
        const dids = (await sendRpc("list_dids", [])) as string[];
        setKnownDids(dids);
      } catch {
        // Non-critical — share modal will still work with manual DID entry
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

  // Connect — replications are created after subscribe succeeds
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
