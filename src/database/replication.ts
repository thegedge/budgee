import PouchDB from "pouchdb-browser";
import { db, rawDatabase } from "./db";

export async function testConnection(couchdbUrl: string): Promise<void> {
  const remote = new PouchDB(`${couchdbUrl}/budgee`, { skip_setup: true });
  try {
    const info = await remote.info();
    if (!info.db_name) {
      throw new Error("Database 'budgee' does not exist on the remote server");
    }
  } catch (error: unknown) {
    const status =
      error instanceof Error && "status" in error
        ? (error as { status: number }).status
        : undefined;
    if (status === 404) {
      throw new Error("Database 'budgee' does not exist on the remote server");
    }
    throw error;
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
