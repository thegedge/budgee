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

interface MygardCheckpoint {
  seq: number;
}

interface RpcResponse {
  id: string;
  result?: unknown;
  error?: string;
}

interface PullResult {
  documents: Record<string, unknown>[];
  checkpoint: MygardCheckpoint;
}

let rpcCounter = 0;

function nextId(): string {
  return `rpc-${++rpcCounter}`;
}

export async function startMygardReplication(
  serverUrl: string,
  rxdb: RxDatabase<DatabaseCollections>,
): Promise<() => Promise<void>> {
  const wsUrl = serverUrl.replace(/^http/, "ws") + "/ws";

  // Pending RPC responses keyed by message id
  const pending = new Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();

  // Per-collection stream subjects
  const streamSubjects = new Map<
    string,
    Subject<{ documents: Record<string, unknown>[]; checkpoint: MygardCheckpoint }>
  >();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const replications: RxReplicationState<any, any>[] = [];
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

    // Stream event from server
    if (msg.id === "stream") {
      const result = msg.result as PullResult | undefined;
      if (!result) return;
      for (const [nsid, subject] of streamSubjects) {
        const filtered = result.documents.filter((d) => d.collection === nsid);
        if (filtered.length > 0) {
          const stripped = filtered.map((d) => {
            const { collection: _, ...rest } = d;
            return rest;
          });
          subject.next({ documents: stripped, checkpoint: result.checkpoint });
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

  function subscribe(): void {
    const id = "subscribe";
    ws.send(JSON.stringify({ id, method: "stream", params: [] }));
  }

  function connect(): void {
    ws = new WebSocket(wsUrl);

    ws.addEventListener("message", onMessage);

    ws.addEventListener("open", () => {
      // Re-subscribe to stream and resync all replications
      subscribe();
      for (const rep of replications) {
        rep.reSync();
      }
    });

    ws.addEventListener("close", () => {
      if (!closed) {
        // Reject all pending RPCs
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

  // Set up per-collection replications before connecting
  for (const collectionName of SYNCABLE_COLLECTIONS) {
    const nsid = COLLECTION_TO_NSID[collectionName];
    const collection: RxCollection = rxdb[collectionName];

    const streamSubject = new Subject<{
      documents: Record<string, unknown>[];
      checkpoint: MygardCheckpoint;
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
          checkpoint: MygardCheckpoint | undefined,
          batchSize: number,
        ): Promise<{ documents: Record<string, unknown>[]; checkpoint: MygardCheckpoint }> {
          const result = (await sendRpc("pull", [
            checkpoint ?? null,
            batchSize,
            nsid,
          ])) as PullResult;
          // Strip the collection field from each document
          const documents = result.documents.map((d) => {
            const { collection: _, ...rest } = d;
            return rest;
          });
          return { documents, checkpoint: result.checkpoint };
        },
      },
      push: {
        batchSize: 100,
        async handler(
          docs: {
            newDocumentState: Record<string, unknown>;
            assumedMasterState?: Record<string, unknown>;
          }[],
        ): Promise<Record<string, unknown>[]> {
          const enriched = docs.map((d) => ({
            ...d.newDocumentState,
            collection: nsid,
          }));
          const conflicts = (await sendRpc("push", [enriched])) as Record<string, unknown>[];
          return conflicts;
        },
      },
    });

    replications.push(replication);
  }

  // Now connect the WebSocket (replications are ready to handle events)
  connect();

  // Return cleanup function
  return async () => {
    closed = true;
    if (reconnectTimer !== undefined) {
      clearTimeout(reconnectTimer);
    }
    await Promise.all(replications.map((r) => r.cancel().catch(console.error)));
    for (const subject of streamSubjects.values()) {
      subject.complete();
    }
    ws.close();
  };
}
