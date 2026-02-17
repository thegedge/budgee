import type { Databases } from "./db";
import type { DatabaseExport } from "./importDb";
import { migrateV0toV1 } from "./migrations/v0_dexie_to_pouchdb";
import { migrateV1toV2 } from "./migrations/v1_fix_orphaned_references";

type Migration = (data: DatabaseExport) => DatabaseExport;

const MIGRATIONS: Migration[] = [migrateV0toV1, migrateV1toV2];

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

async function exportCurrentData(dbs: Databases): Promise<DatabaseExport> {
  return {
    version: LATEST_VERSION,
    transactions: await dbs.transactions.all(),
    tags: await dbs.tags.all(),
    merchants: await dbs.merchants.all(),
    accounts: await dbs.accounts.all(),
    merchantRules: await dbs.merchantRules.all(),
    dashboardCharts: await dbs.dashboardCharts.all(),
    dashboardTables: await dbs.dashboardTables.all(),
  };
}

async function saveBackup(dbs: Databases, data: DatabaseExport) {
  const id = `backup_${new Date().toISOString()}`;
  await dbs.backups.put({ id, data: JSON.stringify(data) });
  await pruneBackups(dbs, 10);
}

async function pruneBackups(dbs: Databases, keepCount: number) {
  const allBackups = await dbs.backups.all();
  if (allBackups.length <= keepCount) {
    return;
  }

  const sorted = allBackups.sort((a, b) => b.id.localeCompare(a.id));
  const toDelete = sorted.slice(keepCount);
  for (const doc of toDelete) {
    await dbs.backups.remove(doc.id);
  }
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
  await dbs.meta.put({ id: "schema_version", value: version });
}

async function clearAndImport(dbs: Databases, data: DatabaseExport) {
  await dbs.transactions.clear();
  await dbs.tags.clear();
  await dbs.merchants.clear();
  await dbs.accounts.clear();
  await dbs.merchantRules.clear();
  await dbs.dashboardCharts.clear();
  await dbs.dashboardTables.clear();

  if (data.transactions?.length) await dbs.transactions.bulkDocs(data.transactions);
  if (data.tags?.length) await dbs.tags.bulkDocs(data.tags);
  if (data.merchants?.length) await dbs.merchants.bulkDocs(data.merchants);
  if (data.accounts?.length) await dbs.accounts.bulkDocs(data.accounts);
  if (data.merchantRules?.length) await dbs.merchantRules.bulkDocs(data.merchantRules);
  if (data.dashboardCharts?.length) await dbs.dashboardCharts.bulkDocs(data.dashboardCharts);
  if (data.dashboardTables?.length) await dbs.dashboardTables.bulkDocs(data.dashboardTables);
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
