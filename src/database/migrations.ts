import PouchDB from "pouchdb-browser";
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
  await pruneBackups(dbs, 10);
}

async function pruneBackups(dbs: Databases, keepCount: number) {
  const allBackups = await allDocs(dbs.backups);
  if (allBackups.length <= keepCount) {
    return;
  }

  // IDs are lexicographically sortable (ISO timestamps), so sort descending to keep newest
  const sorted = allBackups.sort((a, b) => b._id.localeCompare(a._id));
  const toDelete = sorted.slice(keepCount);
  for (const doc of toDelete) {
    await dbs.backups.remove(doc);
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

const OLD_DB_NAMES = [
  "budgee_transactions",
  "budgee_tags",
  "budgee_merchants",
  "budgee_accounts",
  "budgee_merchant_rules",
  "budgee_dashboard_charts",
  "budgee_dashboard_tables",
] as const;

const OLD_DB_KEY_MAP: Record<string, keyof DatabaseExport> = {
  budgee_transactions: "transactions",
  budgee_tags: "tags",
  budgee_merchants: "merchants",
  budgee_accounts: "accounts",
  budgee_merchant_rules: "merchantRules",
  budgee_dashboard_charts: "dashboardCharts",
  budgee_dashboard_tables: "dashboardTables",
};

async function migrateFromMultiDb(dbs: Databases): Promise<boolean> {
  const oldMetaDb = new PouchDB("budgee_meta");
  let hadData = false;

  try {
    const metaResult = await oldMetaDb.allDocs({ include_docs: true });
    if (metaResult.rows.length === 0) {
      return false;
    }

    hadData = true;
    console.log("[migrate] Found old multi-database layout, migrating to single database");

    // Read old version
    try {
      const versionDoc = (await oldMetaDb.get("schema_version")) as unknown as Record<
        string,
        unknown
      >;
      const version = versionDoc.value as number;
      await setVersion(dbs, version);
    } catch {
      // No version doc in old meta
    }

    // Copy data from each old database
    for (const oldName of OLD_DB_NAMES) {
      const key = OLD_DB_KEY_MAP[oldName];
      const oldDb = new PouchDB(oldName);
      try {
        const result = await oldDb.allDocs({ include_docs: true });
        const docs = result.rows
          .filter((row) => row.doc && !row.id.startsWith("_design/"))
          .map((row) => {
            const { _rev, ...rest } = row.doc as unknown as Record<string, unknown>;
            return rest;
          });

        if (docs.length > 0) {
          const collection = dbs[key as keyof Databases];
          await (collection as Databases["transactions"]).bulkDocs(
            docs as unknown as Parameters<Databases["transactions"]["bulkDocs"]>[0],
          );
          console.log(`[migrate] Copied ${docs.length} docs from ${oldName}`);
        }
      } finally {
        await oldDb.destroy();
      }
    }

    // Copy backups
    const oldBackupsDb = new PouchDB("budgee_backups");
    try {
      const result = await oldBackupsDb.allDocs({ include_docs: true });
      const docs = result.rows
        .filter((row) => row.doc && !row.id.startsWith("_design/"))
        .map((row) => {
          const { _rev, ...rest } = row.doc as unknown as Record<string, unknown>;
          return rest;
        });
      if (docs.length > 0) {
        await dbs.backups.bulkDocs(docs as Parameters<typeof dbs.backups.bulkDocs>[0]);
      }
    } finally {
      await oldBackupsDb.destroy();
    }

    // Destroy old meta db
    await oldMetaDb.destroy();
    console.log("[migrate] Old databases removed");
  } catch {
    // Old databases don't exist or are empty, nothing to migrate
    try {
      await oldMetaDb.destroy();
    } catch {
      // ignore
    }
    return false;
  }

  return hadData;
}

export async function migrateDatabase(dbs: Databases) {
  // First, check if we need to migrate from old multi-db layout
  await migrateFromMultiDb(dbs);

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
