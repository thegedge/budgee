import type { MerchantRule, RuleCondition, Transaction } from "../database/types";

function matchesCondition(description: string, condition: RuleCondition): boolean {
  const value = condition.value.toLowerCase();
  switch (condition.operator) {
    case "contains":
      return description.includes(value);
    case "startsWith":
      return description.startsWith(value);
    case "equals":
      return description === value;
    case "regex":
      return new RegExp(condition.value, "i").test(description);
  }
}

export function matchesRule(description: string, rule: MerchantRule): boolean {
  const method = rule.logic === "and" ? "every" : "some";
  return rule.conditions[method]((c) => matchesCondition(description, c));
}

export function applyRules(
  transaction: Omit<Transaction, "_id" | "_rev">,
  rules: MerchantRule[],
): Omit<Transaction, "_id" | "_rev"> {
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
