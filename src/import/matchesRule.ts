import type { MerchantRule, RuleCondition } from "../database/types";

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

export function matchesRule(description: string, rule: MerchantRule, accountId?: string): boolean {
  if (rule.accountId && rule.accountId !== accountId) {
    return false;
  }
  const method = rule.logic === "and" ? "every" : "some";
  return rule.conditions[method]((c) => matchesCondition(description, c));
}
