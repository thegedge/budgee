import { waitForDb } from "../database/Db";
import type { Transaction } from "../database/types";
import { uuid } from "../uuid";

export class Transactions {
  private constructor() {}

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.transactions.subscribe(callback);
  }

  static async all(): Promise<Transaction[]> {
    const db = await waitForDb();
    return db.transactions.all();
  }

  static async get(id: string): Promise<Transaction | undefined> {
    const db = await waitForDb();
    try {
      return await db.transactions.get(id);
    } catch {
      return undefined;
    }
  }

  static async update(id: string, changes: Partial<Transaction>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.transactions.get(id);
    await db.transactions.put({ ...doc, ...changes });
  }

  static async bulkPut(transactions: Transaction[]): Promise<void> {
    const db = await waitForDb();
    await db.transactions.bulkDocs(transactions.map((t) => ({ ...t, id: t.id ?? uuid() })));
  }

  static async bulkAdd(transactions: Omit<Transaction, "id">[]): Promise<void> {
    const db = await waitForDb();
    await db.transactions.bulkDocs(transactions.map((t) => ({ ...t, id: uuid() })));
  }

  static async forMerchant(merchantId: string): Promise<Transaction[]> {
    const db = await waitForDb();
    const all = await db.transactions.all();
    return all
      .filter((t) => t.merchantId === merchantId)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  static async forAccount(accountId: string): Promise<Transaction[]> {
    const db = await waitForDb();
    const all = await db.transactions.all();
    return all
      .filter((t) => t.accountId === accountId)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  static async deleteAll(): Promise<number> {
    const db = await waitForDb();
    const docs = await db.transactions.all();
    await Promise.all(docs.map((doc) => db.transactions.remove(doc.id)));
    return docs.length;
  }

  static async deleteForAccount(accountId: string): Promise<number> {
    const db = await waitForDb();
    const all = await db.transactions.all();
    const docs = all.filter((t) => t.accountId === accountId);
    await Promise.all(docs.map((doc) => db.transactions.remove(doc.id)));
    return docs.length;
  }
}
