import { db } from "./db";
import { allDocs } from "./pouchHelpers";

function stripRev<T extends { _rev?: string }>(docs: T[]): Omit<T, "_rev">[] {
  return docs.map(({ _rev, ...rest }) => rest);
}

export async function exportDatabase() {
  const data = {
    transactions: stripRev(await allDocs(db.transactions)),
    tags: stripRev(await allDocs(db.tags)),
    merchants: stripRev(await allDocs(db.merchants)),
    accounts: stripRev(await allDocs(db.accounts)),
    merchantRules: stripRev(await allDocs(db.merchantRules)),
    dashboardCharts: stripRev(await allDocs(db.dashboardCharts)),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `budgee-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
