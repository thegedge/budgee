import { db } from "./db";

export async function exportDatabase() {
  const data = {
    transactions: await db.transactions.toArray(),
    tags: await db.tags.toArray(),
    merchants: await db.merchants.toArray(),
    accounts: await db.accounts.toArray(),
    merchantRules: await db.merchantRules.toArray(),
    dashboardCharts: await db.dashboardCharts.toArray(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `budgee-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
