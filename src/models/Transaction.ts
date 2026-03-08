import { db } from "../database/Db";
import { Repository } from "../database/Repository";
import type { TransactionRecord } from "../database/types";
import { uuid } from "../uuid";

export class Transaction {
  readonly id: string;
  readonly date: string;
  readonly amount: number;
  readonly description: string;
  readonly memo?: string;
  readonly merchantId?: string;
  readonly accountId?: string;
  readonly tagIds: string[];

  constructor(data: TransactionRecord) {
    this.id = data.id;
    this.date = data.date;
    this.amount = data.amount;
    this.description = data.description;
    this.memo = data.memo;
    this.merchantId = data.merchantId;
    this.accountId = data.accountId;
    this.tagIds = data.tagIds;
  }

  static async subscribe(callback: () => void) {
    return transactions.subscribe(callback);
  }

  static async all(): Promise<Transaction[]> {
    const docs = await transactions.all();
    return docs.map((d) => new Transaction(d));
  }

  static async get(id: string): Promise<Transaction | undefined> {
    const doc = await transactions.get(id);
    return doc ? new Transaction(doc) : undefined;
  }

  static async update(id: string, changes: Partial<TransactionRecord>): Promise<void> {
    await transactions.update(id, changes);
  }

  static async bulkPut(txs: TransactionRecord[]): Promise<void> {
    await transactions.bulkDocs(txs.map((t) => ({ ...t, id: t.id ?? uuid() })));
  }

  static async bulkAdd(txs: Omit<TransactionRecord, "id">[]): Promise<void> {
    await transactions.bulkDocs(txs.map((t) => ({ ...t, id: uuid() }) as TransactionRecord));
  }

  static async forMerchant(merchantId: string): Promise<Transaction[]> {
    const all = await transactions.all();
    return all
      .filter((t) => t.merchantId === merchantId)
      .map((d) => new Transaction(d))
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  static async forAccount(accountId: string): Promise<Transaction[]> {
    const all = await transactions.all();
    return all
      .filter((t) => t.accountId === accountId)
      .map((d) => new Transaction(d))
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  static async bulkRemove(ids: string[]): Promise<void> {
    await transactions.bulkRemove(ids);
  }

  static async deleteAll(): Promise<number> {
    const dbs = await db();
    const docs = await dbs.transactions.all();
    await dbs.transactions.bulkRemove(docs.map((doc) => doc.id));
    return docs.length;
  }

  static async deleteForAccount(accountId: string): Promise<number> {
    const dbs = await db();
    const all = await dbs.transactions.all();
    const docs = all.filter((t) => t.accountId === accountId);
    await dbs.transactions.bulkRemove(docs.map((doc) => doc.id));
    return docs.length;
  }
}

export const transactions = new Repository<TransactionRecord>({
  collection: (dbs) => dbs.transactions,
  cache: true,
});
