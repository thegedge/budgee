import type { RxCollection } from "rxdb/plugins/core";
import type { RxReplicationState } from "rxdb/plugins/replication";
import { replicateRxCollection } from "rxdb/plugins/replication";
import { randomToken } from "rxdb/plugins/utils";
import ReconnectingWebSocket from "reconnecting-websocket";
import { BehaviorSubject, Subject, filter, firstValueFrom, map } from "rxjs";
import type { DatabaseCollections } from "./db";
import { waitForDb } from "./db";

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

interface WebsocketMessage {
  id: string;
  collection: string;
  result: unknown;
}

function createWebSocketClient(url: string) {
  const wsClient = new ReconnectingWebSocket(url, [], { WebSocket });
  const connected$ = new BehaviorSubject(false);
  const message$ = new Subject<WebsocketMessage>();

  wsClient.onerror = (err) => {
    console.warn("WebSocket error:", err);
  };

  const ready = new Promise<void>((res) => {
    wsClient.onopen = () => {
      connected$.next(true);
      res();
    };
  });

  wsClient.onclose = () => {
    connected$.next(false);
  };

  wsClient.onmessage = (messageObj) => {
    message$.next(JSON.parse(messageObj.data as string) as WebsocketMessage);
  };

  return { wsClient, connected$, message$, ready };
}

function replicateCollection(
  collection: RxCollection,
  topic: string,
  wsUrl: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<RxReplicationState<any, any>> {
  const { wsClient, connected$, message$, ready } = createWebSocketClient(wsUrl);

  let requestCounter = 0;
  const requestFlag = randomToken(10);

  function requestId() {
    return `${collection.database.token}|${requestFlag}|${requestCounter++}`;
  }

  const replicationState = replicateRxCollection({
    collection,
    replicationIdentifier: topic,
    live: true,
    pull: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stream$: message$.pipe(
        filter((msg) => msg.id === "stream" && msg.collection === collection.name),
        map((msg) => msg.result),
      ) as any,
      async handler(lastPulledCheckpoint, batchSize) {
        const id = requestId();
        wsClient.send(
          JSON.stringify({
            id,
            collection: collection.name,
            method: "masterChangesSince",
            params: [lastPulledCheckpoint, batchSize],
          }),
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return firstValueFrom(
          message$.pipe(
            filter((msg) => msg.id === id),
            map((msg) => msg.result),
          ),
        ) as any;
      },
    },
    push: {
      handler(docs) {
        const id = requestId();
        wsClient.send(
          JSON.stringify({
            id,
            collection: collection.name,
            method: "masterWrite",
            params: [docs],
          }),
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return firstValueFrom(
          message$.pipe(
            filter((msg) => msg.id === id),
            map((msg) => msg.result),
          ),
        ) as any;
      },
    },
  });

  connected$.subscribe((isConnected) => {
    if (isConnected) {
      replicationState.reSync();
      wsClient.send(
        JSON.stringify({
          id: "stream",
          collection: collection.name,
          method: "masterChangeStream$",
          params: [],
        }),
      );
    }
  });

  collection.onClose.push(() => wsClient.close());

  return ready.then(() => replicationState);
}

export async function startReplication(serverUrl: string): Promise<() => void> {
  const dbs = await waitForDb();
  const rxdb = dbs.rxdb;

  const wsUrl = serverUrl.replace(/^http/, "ws") + "/ws";

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

      return replicateCollection(collection, topic, wsUrl);
    }),
  );

  return async () => {
    await Promise.all(replications.map((r) => r.cancel().catch(console.error)));
  };
}
