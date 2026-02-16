import { db } from "../database/db";
import type { Transaction } from "../database/types";

export class Transactions {
  private constructor() {}

  static all(): Promise<Transaction[]> {
    return db.transactions.toArray();
  }

  static get(id: number): Promise<Transaction | undefined> {
    return db.transactions.get(id);
  }

  static update(id: number, changes: Partial<Transaction>): Promise<number> {
    return db.transactions.update(id, changes);
  }

  static bulkPut(transactions: Transaction[]): Promise<unknown> {
    return db.transactions.bulkPut(transactions);
  }

  static bulkAdd(transactions: Omit<Transaction, "id">[]): Promise<unknown> {
    return db.transactions.bulkAdd(transactions);
  }

  static forMerchant(merchantId: number): Promise<Transaction[]> {
    return db.transactions.where("merchantId").equals(merchantId).reverse().sortBy("date");
  }

  static async forMerchantAll(merchantId: number): Promise<Transaction[]> {
    return db.transactions.where("merchantId").equals(merchantId).toArray();
  }

  static forAccount(accountId: number): Promise<Transaction[]> {
    return db.transactions.where("accountId").equals(accountId).reverse().sortBy("date");
  }

  static deleteForAccount(accountId: number): Promise<number> {
    return db.transactions.where("accountId").equals(accountId).delete();
  }
}
