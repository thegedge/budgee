import PouchDB from "pouchdb-browser";
import { allDatabases, db } from "./db";

export function startReplication(couchdbUrl: string): () => void {
  const cancels = allDatabases(db).map((localDb) => {
    const remote = new PouchDB(`${couchdbUrl}/${localDb.name}`);
    const sync = localDb.sync(remote, { live: true, retry: true });
    return () => sync.cancel();
  });
  return () => cancels.forEach((c) => c());
}
