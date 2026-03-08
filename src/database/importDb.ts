import { db as getDb, type Databases } from "./Db";
import { uuid } from "../uuid";
import type {
  AccountRecord,
  DashboardChartRecord,
  DashboardTableRecord,
  MerchantRecord,
  MerchantRuleRecord,
  TagRecord,
  TransactionRecord,
} from "./types";

export interface DatabaseExport {
  version?: number;
  transactions?: TransactionRecord[];
  tags?: TagRecord[];
  merchants?: MerchantRecord[];
  accounts?: AccountRecord[];
  merchantRules?: MerchantRuleRecord[];
  dashboardCharts?: DashboardChartRecord[];
  dashboardTables?: DashboardTableRecord[];
}

const COLLECTION_KEYS: readonly (keyof DatabaseExport)[] = [
  "transactions",
  "tags",
  "merchants",
  "accounts",
  "merchantRules",
  "dashboardCharts",
  "dashboardTables",
] as const;

/**
 * Validates that the parsed JSON has the expected shape for a database export.
 * Throws a descriptive error if validation fails.
 */
function validateExportShape(data: unknown): asserts data is DatabaseExport {
  if (data == null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Invalid import file: expected a JSON object at the top level.");
  }
  const record = data as Record<string, unknown>;
  for (const key of COLLECTION_KEYS) {
    if (key in record && !Array.isArray(record[key])) {
      throw new Error(
        `Invalid import file: expected "${key}" to be an array, got ${typeof record[key]}.`,
      );
    }
  }
}

/**
 * Clears all data collections and bulk-inserts the provided data.
 */
export async function clearAndImport(dbs: Databases, data: DatabaseExport): Promise<void> {
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

/**
 * Exports all current data from the database collections.
 */
export async function exportCurrentData(dbs: Databases): Promise<DatabaseExport> {
  const { LATEST_VERSION } = await import("./migrations");
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

/**
 * Saves a backup of the provided data, pruning old backups to keep at most `keepCount`.
 */
export async function saveBackup(
  dbs: Databases,
  data: DatabaseExport,
  keepCount = 10,
): Promise<void> {
  const id = `backup_${new Date().toISOString()}`;
  await dbs.backups.put({ id, data: JSON.stringify(data) });

  const allBackups = await dbs.backups.all();
  if (allBackups.length > keepCount) {
    const sorted = allBackups.sort((a, b) => b.id.localeCompare(a.id));
    const toDelete = sorted.slice(keepCount);
    for (const doc of toDelete) {
      await dbs.backups.remove(doc.id);
    }
  }
}

/**
 * Ensures every document has a string `id`. Returns the documents and a mapping
 * from old id to new id for any documents that needed a generated id.
 */
function ensureIds<T extends { id: string }>(
  docs: T[] | undefined,
): { docs: T[]; idMap: Map<string, string> } {
  if (!docs) return { docs: [], idMap: new Map() };
  const idMap = new Map<string, string>();
  const result = docs.map((doc) => {
    if (doc.id) return doc;
    const raw = doc as Record<string, unknown>;
    const oldId = String(raw._id ?? "");
    const newId = uuid();
    if (oldId) idMap.set(oldId, newId);
    return { ...doc, id: newId };
  });
  return { docs: result, idMap };
}

function remapId(idMap: Map<string, string>, id: string | undefined): string | undefined {
  if (!id) return id;
  return idMap.get(id) ?? id;
}

function remapIds(idMap: Map<string, string>, ids: string[] | undefined): string[] | undefined {
  if (!ids) return ids;
  return ids.map((id) => idMap.get(id) ?? id);
}

export async function importDatabase(file: File) {
  const text = await file.text();
  const parsed: unknown = JSON.parse(text);

  validateExportShape(parsed);
  const data: DatabaseExport = parsed;

  const { migrateExport, LATEST_VERSION } = await import("./migrations");
  const migrated = migrateExport(data);

  const db = await getDb();

  // Save a backup of current data before clearing
  const currentData = await exportCurrentData(db);
  await saveBackup(db, currentData);

  const { docs: tags, idMap: tagIdMap } = ensureIds(migrated.tags);
  const { docs: merchants, idMap: merchantIdMap } = ensureIds(migrated.merchants);
  const { docs: accounts, idMap: accountIdMap } = ensureIds(migrated.accounts);

  const needsRemap = tagIdMap.size > 0 || merchantIdMap.size > 0 || accountIdMap.size > 0;

  const { docs: transactions } = ensureIds(migrated.transactions);
  const { docs: merchantRules } = ensureIds(migrated.merchantRules);
  const { docs: dashboardCharts } = ensureIds(migrated.dashboardCharts);
  const { docs: dashboardTables } = ensureIds(migrated.dashboardTables);

  if (needsRemap) {
    for (const tx of transactions) {
      tx.merchantId = remapId(merchantIdMap, tx.merchantId);
      tx.accountId = remapId(accountIdMap, tx.accountId);
      tx.tagIds = remapIds(tagIdMap, tx.tagIds) ?? tx.tagIds;
    }
    for (const rule of merchantRules) {
      rule.merchantId = remapId(merchantIdMap, rule.merchantId);
      rule.tagIds = remapIds(tagIdMap, rule.tagIds) ?? rule.tagIds;
    }
    for (const chart of dashboardCharts) {
      chart.tagId = remapId(tagIdMap, chart.tagId);
      chart.merchantId = remapId(merchantIdMap, chart.merchantId);
      chart.excludedTagIds = remapIds(tagIdMap, chart.excludedTagIds);
      chart.excludedMerchantIds = remapIds(merchantIdMap, chart.excludedMerchantIds);
    }
  }

  await clearAndImport(db, {
    transactions,
    tags,
    merchants,
    accounts,
    merchantRules,
    dashboardCharts,
    dashboardTables,
  });

  try {
    const doc = await db.meta.get("schema_version");
    await db.meta.put({ ...doc, value: LATEST_VERSION });
  } catch {
    await db.meta.put({ id: "schema_version", value: LATEST_VERSION });
  }
}
