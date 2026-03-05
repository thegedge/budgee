import { waitForDb } from "../database/Db";
import type { TransactionRecord } from "../database/types";
import { uuid } from "../uuid";

let cached: Transaction[] | null = null;
let cacheSubscribed = false;

async function getCache(): Promise<Transaction[]> {
  if (cached) return cached;
  const db = await waitForDb();
  const docs = await db.transactions.all();
  cached = docs.map((d) => new Transaction(d));
  if (!cacheSubscribed) {
    cacheSubscribed = true;
    db.transactions.subscribe(() => {
      cached = null;
    });
  }
  return cached;
}

export class Transaction {
  readonly id!: string;
  readonly date!: string;
  readonly amount!: number;
  readonly description!: string;
  readonly memo?: string;
  readonly merchantId?: string;
  readonly accountId?: string;
  readonly tagIds!: string[];

  constructor(data: TransactionRecord) {
    Object.assign(this, data);
  }

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.transactions.subscribe(callback);
  }

  static async all(): Promise<Transaction[]> {
    return getCache();
  }

  static async get(id: string): Promise<Transaction | undefined> {
    const db = await waitForDb();
    try {
      return new Transaction(await db.transactions.get(id));
    } catch {
      return undefined;
    }
  }

  static async update(id: string, changes: Partial<TransactionRecord>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.transactions.get(id);
    await db.transactions.put({ ...doc, ...changes });
  }

  static async bulkPut(transactions: TransactionRecord[]): Promise<void> {
    const db = await waitForDb();
    await db.transactions.bulkDocs(transactions.map((t) => ({ ...t, id: t.id ?? uuid() })));
  }

  static async bulkAdd(transactions: Omit<TransactionRecord, "id">[]): Promise<void> {
    const db = await waitForDb();
    await db.transactions.bulkDocs(transactions.map((t) => ({ ...t, id: uuid() })));
  }

  static async forMerchant(merchantId: string): Promise<Transaction[]> {
    const all = await getCache();
    return all
      .filter((t) => t.merchantId === merchantId)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  static async forAccount(accountId: string): Promise<Transaction[]> {
    const all = await getCache();
    return all
      .filter((t) => t.accountId === accountId)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  static async bulkRemove(ids: string[]): Promise<void> {
    const db = await waitForDb();
    await Promise.all(ids.map((id) => db.transactions.remove(id)));
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
