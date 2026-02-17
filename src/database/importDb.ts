import { db } from "./db";
import { clearDb } from "./pouchHelpers";
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

function stripRev<T extends { _rev?: string }>(docs: T[]): T[] {
  return docs.map(({ _rev, ...rest }) => rest as T);
}

export async function importDatabase(file: File) {
  const text = await file.text();
  const data: DatabaseExport = JSON.parse(text);

  const { migrateExport } = await import("./migrations");
  const migrated = migrateExport(data);

  await clearDb(db.transactions);
  await clearDb(db.tags);
  await clearDb(db.merchants);
  await clearDb(db.accounts);
  await clearDb(db.merchantRules);
  await clearDb(db.dashboardCharts);
  await clearDb(db.dashboardTables);

  if (migrated.transactions?.length)
    await db.transactions.bulkDocs(stripRev(migrated.transactions));
  if (migrated.tags?.length) await db.tags.bulkDocs(stripRev(migrated.tags));
  if (migrated.merchants?.length) await db.merchants.bulkDocs(stripRev(migrated.merchants));
  if (migrated.accounts?.length) await db.accounts.bulkDocs(stripRev(migrated.accounts));
  if (migrated.merchantRules?.length)
    await db.merchantRules.bulkDocs(stripRev(migrated.merchantRules));
  if (migrated.dashboardCharts?.length)
    await db.dashboardCharts.bulkDocs(stripRev(migrated.dashboardCharts));
  if (migrated.dashboardTables?.length)
    await db.dashboardTables.bulkDocs(stripRev(migrated.dashboardTables));

  const meta = db.meta;
  try {
    const doc = await meta.get("schema_version");
    await meta.put({ ...doc, value: (await import("./migrations")).LATEST_VERSION });
  } catch {
    const { LATEST_VERSION } = await import("./migrations");
    await meta.put({ _id: "schema_version", value: LATEST_VERSION });
  }
}
