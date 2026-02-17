import type { MerchantRule, Transaction } from "../database/types";
import { matchesRule } from "./matchesRule";

export function applyRules(
  transaction: Omit<Transaction, "id">,
  rules: MerchantRule[],
): Omit<Transaction, "id"> {
  const description = transaction.originalDescription.toLowerCase();
  for (const rule of rules) {
    if (!matchesRule(description, rule)) {
      continue;
    }

    const mergedTagIds = [...new Set([...transaction.tagIds, ...rule.tagIds])];
    const merchantId = rule.merchantId ?? transaction.merchantId;
    return { ...transaction, tagIds: mergedTagIds, merchantId };
  }
  return transaction;
}
