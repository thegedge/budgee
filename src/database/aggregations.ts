import type { Transaction } from "./types";

export type PeriodGranularity = "day" | "month" | "year";
export type Granularity = PeriodGranularity | "byTag" | "byMerchant";

interface FilterOptions {
  tagId?: string;
  merchantId?: string;
  startDate?: string;
  endDate?: string;
  direction?: "debit" | "credit";
  descriptionFilter?: string;
  descriptionFilterMode?: "include" | "exclude";
}

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

export function aggregateByTag(
  transactions: Transaction[],
  tags: { _id?: string; name: string }[],
  excludedIds?: string[],
): Map<string, number> {
  const excluded = excludedIds ? new Set(excludedIds) : undefined;
  const totals = new Map<string, number>();
  for (const tx of transactions) {
    for (const tagId of tx.tagIds) {
      totals.set(tagId, (totals.get(tagId) ?? 0) + tx.amount);
    }
  }

  const result = new Map<string, number>();
  for (const tag of tags) {
    if (excluded?.has(tag._id!)) continue;
    const total = totals.get(tag._id!);
    if (total !== undefined) {
      result.set(tag.name, total);
    }
  }
  return result;
}

export function aggregateByMerchant(
  transactions: Transaction[],
  merchants: { _id?: string; name: string }[],
  excludedIds?: string[],
): Map<string, number> {
  const excluded = excludedIds ? new Set(excludedIds) : undefined;
  const totals = new Map<string, number>();
  for (const tx of transactions) {
    if (tx.merchantId !== undefined) {
      totals.set(tx.merchantId, (totals.get(tx.merchantId) ?? 0) + tx.amount);
    }
  }

  const result = new Map<string, number>();
  for (const merchant of merchants) {
    if (excluded?.has(merchant._id!)) continue;
    const total = totals.get(merchant._id!);
    if (total !== undefined) {
      result.set(merchant.name, total);
    }
  }
  return result;
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

export function filterTransactions(
  transactions: Transaction[],
  options: FilterOptions,
): Transaction[] {
  return transactions.filter((tx) => {
    if (options.tagId !== undefined && !tx.tagIds.includes(options.tagId)) return false;
    if (options.merchantId !== undefined && tx.merchantId !== options.merchantId) return false;
    if (options.startDate && tx.date < options.startDate) return false;
    if (options.endDate && tx.date > options.endDate) return false;
    if (options.direction === "debit" && tx.amount >= 0) return false;
    if (options.direction === "credit" && tx.amount <= 0) return false;
    if (options.descriptionFilter) {
      const matches = tx.originalDescription
        .toLowerCase()
        .includes(options.descriptionFilter.toLowerCase());
      if (options.descriptionFilterMode === "exclude" && matches) return false;
      if (options.descriptionFilterMode === "include" && !matches) return false;
    }
    return true;
  });
}
