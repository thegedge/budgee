import { db } from "../database/db";
import type { Transaction } from "../database/types";
import { uuid } from "../uuid";

export class Transactions {
  private constructor() {}

  static async all(): Promise<Transaction[]> {
    return db.transactions.all();
  }

  static async get(id: string): Promise<Transaction | undefined> {
    try {
      return await db.transactions.get(id);
    } catch {
      return undefined;
    }
  }

  static async update(id: string, changes: Partial<Transaction>): Promise<void> {
    const doc = await db.transactions.get(id);
    await db.transactions.put({ ...doc, ...changes });
  }

  static async bulkPut(transactions: Transaction[]): Promise<void> {
    await db.transactions.bulkDocs(transactions.map((t) => ({ ...t, id: t.id ?? uuid() })));
  }

  static async bulkAdd(transactions: Omit<Transaction, "id">[]): Promise<void> {
    await db.transactions.bulkDocs(transactions.map((t) => ({ ...t, id: uuid() })));
  }

  static async forMerchant(merchantId: string): Promise<Transaction[]> {
    const result = await db.transactions.find({ selector: { merchantId } });
    return result.sort((a, b) => b.date.localeCompare(a.date));
  }

  static async forMerchantAll(merchantId: string): Promise<Transaction[]> {
    return db.transactions.find({ selector: { merchantId } });
  }

  static async forAccount(accountId: string): Promise<Transaction[]> {
    const result = await db.transactions.find({ selector: { accountId } });
    return result.sort((a, b) => b.date.localeCompare(a.date));
  }

  static async deleteAll(): Promise<number> {
    const docs = await db.transactions.all();
    await Promise.all(docs.map((doc) => db.transactions.remove(doc.id)));
    return docs.length;
  }

  static async deleteForAccount(accountId: string): Promise<number> {
    const docs = await db.transactions.find({ selector: { accountId } });
    await Promise.all(docs.map((doc) => db.transactions.remove(doc.id)));
    return docs.length;
  }
}
