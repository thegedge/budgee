import type { Databases } from "./db";
import type { DatabaseExport } from "./importDb";
import { migrateV0toV1 } from "./migrations/v0_dexie_to_pouchdb";
import { allDocs, clearDb } from "./pouchHelpers";

type Migration = (data: DatabaseExport) => DatabaseExport;

const MIGRATIONS: Migration[] = [migrateV0toV1];

export const LATEST_VERSION = MIGRATIONS.length;

export function migrateExport(data: DatabaseExport): DatabaseExport {
  let version = data.version ?? 1;
  let result = data;

  while (version < LATEST_VERSION) {
    result = MIGRATIONS[version](result);
    version = result.version ?? version + 1;
  }

  return result;
}

function stripRev<T extends { _rev?: string }>(docs: T[]): Omit<T, "_rev">[] {
  return docs.map(({ _rev, ...rest }) => rest);
}

async function exportCurrentData(dbs: Databases): Promise<DatabaseExport> {
  return {
    version: LATEST_VERSION,
    transactions: stripRev(await allDocs(dbs.transactions)),
    tags: stripRev(await allDocs(dbs.tags)),
    merchants: stripRev(await allDocs(dbs.merchants)),
    accounts: stripRev(await allDocs(dbs.accounts)),
    merchantRules: stripRev(await allDocs(dbs.merchantRules)),
    dashboardCharts: stripRev(await allDocs(dbs.dashboardCharts)),
    dashboardTables: stripRev(await allDocs(dbs.dashboardTables)),
  };
}

async function saveBackup(dbs: Databases, data: DatabaseExport) {
  const id = `backup_${new Date().toISOString()}`;
  await dbs.backups.put({ _id: id, ...data } as Record<string, unknown> & { _id: string });
}

async function currentVersion(dbs: Databases): Promise<number | null> {
  try {
    const doc = await dbs.meta.get("schema_version");
    return doc.value;
  } catch {
    return null;
  }
}

async function setVersion(dbs: Databases, version: number) {
  try {
    const doc = await dbs.meta.get("schema_version");
    await dbs.meta.put({ ...doc, value: version });
  } catch {
    await dbs.meta.put({ _id: "schema_version", value: version });
  }
}

async function clearAndImport(dbs: Databases, data: DatabaseExport) {
  await clearDb(dbs.transactions);
  await clearDb(dbs.tags);
  await clearDb(dbs.merchants);
  await clearDb(dbs.accounts);
  await clearDb(dbs.merchantRules);
  await clearDb(dbs.dashboardCharts);
  await clearDb(dbs.dashboardTables);

  if (data.transactions?.length)
    await dbs.transactions.bulkDocs(
      data.transactions as Parameters<typeof dbs.transactions.bulkDocs>[0],
    );
  if (data.tags?.length)
    await dbs.tags.bulkDocs(data.tags as Parameters<typeof dbs.tags.bulkDocs>[0]);
  if (data.merchants?.length)
    await dbs.merchants.bulkDocs(data.merchants as Parameters<typeof dbs.merchants.bulkDocs>[0]);
  if (data.accounts?.length)
    await dbs.accounts.bulkDocs(data.accounts as Parameters<typeof dbs.accounts.bulkDocs>[0]);
  if (data.merchantRules?.length)
    await dbs.merchantRules.bulkDocs(
      data.merchantRules as Parameters<typeof dbs.merchantRules.bulkDocs>[0],
    );
  if (data.dashboardCharts?.length)
    await dbs.dashboardCharts.bulkDocs(
      data.dashboardCharts as Parameters<typeof dbs.dashboardCharts.bulkDocs>[0],
    );
  if (data.dashboardTables?.length)
    await dbs.dashboardTables.bulkDocs(
      data.dashboardTables as Parameters<typeof dbs.dashboardTables.bulkDocs>[0],
    );
}

export async function migrateDatabase(dbs: Databases) {
  const { readDexieData, deleteDexieDatabase } = await import("./migrations/v0_dexie_to_pouchdb");

  const dexieData = await readDexieData();
  const version = await currentVersion(dbs);

  if (!dexieData && version != null && version >= LATEST_VERSION) {
    return;
  }

  let data: DatabaseExport;
  if (dexieData) {
    data = dexieData;
    console.log("[migrate] Found Dexie data at version 0");
  } else {
    data = await exportCurrentData(dbs);
    data.version = version ?? 1;
    console.log(`[migrate] Current data at version ${data.version}`);
  }

  if ((data.version ?? 1) < LATEST_VERSION) {
    await saveBackup(dbs, data);
    console.log("[migrate] Backup saved");

    data = migrateExport(data);
    console.log(`[migrate] Migrated to version ${data.version}`);

    await clearAndImport(dbs, data);
  }

  await setVersion(dbs, LATEST_VERSION);

  if (dexieData) {
    deleteDexieDatabase();
    console.log("[migrate] Dexie database deleted");
  }

  console.log("[migrate] Migration complete");
}
