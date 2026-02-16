import Dexie, { type Table } from "dexie";
import type {
  Account,
  DashboardChart,
  DashboardTable,
  Merchant,
  MerchantRule,
  Tag,
  Transaction,
} from "./types";
import { randomTagColor } from "../data/tagColor";

export class Database extends Dexie {
  transactions!: Table<Transaction, number>;
  tags!: Table<Tag, number>;
  merchants!: Table<Merchant, number>;
  accounts!: Table<Account, number>;
  merchantRules!: Table<MerchantRule, number>;
  dashboardCharts!: Table<DashboardChart, number>;
  dashboardTables!: Table<DashboardTable, number>;

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

    this.version(6)
      .stores({})
      .upgrade((tx) =>
        tx
          .table("tags")
          .toCollection()
          .modify((tag: Tag) => {
            if (!tag.color) {
              tag.color = randomTagColor();
            }
          }),
      );
    const iconRenames: Record<string, string> = {
      "academic-cap": "graduation-cap",
      banknotes: "banknote",
      bolt: "zap",
      "bug-ant": "bug",
      "building-storefront": "store",
      "computer-desktop": "monitor",
      cube: "box",
      "currency-dollar": "circle-dollar-sign",
      envelope: "mail",
      film: "tv",
      "globe-alt": "globe",
      "light-bulb": "lightbulb",
      "musical-note": "music",
      "paint-brush": "paintbrush",
      "plus-circle": "circle-plus",
      "puzzle-piece": "puzzle",
      "receipt-percent": "receipt",
    };

    this.version(7)
      .stores({})
      .upgrade((tx) =>
        tx
          .table("tags")
          .toCollection()
          .modify((tag: Tag) => {
            if (tag.icon && tag.icon in iconRenames) {
              tag.icon = iconRenames[tag.icon];
            }
          }),
      );

    this.version(8).stores({
      dashboardTables: "++id",
    });
  }
}

export const db = new Database();
