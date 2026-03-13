import type { TransactionRecord } from "../database/types";

export type PeriodGranularity = "day" | "week" | "month" | "year";

export type Granularity = PeriodGranularity | "byTag" | "byMerchant";

export function aggregateBy(
  transactions: TransactionRecord[],
  keysFn: (tx: TransactionRecord) => string[],
): Map<string, number> {
  const totals = new Map<string, number>();
  for (const tx of transactions) {
    for (const key of keysFn(tx)) {
      totals.set(key, (totals.get(key) ?? 0) + tx.amount);
    }
  }
  return totals;
}

export function mapKeys(
  aggregated: Map<string, number>,
  entities: { id: string; name: string }[],
): Map<string, number> {
  const result = new Map<string, number>();
  for (const entity of entities) {
    const total = aggregated.get(entity.id);
    if (total !== undefined) {
      result.set(entity.name, total);
    }
  }
  return result;
}

function periodKey(date: string, granularity: PeriodGranularity): string {
  switch (granularity) {
    case "day":
      return date.slice(0, 10);
    case "week": {
      const d = new Date(date.slice(0, 10) + "T00:00:00");
      const day = d.getDay();
      d.setDate(d.getDate() - ((day + 6) % 7));
      return d.toISOString().slice(0, 10);
    }
    case "month":
      return date.slice(0, 7);
    case "year":
      return date.slice(0, 4);
  }
}

export function aggregateByPeriod(
  transactions: TransactionRecord[],
  granularity: PeriodGranularity,
): Map<string, number> {
  return aggregateBy(transactions, (tx) => [periodKey(tx.date, granularity)]);
}
