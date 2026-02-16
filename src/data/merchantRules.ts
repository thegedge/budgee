import { db } from "../database/db";
import type { MerchantRule, Transaction } from "../database/types";
import { matchesRule } from "../import/applyRules";

export class MerchantRules {
  private constructor() {}

  static all(): Promise<MerchantRule[]> {
    return db.merchantRules.toArray();
  }

  static create(rule: Omit<MerchantRule, "id">): Promise<number> {
    return db.merchantRules.add(rule) as Promise<number>;
  }

  static put(rule: MerchantRule): Promise<number> {
    return db.merchantRules.put(rule);
  }

  static update(id: number, changes: Partial<MerchantRule>): Promise<number> {
    return db.merchantRules.update(id, changes);
  }

  static remove(id: number): Promise<void> {
    return db.merchantRules.delete(id);
  }

  static async applyToTransactions(rule: MerchantRule): Promise<number> {
    const allTx = await db.transactions.toArray();
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
      await db.transactions.bulkPut(updates);
    }
    return updates.length;
  }
}
