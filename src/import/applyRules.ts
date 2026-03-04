import type { AccountRecord, TransactionRecord } from "../database/types";
import { type MerchantRule, prepareTransaction } from "../models/MerchantRule";

export function applyRules(
  transaction: Omit<TransactionRecord, "id">,
  rules: MerchantRule[],
  accounts: Record<string, AccountRecord> = {},
): Omit<TransactionRecord, "id"> {
  const prepared = prepareTransaction(transaction, accounts);
  for (const rule of rules) {
    if (!rule.matches(prepared)) {
      continue;
    }

    const mergedTagIds = [...new Set([...transaction.tagIds, ...rule.tagIds])];
    const merchantId = rule.merchantId ?? transaction.merchantId;
    return { ...transaction, tagIds: mergedTagIds, merchantId };
  }
  return transaction;
}
