import { waitForDb } from "./db";
import { uuid } from "../uuid";
import type {
  Account,
  DashboardChart,
  DashboardTable,
  Merchant,
  MerchantRule,
  Tag,
  Transaction,
} from "./types";

export interface DatabaseExport {
  version?: number;
  transactions?: Transaction[];
  tags?: Tag[];
  merchants?: Merchant[];
  accounts?: Account[];
  merchantRules?: MerchantRule[];
  dashboardCharts?: DashboardChart[];
  dashboardTables?: DashboardTable[];
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
  const data: DatabaseExport = JSON.parse(text);

  const { migrateExport, LATEST_VERSION } = await import("./migrations");
  const migrated = migrateExport(data);

  const db = await waitForDb();

  await db.transactions.clear();
  await db.tags.clear();
  await db.merchants.clear();
  await db.accounts.clear();
  await db.merchantRules.clear();
  await db.dashboardCharts.clear();
  await db.dashboardTables.clear();

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

  if (transactions.length) await db.transactions.bulkDocs(transactions);
  if (tags.length) await db.tags.bulkDocs(tags);
  if (merchants.length) await db.merchants.bulkDocs(merchants);
  if (accounts.length) await db.accounts.bulkDocs(accounts);
  if (merchantRules.length) await db.merchantRules.bulkDocs(merchantRules);
  if (dashboardCharts.length) await db.dashboardCharts.bulkDocs(dashboardCharts);
  if (dashboardTables.length) await db.dashboardTables.bulkDocs(dashboardTables);

  try {
    const doc = await db.meta.get("schema_version");
    await db.meta.put({ ...doc, value: LATEST_VERSION });
  } catch {
    await db.meta.put({ id: "schema_version", value: LATEST_VERSION });
  }
}
