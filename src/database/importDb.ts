import { db } from "./db";
import { clearDb } from "./pouchHelpers";
import type { Account, DashboardChart, Merchant, MerchantRule, Tag, Transaction } from "./types";

interface DatabaseExport {
  transactions?: Transaction[];
  tags?: Tag[];
  merchants?: Merchant[];
  accounts?: Account[];
  merchantRules?: MerchantRule[];
  dashboardCharts?: DashboardChart[];
}

function stripRev<T extends { _rev?: string }>(docs: T[]): T[] {
  return docs.map(({ _rev, ...rest }) => rest as T);
}

export async function importDatabase(file: File) {
  const text = await file.text();
  const data: DatabaseExport = JSON.parse(text);

  await clearDb(db.transactions);
  await clearDb(db.tags);
  await clearDb(db.merchants);
  await clearDb(db.accounts);
  await clearDb(db.merchantRules);
  await clearDb(db.dashboardCharts);

  if (data.transactions?.length) await db.transactions.bulkDocs(stripRev(data.transactions));
  if (data.tags?.length) await db.tags.bulkDocs(stripRev(data.tags));
  if (data.merchants?.length) await db.merchants.bulkDocs(stripRev(data.merchants));
  if (data.accounts?.length) await db.accounts.bulkDocs(stripRev(data.accounts));
  if (data.merchantRules?.length) await db.merchantRules.bulkDocs(stripRev(data.merchantRules));
  if (data.dashboardCharts?.length)
    await db.dashboardCharts.bulkDocs(stripRev(data.dashboardCharts));
}
