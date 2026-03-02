import type { MerchantRuleRecord, RuleCondition, TransactionRecord } from "../database/types";

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

export function matchesRule(
  transaction: Pick<TransactionRecord, "description" | "accountId">,
  rule: MerchantRuleRecord,
): boolean {
  if (rule.accountId && rule.accountId !== transaction.accountId) {
    return false;
  }

  const description = transaction.description.toLowerCase();
  switch (rule.logic) {
    case "and":
      return rule.conditions.every((c) => matchesCondition(description, c));
    case "or":
      return rule.conditions.some((c) => matchesCondition(description, c));
  }
}
