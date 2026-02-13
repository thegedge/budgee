import Dexie, { type Table } from "dexie";
import type { Account, Merchant, MerchantRule, Tag, Transaction } from "./types";

export class Database extends Dexie {
  transactions!: Table<Transaction, number>;
  tags!: Table<Tag, number>;
  merchants!: Table<Merchant, number>;
  accounts!: Table<Account, number>;
  merchantRules!: Table<MerchantRule, number>;

  constructor() {
    super("BudgeeDatabase");

    this.version(1).stores({
      transactions: "++id, date, amount, merchantId, accountId, *tagIds",
      tags: "++id, &name",
      merchants: "++id, &name",
      accounts: "++id, &name",
    });

    this.version(2).stores({
      merchantRules: "++id, pattern",
    });
  }
}

export const db = new Database();
