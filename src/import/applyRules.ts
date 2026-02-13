import type { MerchantRule, Transaction } from "../database/types";

export function applyRules(
  transaction: Omit<Transaction, "id">,
  rules: MerchantRule[],
): Omit<Transaction, "id"> {
  const description = transaction.originalDescription.toLowerCase();
  for (const rule of rules) {
    if (!description.includes(rule.pattern.toLowerCase())) {
      continue;
    }

    const mergedTagIds = [...new Set([...transaction.tagIds, ...rule.tagIds])];
    return { ...transaction, tagIds: mergedTagIds };
  }
  return transaction;
}
