import type { TransactionRecord } from "../database/types";

export interface EntityStats {
  count: number;
  total: number;
}

/**
 * Compute per-key transaction count and amount total.
 *
 * `keysFn` extracts zero or more grouping keys from each transaction
 * (e.g. `[tx.merchantId]` or `tx.tagIds`).
 */
export function transactionStats(
  transactions: Pick<TransactionRecord, "amount">[],
  keysFn: (tx: Pick<TransactionRecord, "amount">) => (string | undefined)[],
): Map<string, EntityStats> {
  const stats = new Map<string, EntityStats>();
  for (const tx of transactions) {
    for (const key of keysFn(tx)) {
      if (key == null) continue;
      const entry = stats.get(key) ?? { count: 0, total: 0 };
      entry.count++;
      entry.total += tx.amount;
      stats.set(key, entry);
    }
  }
  return stats;
}
