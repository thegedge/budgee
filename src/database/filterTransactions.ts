import type { Transaction } from "./types";

export interface FilterOptions {
  tagId?: string;
  merchantId?: string;
  startDate?: string;
  endDate?: string;
  direction?: "debit" | "credit";
  descriptionFilter?: string;
  descriptionFilterMode?: "include" | "exclude";
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
