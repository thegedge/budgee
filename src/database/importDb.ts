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

function ensureIds<T extends { id: string }>(docs: T[] | undefined): T[] {
  if (!docs) return [];
  return docs.map((doc) => (doc.id ? doc : { ...doc, id: uuid() }));
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

  const transactions = ensureIds(migrated.transactions);
  const tags = ensureIds(migrated.tags);
  const merchants = ensureIds(migrated.merchants);
  const accounts = ensureIds(migrated.accounts);
  const merchantRules = ensureIds(migrated.merchantRules);
  const dashboardCharts = ensureIds(migrated.dashboardCharts);
  const dashboardTables = ensureIds(migrated.dashboardTables);

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
