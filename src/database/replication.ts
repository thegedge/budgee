import { BehaviorSubject, type Observable, combineLatest, map, merge, of, switchMap } from "rxjs";
import type { RxCollection } from "rxdb/plugins/core";
import type { RxReplicationState } from "rxdb/plugins/replication";
import { replicateWithWebsocketServer } from "rxdb/plugins/replication-websocket";
import type { DatabaseCollections } from "./db";
import { waitForDb } from "./db";

export type SyncStatus = "not-configured" | "connecting" | "syncing" | "synced" | "error";

export async function testConnection(serverUrl: string): Promise<void> {
  const response = await fetch(`${serverUrl}/health`);
  if (!response.ok) {
    throw new Error(`Server returned ${response.status} ${response.statusText}`);
  }
}

const SYNCABLE_COLLECTIONS: (keyof DatabaseCollections)[] = [
  "transactions",
  "tags",
  "merchants",
  "accounts",
  "merchant_rules",
  "dashboard_charts",
  "dashboard_tables",
];

type ReplicationStatus =
  | { state: "not-configured" }
  | { state: "connecting" }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { state: "connected"; replications: RxReplicationState<any, any>[] };

const replicationStatus$ = new BehaviorSubject<ReplicationStatus>({ state: "not-configured" });

export const syncStatus$: Observable<SyncStatus> = replicationStatus$.pipe(
  switchMap((status) => {
    if (status.state === "not-configured") return of("not-configured" as const);
    if (status.state === "connecting") return of("connecting" as const);

    const { replications } = status;
    const errors$ = merge(...replications.map((r) => r.error$)).pipe(map(() => "error" as const));
    const active$ = combineLatest(replications.map((r) => r.active$)).pipe(
      map((actives) => (actives.some(Boolean) ? ("syncing" as const) : ("synced" as const))),
    );

    return merge(active$, errors$);
  }),
);

export async function startReplication(serverUrl: string): Promise<() => void> {
  replicationStatus$.next({ state: "connecting" });

  const dbs = await waitForDb();
  const rxdb = dbs.rxdb;

  const wsBaseUrl = serverUrl.replace(/^http/, "ws") + "/ws";

  const replications = await Promise.all(
    SYNCABLE_COLLECTIONS.map(async (collectionName) => {
      const collection: RxCollection = rxdb[collectionName];
      const topic = `budgee--${collectionName}`;

      try {
        await fetch(`${serverUrl}/databases`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, schema: collection.schema.jsonSchema }),
        });
      } catch (e) {
        console.warn(`Failed to register schema for ${collectionName}:`, e);
      }

      return replicateWithWebsocketServer({
        collection,
        replicationIdentifier: topic,
        url: `${wsBaseUrl}/${topic}`,
        live: true,
      });
    }),
  );

  replicationStatus$.next({ state: "connected", replications });

  return async () => {
    replicationStatus$.next({ state: "not-configured" });
    await Promise.all(replications.map((r) => r.cancel().catch(console.error)));
  };
}
