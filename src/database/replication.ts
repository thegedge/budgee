import PouchDB from "pouchdb-browser";
import { db, rawDatabase } from "./db";

export function startReplication(couchdbUrl: string): () => void {
  const localDb = rawDatabase(db);
  const remote = new PouchDB(`${couchdbUrl}/budgee`);
  const sync = localDb.sync(remote, { live: true, retry: true });
  return () => sync.cancel();
}
