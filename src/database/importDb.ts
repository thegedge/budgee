import { db } from "./db";
import type { Account, DashboardChart, Merchant, MerchantRule, Tag, Transaction } from "./types";

interface DatabaseExport {
  transactions?: Transaction[];
  tags?: Tag[];
  merchants?: Merchant[];
  accounts?: Account[];
  merchantRules?: MerchantRule[];
  dashboardCharts?: DashboardChart[];
}

export async function importDatabase(file: File) {
  const text = await file.text();
  const data: DatabaseExport = JSON.parse(text);

  await db.transaction(
    "rw",
    [db.transactions, db.tags, db.merchants, db.accounts, db.merchantRules, db.dashboardCharts],
    async () => {
      await db.transactions.clear();
      await db.tags.clear();
      await db.merchants.clear();
      await db.accounts.clear();
      await db.merchantRules.clear();
      await db.dashboardCharts.clear();

      if (data.transactions?.length) await db.transactions.bulkAdd(data.transactions);
      if (data.tags?.length) await db.tags.bulkAdd(data.tags);
      if (data.merchants?.length) await db.merchants.bulkAdd(data.merchants);
      if (data.accounts?.length) await db.accounts.bulkAdd(data.accounts);
      if (data.merchantRules?.length) await db.merchantRules.bulkAdd(data.merchantRules);
      if (data.dashboardCharts?.length) await db.dashboardCharts.bulkAdd(data.dashboardCharts);
    },
  );
}
