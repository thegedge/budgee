import { db } from "./db";
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

export async function importDatabase(file: File) {
  const text = await file.text();
  const data: DatabaseExport = JSON.parse(text);

  const { migrateExport, LATEST_VERSION } = await import("./migrations");
  const migrated = migrateExport(data);

  await db.transactions.clear();
  await db.tags.clear();
  await db.merchants.clear();
  await db.accounts.clear();
  await db.merchantRules.clear();
  await db.dashboardCharts.clear();
  await db.dashboardTables.clear();

  if (migrated.transactions?.length) await db.transactions.bulkDocs(migrated.transactions);
  if (migrated.tags?.length) await db.tags.bulkDocs(migrated.tags);
  if (migrated.merchants?.length) await db.merchants.bulkDocs(migrated.merchants);
  if (migrated.accounts?.length) await db.accounts.bulkDocs(migrated.accounts);
  if (migrated.merchantRules?.length) await db.merchantRules.bulkDocs(migrated.merchantRules);
  if (migrated.dashboardCharts?.length) await db.dashboardCharts.bulkDocs(migrated.dashboardCharts);
  if (migrated.dashboardTables?.length) await db.dashboardTables.bulkDocs(migrated.dashboardTables);

  try {
    const doc = await db.meta.get("schema_version");
    await db.meta.put({ ...doc, value: LATEST_VERSION });
  } catch {
    await db.meta.put({ id: "schema_version", value: LATEST_VERSION });
  }
}
