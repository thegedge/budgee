import { clearAllCollections, db } from "./Db";

export interface RestoreResult {
  generation: number;
  restored: string[];
  skipped: string[];
  errors: Record<string, string>;
}

export async function backupDates(serverUrl: string): Promise<string[]> {
  const response = await fetch(`${serverUrl}/databases/backup-dates`);
  if (!response.ok) {
    throw new Error(`Failed to fetch backup dates: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as { dates: string[] };
  return data.dates;
}

export async function createSnapshot(serverUrl: string): Promise<string[]> {
  const response = await fetch(`${serverUrl}/databases/snapshot`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Failed to create snapshot: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as { status: string; created: string[] };
  return data.created;
}

export async function restoreBackup(serverUrl: string, date: string): Promise<RestoreResult> {
  const response = await fetch(`${serverUrl}/databases/restore-all`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date }),
  });
  if (!response.ok) {
    throw new Error(`Failed to restore backup: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as RestoreResult;

  const GENERATION_KEY = `budgee-sync-generation:${serverUrl}`;
  localStorage.setItem(GENERATION_KEY, String(data.generation));

  const dbs = await db();
  await clearAllCollections(dbs);

  return data;
}
