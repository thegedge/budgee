import { db } from "../database/Db";
import { Repository } from "../database/Repository";
import type {
  AccountRecord,
  MerchantRuleRecord,
  RuleCondition,
  TransactionRecord,
} from "../database/types";
import { Account } from "./Account";

interface PreparedCondition {
  field: RuleCondition["field"];
  operator: RuleCondition["operator"];
  value: string;
  regex?: RegExp;
}

export interface PreparedTransaction {
  description: string;
  account?: string;
  accountId?: string;
}

export function prepareTransaction(
  transaction: Pick<TransactionRecord, "description" | "accountId">,
  accounts: Record<string, AccountRecord> = {},
): PreparedTransaction {
  const acct = transaction.accountId ? accounts[transaction.accountId] : undefined;
  return {
    description: (transaction.description ?? "").toLowerCase(),
    accountId: transaction.accountId,
    account: acct?.name.toLowerCase() ?? transaction.accountId?.toLowerCase(),
  };
}

function matchesCondition(value: string | undefined, c: PreparedCondition): boolean {
  if (value === undefined) return false;
  switch (c.operator) {
    case "contains":
      return value.includes(c.value);
    case "startsWith":
      return value.startsWith(c.value);
    case "equals":
      return value === c.value;
    case "regex":
      return c.regex!.test(value);
  }
}

export class MerchantRule {
  readonly id: string;
  readonly logic: "and" | "or";
  readonly conditions: RuleCondition[];
  readonly merchantId?: string;
  readonly accountId?: string;
  readonly tagIds: string[];

  readonly #prepared: PreparedCondition[];

  constructor(data: MerchantRuleRecord) {
    this.id = data.id;
    this.logic = data.logic;
    this.conditions = data.conditions;
    this.merchantId = data.merchantId;
    this.accountId = data.accountId;
    this.tagIds = data.tagIds;
    this.#prepared = data.conditions.map((c) => ({
      field: c.field,
      operator: c.operator,
      value: c.value.toLowerCase(),
      regex: c.operator === "regex" ? new RegExp(c.value, "i") : undefined,
    }));
  }

  matches(tx: PreparedTransaction): boolean {
    if (this.accountId && this.accountId !== tx.accountId) return false;
    const test = (c: PreparedCondition) => matchesCondition(tx[c.field], c);
    return this.logic === "and" ? this.#prepared.every(test) : this.#prepared.some(test);
  }

  static async subscribe(callback: () => void) {
    return merchantRules.subscribe(callback);
  }

  static async all(): Promise<MerchantRule[]> {
    const docs = await merchantRules.all();
    return docs.map((d) => new MerchantRule(d));
  }

  static async create(rule: Omit<MerchantRuleRecord, "id">): Promise<MerchantRule> {
    const doc = await merchantRules.create(rule);
    return new MerchantRule(doc);
  }

  static async put(rule: MerchantRuleRecord & { id?: string }): Promise<void> {
    if (rule.id) {
      await merchantRules.put(rule as MerchantRuleRecord);
    } else {
      await merchantRules.create(rule as Omit<MerchantRuleRecord, "id">);
    }
  }

  static async update(id: string, changes: Partial<MerchantRuleRecord>): Promise<void> {
    await merchantRules.update(id, changes);
  }

  static async remove(id: string): Promise<void> {
    await merchantRules.remove(id);
  }

  static async applyToTransactions(rule: MerchantRuleRecord): Promise<number> {
    const dbs = await db();
    const allTx = await dbs.transactions.all();
    const accountDocs = await dbs.accounts.all();
    const accountMap = Account.toLookup(accountDocs);
    const prepared = new MerchantRule(rule);
    const updates: TransactionRecord[] = [];
    for (const tx of allTx) {
      if (prepared.matches(prepareTransaction(tx, accountMap))) {
        updates.push({
          ...tx,
          merchantId: rule.merchantId ?? tx.merchantId,
          tagIds: [...new Set([...tx.tagIds, ...rule.tagIds])],
        });
      }
    }
    if (updates.length > 0) {
      await dbs.transactions.bulkDocs(updates);
    }
    return updates.length;
  }
}

export const merchantRules = new Repository<MerchantRuleRecord>({
  collection: (dbs) => dbs.merchantRules,
  cache: true,
});
