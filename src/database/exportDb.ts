import { db } from "./Db";
import { LATEST_VERSION } from "./migrations";

export async function exportDatabase() {
  const dbs = await db();

  const data = {
    version: LATEST_VERSION,
    transactions: await dbs.transactions.all(),
    tags: await dbs.tags.all(),
    merchants: await dbs.merchants.all(),
    accounts: await dbs.accounts.all(),
    merchantRules: await dbs.merchantRules.all(),
    dashboardCharts: await dbs.dashboardCharts.all(),
    dashboardTables: await dbs.dashboardTables.all(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `budgee-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);

  const { showToast } = await import("../ui/shared/toast");
  showToast({ message: "Database exported", type: "success" });
}
