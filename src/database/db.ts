import Dexie, { type Table } from "dexie";
import type { Account, DashboardChart, Merchant, MerchantRule, Tag, Transaction } from "./types";

export class Database extends Dexie {
  transactions!: Table<Transaction, number>;
  tags!: Table<Tag, number>;
  merchants!: Table<Merchant, number>;
  accounts!: Table<Account, number>;
  merchantRules!: Table<MerchantRule, number>;
  dashboardCharts!: Table<DashboardChart, number>;

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

    this.version(3)
      .stores({
        merchantRules: "++id",
      })
      .upgrade((tx) =>
        tx
          .table("merchantRules")
          .toCollection()
          .modify((rule) => {
            const pattern = (rule as Record<string, unknown>).pattern as string;
            rule.logic = "and";
            rule.conditions = [{ field: "description", operator: "contains", value: pattern }];
            delete (rule as Record<string, unknown>).pattern;
          }),
      );

    this.version(4).stores({
      dashboardCharts: "++id",
    });

    this.version(5).stores({});
  }
}

export const db = new Database();
