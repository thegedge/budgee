import { db } from "../database/db";
import type { MerchantRule, Transaction } from "../database/types";
import { matchesRule } from "../import/matchesRule";
import { uuid } from "../uuid";

export class MerchantRules {
  private constructor() {}

  static async all(): Promise<MerchantRule[]> {
    return db.merchantRules.all();
  }

  static async create(rule: Omit<MerchantRule, "id">): Promise<string> {
    const id = uuid();
    await db.merchantRules.put({ ...rule, id });
    return id;
  }

  static async put(rule: MerchantRule & { id?: string }): Promise<void> {
    if (rule.id) {
      await db.merchantRules.put(rule as MerchantRule);
    } else {
      await db.merchantRules.put({ ...rule, id: uuid() });
    }
  }

  static async update(id: string, changes: Partial<MerchantRule>): Promise<void> {
    const doc = await db.merchantRules.get(id);
    await db.merchantRules.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    await db.merchantRules.remove(id);
  }

  static async applyToTransactions(rule: MerchantRule): Promise<number> {
    const allTx = await db.transactions.all();
    const updates: Transaction[] = [];
    for (const tx of allTx) {
      const description = tx.originalDescription.toLowerCase();
      if (matchesRule(description, rule)) {
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
