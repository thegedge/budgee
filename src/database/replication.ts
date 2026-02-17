import PouchDB from "pouchdb-browser";
import { db, rawDatabase } from "./db";

export async function testConnection(couchdbUrl: string): Promise<void> {
  const remote = new PouchDB(`${couchdbUrl}/budgee`, { skip_setup: true });
  try {
    await remote.info();
  } finally {
    await remote.close();
  }
}

export function startReplication(couchdbUrl: string): () => void {
  const localDb = rawDatabase(db);
  const remote = new PouchDB(`${couchdbUrl}/budgee`);
  const sync = localDb.sync(remote, { live: true, retry: true });
  return () => sync.cancel();
}
