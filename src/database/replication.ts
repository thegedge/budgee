export async function testConnection(couchdbUrl: string): Promise<void> {
  const response = await fetch(`${couchdbUrl}/budgee`);
  if (response.status === 404) {
    throw new Error("Database 'budgee' does not exist on the remote server");
  }
  if (!response.ok) {
    throw new Error(`Server returned ${response.status} ${response.statusText}`);
  }
}

export function startReplication(_couchdbUrl: string): () => void {
  // TODO: Implement CouchDB replication with RxDB replication plugin
  console.warn("CouchDB replication is not yet implemented with RxDB");
  return () => {};
}
