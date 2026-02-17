import type { Transaction } from "./types";

export interface FilterOptions {
  tagId?: string;
  excludedTagId?: string;
  merchantId?: string;
  excludedMerchantId?: string;
  startDate?: string;
  endDate?: string;
  amountFilter?: { operator: "lt" | "gt" | "lte" | "gte"; value: number };
  descriptionFilter?: string;
  descriptionFilterMode?: "include" | "exclude";
}

export function filterTransactions(
  transactions: Transaction[],
  options: FilterOptions,
): Transaction[] {
  return transactions.filter((tx) => {
    if (options.tagId !== undefined && !tx.tagIds.includes(options.tagId)) return false;
    if (options.excludedTagId !== undefined && tx.tagIds.includes(options.excludedTagId))
      return false;
    if (options.merchantId !== undefined && tx.merchantId !== options.merchantId) return false;
    if (options.excludedMerchantId !== undefined && tx.merchantId === options.excludedMerchantId)
      return false;
    if (options.startDate && tx.date < options.startDate) return false;
    if (options.endDate && tx.date > options.endDate) return false;
    if (options.amountFilter) {
      const { operator, value } = options.amountFilter;
      if (operator === "lt" && !(tx.amount < value)) return false;
      if (operator === "gt" && !(tx.amount > value)) return false;
      if (operator === "lte" && !(tx.amount <= value)) return false;
      if (operator === "gte" && !(tx.amount >= value)) return false;
    }
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
