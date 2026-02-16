import PouchDB from "pouchdb-browser";
import PouchDBFind from "pouchdb-find";
import type {
  Account,
  DashboardChart,
  DashboardTable,
  Merchant,
  MerchantRule,
  Tag,
  Transaction,
} from "./types";

PouchDB.plugin(PouchDBFind);

function createDb<T extends object>(name: string, adapter?: string) {
  return new PouchDB<T>(name, adapter ? { adapter } : {});
}

export interface Databases {
  transactions: PouchDB.Database<Transaction>;
  tags: PouchDB.Database<Tag>;
  merchants: PouchDB.Database<Merchant>;
  accounts: PouchDB.Database<Account>;
  merchantRules: PouchDB.Database<MerchantRule>;
  dashboardCharts: PouchDB.Database<DashboardChart>;
  dashboardTables: PouchDB.Database<DashboardTable>;
}

export function createDatabases(adapter?: string): Databases {
  return {
    transactions: createDb<Transaction>("budgee_transactions", adapter),
    tags: createDb<Tag>("budgee_tags", adapter),
    merchants: createDb<Merchant>("budgee_merchants", adapter),
    accounts: createDb<Account>("budgee_accounts", adapter),
    merchantRules: createDb<MerchantRule>("budgee_merchant_rules", adapter),
    dashboardCharts: createDb<DashboardChart>("budgee_dashboard_charts", adapter),
    dashboardTables: createDb<DashboardTable>("budgee_dashboard_tables", adapter),
  };
}

export async function createIndexes(dbs: Databases) {
  await dbs.transactions.createIndex({ index: { fields: ["merchantId"] } });
  await dbs.transactions.createIndex({ index: { fields: ["accountId"] } });
  await dbs.tags.createIndex({ index: { fields: ["name"] } });
  await dbs.merchants.createIndex({ index: { fields: ["name"] } });
}

export function allDatabases(dbs: Databases): PouchDB.Database[] {
  return Object.values(dbs);
}

export async function destroyAll(dbs: Databases) {
  await Promise.all(allDatabases(dbs).map((db) => db.destroy()));
}

const defaultAdapter = import.meta.env?.MODE === "test" ? "memory" : undefined;
export const db = createDatabases(defaultAdapter);
createIndexes(db);
