import { waitForDb } from "../database/Db";
import type { MerchantRuleRecord, RuleCondition, TransactionRecord } from "../database/types";
import {
  type PreparedCondition,
  matchesRule,
  prepareConditions,
} from "../import/matchesRule";
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

export class MerchantRule {
  readonly id!: string;
  readonly logic!: "and" | "or";
  readonly conditions!: RuleCondition[];
  readonly merchantId?: string;
  readonly accountId?: string;
  readonly tagIds!: string[];
  readonly preparedConditions: PreparedCondition[];

  constructor(data: MerchantRuleRecord) {
    Object.assign(this, data);
    this.preparedConditions = prepareConditions(this.conditions);
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
    const prepared = prepareConditions(rule.conditions);
    const updates: TransactionRecord[] = [];
    for (const tx of allTx) {
      if (matchesRule(tx, rule, accounts, prepared)) {
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
