import type { Transaction } from "./types";

export function aggregate(
  transactions: Transaction[],
  entities: { id: string; name: string }[],
  keysFn: (tx: Transaction) => string[],
): Map<string, number> {
  const totals = new Map<string, number>();
  for (const tx of transactions) {
    for (const key of keysFn(tx)) {
      totals.set(key, (totals.get(key) ?? 0) + tx.amount);
    }
  }

  const result = new Map<string, number>();
  for (const entity of entities) {
    const total = totals.get(entity.id);
    if (total !== undefined) {
      result.set(entity.name, total);
    }
  }
  return result;
}
