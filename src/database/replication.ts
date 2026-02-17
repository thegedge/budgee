import PouchDB from "pouchdb-browser";
import { db, rawDatabase } from "./db";

export async function testConnection(couchdbUrl: string): Promise<void> {
  const response = await fetch(`${couchdbUrl}/budgee`);
  if (response.status === 404) {
    throw new Error("Database 'budgee' does not exist on the remote server");
  }
  if (!response.ok) {
    throw new Error(`Server returned ${response.status} ${response.statusText}`);
  }
}

export function startReplication(couchdbUrl: string): () => void {
  const localDb = rawDatabase(db);
  const remote = new PouchDB(`${couchdbUrl}/budgee`);
  const sync = localDb.sync(remote, { live: true, retry: true });
  return () => sync.cancel();
}
