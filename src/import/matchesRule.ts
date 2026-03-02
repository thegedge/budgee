import type { AccountRecord, MerchantRuleRecord, RuleCondition, TransactionRecord } from "../database/types";

function fieldValue(
  transaction: Pick<TransactionRecord, "description" | "accountId">,
  condition: RuleCondition,
  accounts: Record<string, AccountRecord>,
): string | undefined {
  switch (condition.field) {
    case "description":
      return transaction.description.toLowerCase();
    case "account": {
      const account = transaction.accountId ? accounts[transaction.accountId] : undefined;
      return account?.name.toLowerCase() ?? transaction.accountId?.toLowerCase();
    }
  }
}

function matchesCondition(value: string | undefined, condition: RuleCondition): boolean {
  if (value === undefined) return false;
  const condValue = condition.value.toLowerCase();
  switch (condition.operator) {
    case "contains":
      return value.includes(condValue);
    case "startsWith":
      return value.startsWith(condValue);
    case "equals":
      return value === condValue;
    case "regex":
      return new RegExp(condition.value, "i").test(value);
  }
}

export function matchesRule(
  transaction: Pick<TransactionRecord, "description" | "accountId">,
  rule: MerchantRuleRecord,
  accounts: Record<string, AccountRecord> = {},
): boolean {
  if (rule.accountId && rule.accountId !== transaction.accountId) {
    return false;
  }

  switch (rule.logic) {
    case "and":
      return rule.conditions.every((c) => matchesCondition(fieldValue(transaction, c, accounts), c));
    case "or":
      return rule.conditions.some((c) => matchesCondition(fieldValue(transaction, c, accounts), c));
  }
}
