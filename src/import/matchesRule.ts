import type {
  AccountRecord,
  MerchantRuleRecord,
  RuleCondition,
  TransactionRecord,
} from "../database/types";

export interface PreparedCondition {
  field: RuleCondition["field"];
  operator: RuleCondition["operator"];
  value: string;
  regex?: RegExp;
}

export function prepareConditions(conditions: RuleCondition[]): PreparedCondition[] {
  return conditions.map((c) => ({
    field: c.field,
    operator: c.operator,
    value: c.value.toLowerCase(),
    regex: c.operator === "regex" ? new RegExp(c.value, "i") : undefined,
  }));
}

export interface PreparedTransaction {
  description: string;
  accountId?: string;
  accountName?: string;
}

export function prepareTransaction(
  transaction: Pick<TransactionRecord, "description" | "accountId">,
  accounts: Record<string, AccountRecord> = {},
): PreparedTransaction {
  const account = transaction.accountId ? accounts[transaction.accountId] : undefined;
  return {
    description: transaction.description.toLowerCase(),
    accountId: transaction.accountId,
    accountName: account?.name.toLowerCase() ?? transaction.accountId?.toLowerCase(),
  };
}

function fieldValue(tx: PreparedTransaction, condition: PreparedCondition): string | undefined {
  switch (condition.field) {
    case "description":
      return tx.description;
    case "account":
      return tx.accountName;
  }
}

function matchesCondition(value: string | undefined, condition: PreparedCondition): boolean {
  if (value === undefined) return false;
  switch (condition.operator) {
    case "contains":
      return value.includes(condition.value);
    case "startsWith":
      return value.startsWith(condition.value);
    case "equals":
      return value === condition.value;
    case "regex":
      return condition.regex!.test(value);
  }
}

export function matchesPrepared(tx: PreparedTransaction, condition: PreparedCondition): boolean {
  return matchesCondition(fieldValue(tx, condition), condition);
}

export function matchesRule(
  transaction: Pick<TransactionRecord, "description" | "accountId"> | PreparedTransaction,
  rule: MerchantRuleRecord,
  accounts: Record<string, AccountRecord> = {},
  preparedConditions?: PreparedCondition[],
): boolean {
  if (rule.accountId && rule.accountId !== transaction.accountId) {
    return false;
  }

  const conditions = preparedConditions ?? prepareConditions(rule.conditions);
  const tx =
    "accountName" in transaction
      ? (transaction as PreparedTransaction)
      : prepareTransaction(transaction, accounts);

  switch (rule.logic) {
    case "and":
      return conditions.every((c) => matchesCondition(fieldValue(tx, c), c));
    case "or":
      return conditions.some((c) => matchesCondition(fieldValue(tx, c), c));
  }
}
