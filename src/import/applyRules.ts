import type { AccountRecord, MerchantRuleRecord, TransactionRecord } from "../database/types";
import { matchesRule } from "./matchesRule";

export function applyRules(
  transaction: Omit<TransactionRecord, "id">,
  rules: MerchantRuleRecord[],
  accounts: Record<string, AccountRecord> = {},
): Omit<TransactionRecord, "id"> {
  for (const rule of rules) {
    if (!matchesRule(transaction, rule, accounts)) {
      continue;
    }

    const mergedTagIds = [...new Set([...transaction.tagIds, ...rule.tagIds])];
    const merchantId = rule.merchantId ?? transaction.merchantId;
    return { ...transaction, tagIds: mergedTagIds, merchantId };
  }
  return transaction;
}
