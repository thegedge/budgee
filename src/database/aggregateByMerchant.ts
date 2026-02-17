import type { Transaction } from "./types";

export function aggregateByMerchant(
  transactions: Transaction[],
  merchants: { id: string; name: string }[],
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
    if (excluded?.has(merchant.id)) continue;
    const total = totals.get(merchant.id);
    if (total !== undefined) {
      result.set(merchant.name, total);
    }
  }
  return result;
}
