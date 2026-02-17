import { db } from "../database/db";
import { allDocs } from "../database/pouchHelpers";
import type { MerchantRule, Transaction } from "../database/types";
import { matchesRule } from "../import/applyRules";
import { uuid } from "../uuid";

export class MerchantRules {
  private constructor() {}

  static async all(): Promise<MerchantRule[]> {
    return allDocs(db.merchantRules);
  }

  static async create(rule: Omit<MerchantRule, "_id" | "_rev">): Promise<string> {
    const id = uuid();
    await db.merchantRules.put({ ...rule, _id: id });
    return id;
  }

  static async put(rule: MerchantRule): Promise<void> {
    if (rule._id) {
      const existing = await db.merchantRules.get(rule._id);
      await db.merchantRules.put({ ...rule, _id: rule._id, _rev: existing._rev });
    } else {
      await db.merchantRules.put({ ...rule, _id: uuid() });
    }
  }

  static async update(id: string, changes: Partial<MerchantRule>): Promise<void> {
    const doc = await db.merchantRules.get(id);
    await db.merchantRules.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const doc = await db.merchantRules.get(id);
    await db.merchantRules.remove(doc);
  }

  static async applyToTransactions(rule: MerchantRule): Promise<number> {
    const allTx = await allDocs(db.transactions);
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
