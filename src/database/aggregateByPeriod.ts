import type { Transaction } from "./types";

export type PeriodGranularity = "day" | "month" | "year";

function periodKey(date: string, granularity: PeriodGranularity): string {
  switch (granularity) {
    case "day":
      return date.slice(0, 10);
    case "month":
      return date.slice(0, 7);
    case "year":
      return date.slice(0, 4);
  }
}

export function aggregateByPeriod(
  transactions: Transaction[],
  granularity: PeriodGranularity,
): Map<string, number> {
  const result = new Map<string, number>();
  for (const tx of transactions) {
    const key = periodKey(tx.date, granularity);
    result.set(key, (result.get(key) ?? 0) + tx.amount);
  }
  return result;
}
