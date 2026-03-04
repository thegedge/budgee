import { waitForDb } from "../database/Db";
import type {
  AccountRecord,
  MerchantRuleRecord,
  RuleCondition,
  TransactionRecord,
} from "../database/types";
import { uuid } from "../uuid";
import { Account } from "./Account";

let cached: MerchantRule[] | null = null;
let cacheSubscribed = false;

async function getCache(): Promise<MerchantRule[]> {
  if (cached) return cached;
  const db = await waitForDb();
  const docs = await db.merchantRules.all();
  cached = docs.map((d) => new MerchantRule(d));
  if (!cacheSubscribed) {
    cacheSubscribed = true;
    db.merchantRules.subscribe(() => {
      cached = null;
    });
  }
  return cached;
}

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
    description: transaction.description.toLowerCase(),
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
  readonly id!: string;
  readonly logic!: "and" | "or";
  readonly conditions!: RuleCondition[];
  readonly merchantId?: string;
  readonly accountId?: string;
  readonly tagIds!: string[];

  readonly #prepared: PreparedCondition[];

  constructor(data: MerchantRuleRecord) {
    Object.assign(this, data);
    this.#prepared = this.conditions.map((c) => ({
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
    const db = await waitForDb();
    return db.merchantRules.subscribe(callback);
  }

  static async all(): Promise<MerchantRule[]> {
    return getCache();
  }

  static async create(rule: Omit<MerchantRuleRecord, "id">): Promise<MerchantRule> {
    const db = await waitForDb();
    const data = { ...rule, id: uuid() };
    await db.merchantRules.put(data);
    return new MerchantRule(data);
  }

  static async put(rule: MerchantRuleRecord & { id?: string }): Promise<void> {
    const db = await waitForDb();
    if (rule.id) {
      await db.merchantRules.put(rule as MerchantRuleRecord);
    } else {
      await db.merchantRules.put({ ...rule, id: uuid() });
    }
  }

  static async update(id: string, changes: Partial<MerchantRuleRecord>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.merchantRules.get(id);
    await db.merchantRules.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const db = await waitForDb();
    await db.merchantRules.remove(id);
  }

  static async applyToTransactions(rule: MerchantRuleRecord): Promise<number> {
    const db = await waitForDb();
    const allTx = await db.transactions.all();
    const accounts = Account.toLookup(await db.accounts.all());
    const prepared = new MerchantRule(rule);
    const updates: TransactionRecord[] = [];
    for (const tx of allTx) {
      if (prepared.matches(prepareTransaction(tx, accounts))) {
        updates.push({
          ...tx,
          merchantId: rule.merchantId ?? tx.merchantId,
          tagIds: [...new Set([...tx.tagIds, ...rule.tagIds])],
        });
      }
    }
    if (updates.length > 0) {
      await db.transactions.bulkDocs(updates);
    }
    return updates.length;
  }
}
