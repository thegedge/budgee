import { db } from "./db";
import { LATEST_VERSION } from "./migrations";

export async function exportDatabase() {
  const data = {
    version: LATEST_VERSION,
    transactions: await db.transactions.all(),
    tags: await db.tags.all(),
    merchants: await db.merchants.all(),
    accounts: await db.accounts.all(),
    merchantRules: await db.merchantRules.all(),
    dashboardCharts: await db.dashboardCharts.all(),
    dashboardTables: await db.dashboardTables.all(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `budgee-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
