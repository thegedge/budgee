import { db } from "../database/db";
import { allDocs } from "../database/pouchHelpers";
import type { Transaction } from "../database/types";
import { uuid } from "../uuid";

export class Transactions {
  private constructor() {}

  static async all(): Promise<Transaction[]> {
    return allDocs(db.transactions);
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
    await db.transactions.bulkDocs(transactions.map((t) => ({ ...t, _id: t._id ?? uuid() })));
  }

  static async bulkAdd(transactions: Omit<Transaction, "_id" | "_rev">[]): Promise<void> {
    await db.transactions.bulkDocs(transactions.map((t) => ({ ...t, _id: uuid() })));
  }

  static async forMerchant(merchantId: string): Promise<Transaction[]> {
    const result = await db.transactions.find({ selector: { merchantId } });
    return result.docs.sort((a, b) => b.date.localeCompare(a.date));
  }

  static async forMerchantAll(merchantId: string): Promise<Transaction[]> {
    const result = await db.transactions.find({ selector: { merchantId } });
    return result.docs;
  }

  static async forAccount(accountId: string): Promise<Transaction[]> {
    const result = await db.transactions.find({ selector: { accountId } });
    return result.docs.sort((a, b) => b.date.localeCompare(a.date));
  }

  static async deleteAll(): Promise<number> {
    const result = await db.transactions.allDocs({ include_docs: true });
    const docs = result.rows.filter((r) => r.doc && !r.id.startsWith("_")).map((r) => r.doc!);
    await db.transactions.bulkDocs(
      docs.map((doc) => ({ ...doc, _deleted: true }) as unknown as Transaction),
    );
    return docs.length;
  }

  static async deleteForAccount(accountId: string): Promise<number> {
    const result = await db.transactions.find({ selector: { accountId } });
    await db.transactions.bulkDocs(
      result.docs.map((doc) => ({ ...doc, _deleted: true }) as unknown as Transaction),
    );
    return result.docs.length;
  }
}
