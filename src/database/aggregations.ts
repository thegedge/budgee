import type { Transaction } from "./types";

export type Granularity = "day" | "month" | "year";

interface FilterOptions {
  tagId?: number;
  merchantId?: number;
  startDate?: string;
  endDate?: string;
}

function periodKey(date: string, granularity: Granularity): string {
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
  granularity: Granularity,
): Map<string, number> {
  const result = new Map<string, number>();
  for (const tx of transactions) {
    const key = periodKey(tx.date, granularity);
    result.set(key, (result.get(key) ?? 0) + tx.amount);
  }
  return result;
}

export function filterTransactions(
  transactions: Transaction[],
  options: FilterOptions,
): Transaction[] {
  return transactions.filter((tx) => {
    if (options.tagId !== undefined && !tx.tagIds.includes(options.tagId)) return false;
    if (options.merchantId !== undefined && tx.merchantId !== options.merchantId) return false;
    if (options.startDate && tx.date < options.startDate) return false;
    if (options.endDate && tx.date > options.endDate) return false;
    return true;
  });
}
