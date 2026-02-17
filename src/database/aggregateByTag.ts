import type { Transaction } from "./types";

export function aggregateByTag(
  transactions: Transaction[],
  tags: { id: string; name: string }[],
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
    if (excluded?.has(tag.id)) continue;
    const total = totals.get(tag.id);
    if (total !== undefined) {
      result.set(tag.name, total);
    }
  }
  return result;
}
