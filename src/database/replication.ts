import {
  BehaviorSubject,
  type Observable,
  combineLatest,
  filter,
  firstValueFrom,
  map,
  merge,
  of,
  switchMap,
} from "rxjs";
import type { RxCollection } from "rxdb/plugins/core";
import { replicateRxCollection, type RxReplicationState } from "rxdb/plugins/replication";
import { createWebSocketClient, type WebsocketClient } from "rxdb/plugins/replication-websocket";
import { randomToken } from "rxdb/plugins/utils";
import type { DatabaseCollections } from "./Db";
import { clearAllCollections, db } from "./Db";

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

export function buildTopic(collectionName: string, userLogin?: string | null): string {
  if (userLogin) {
    return `budgee--${userLogin}--${collectionName}`;
  }
  return `budgee--${collectionName}`;
}

export async function startReplication(
  serverUrl: string,
  userLogin?: string | null,
): Promise<() => void> {
  replicationStatus$.next({ state: "connecting" });

  const dbs = await db();
  const rxdb = dbs.rxdb;

  const wsBaseUrl = serverUrl.replace(/^http/, "ws") + "/ws";

  let serverGeneration = 0;

  const wsTopics = await Promise.all(
    SYNCABLE_COLLECTIONS.map(async (collectionName) => {
      const collection: RxCollection = rxdb[collectionName];
      const unNamespacedTopic = `budgee--${collectionName}`;

      let wsTopic = buildTopic(collectionName, userLogin);
      try {
        const response = await fetch(`${serverUrl}/databases`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: unNamespacedTopic, schema: collection.schema.jsonSchema }),
        });
        if (response.ok) {
          const data = (await response.json()) as { topic?: string; generation?: unknown };
          if (data.topic) wsTopic = data.topic;
          if (serverGeneration === 0 && typeof data.generation === "number") {
            serverGeneration = data.generation;
          }
        }
      } catch (e) {
        console.warn(`Failed to register schema for ${collectionName}:`, e);
      }

      return wsTopic;
    }),
  );

  const GENERATION_KEY = `budgee-sync-generation:${serverUrl}`;
  const stored = parseInt(localStorage.getItem(GENERATION_KEY) ?? "0", 10);
  if (serverGeneration !== stored) {
    await clearAllCollections(dbs);
    localStorage.setItem(GENERATION_KEY, String(serverGeneration));
  }

  const batchSize = 1000;
  const connections: {
    replication: RxReplicationState<unknown, unknown>;
    client: WebsocketClient;
  }[] = await Promise.all(
    wsTopics.map(async (wsTopic, i) => {
      const collection: RxCollection = rxdb[SYNCABLE_COLLECTIONS[i]];
      const url = `${wsBaseUrl}/${wsTopic}?gen=${serverGeneration}`;
      const client = await createWebSocketClient({
        collection,
        url,
        replicationIdentifier: `${wsTopic}:gen${serverGeneration}`,
      });
      const requestFlag = randomToken(10);
      let requestCounter = 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messages$ = client.message$ as Observable<any>;

      function sendRequest(method: string, params: unknown[]): Promise<unknown> {
        const id = `${collection.database.token}|${requestFlag}|${requestCounter++}`;
        client.socket.send(JSON.stringify({ id, collection: collection.name, method, params }));
        return firstValueFrom(
          messages$.pipe(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filter((msg: any) => msg.id === id),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map((msg: any) => msg.result),
          ),
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const replication: RxReplicationState<any, any> = replicateRxCollection({
        collection,
        replicationIdentifier: `${wsTopic}:gen${serverGeneration}`,
        live: true,
        pull: {
          batchSize,
          stream$: messages$.pipe(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filter((msg: any) => msg.id === "stream" && msg.collection === collection.name),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map((msg: any) => msg.result),
          ),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: (checkpoint, pullBatchSize) =>
            sendRequest("masterChangesSince", [checkpoint, pullBatchSize]) as any,
        },
        push: {
          batchSize,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: (docs) => sendRequest("masterWrite", [docs]) as any,
        },
      });

      client.error$.subscribe((err) => replication.subjects.error.next(err));
      client.connected$.subscribe((isConnected) => {
        if (isConnected) {
          replication.reSync();
          client.socket.send(
            JSON.stringify({
              id: "stream",
              collection: collection.name,
              method: "masterChangeStream$",
              params: [],
            }),
          );
        }
      });

      return { replication, client };
    }),
  );

  replicationStatus$.next({
    state: "connected",
    replications: connections.map((c) => c.replication),
  });

  return async () => {
    replicationStatus$.next({ state: "not-configured" });
    await Promise.all(
      connections.map(async ({ replication, client }) => {
        await replication.cancel().catch(console.error);
        client.socket.close();
      }),
    );
  };
}
