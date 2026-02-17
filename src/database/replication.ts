import { replicateWebRTC } from "rxdb/plugins/replication-webrtc";
import { getConnectionHandlerSimplePeer } from "rxdb/plugins/replication-webrtc";
import type { RxCollection } from "rxdb/plugins/core";
import { waitForDb } from "./db";
import type { DatabaseCollections } from "./db";

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

export async function startReplication(serverUrl: string): Promise<() => void> {
  const dbs = await waitForDb();
  const rxdb = dbs.rxdb;

  const wsUrl = serverUrl.replace(/^http/, "ws") + "/ws";

  const pools = await Promise.all(
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

      return replicateWebRTC({
        collection,
        topic,
        connectionHandlerCreator: getConnectionHandlerSimplePeer({ signalingServerUrl: wsUrl }),
        pull: {},
        push: {},
      });
    }),
  );

  return () => {
    for (const pool of pools) {
      pool.cancel().catch(console.error);
    }
  };
}
