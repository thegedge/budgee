import {
  type MangoQuery,
  type RxCollection,
  type RxDatabase,
  type RxJsonSchema,
  addRxPlugin,
  createRxDatabase,
  removeRxDatabase,
} from "rxdb/plugins/core";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import type {
  Account,
  DashboardChart,
  DashboardTable,
  Merchant,
  MerchantRule,
  Tag,
  Transaction,
} from "./types";

addRxPlugin(RxDBMigrationSchemaPlugin);

const ID_FIELD = { type: "string" as const, maxLength: 100 };

const transactionSchema: RxJsonSchema<Transaction> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    date: { type: "string", maxLength: 10 },
    amount: { type: "number" },
    originalDescription: { type: "string" },
    memo: { type: "string" },
    merchantId: { type: "string", maxLength: 100 },
    accountId: { type: "string", maxLength: 100 },
    tagIds: { type: "array", items: { type: "string" } },
  },
  required: ["id", "date", "amount", "originalDescription", "tagIds"],
  indexes: ["date", "merchantId", "accountId"],
};

const tagSchema: RxJsonSchema<Tag> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    name: { type: "string", maxLength: 200 },
    icon: { type: "string" },
    color: { type: "string" },
  },
  required: ["id", "name"],
  indexes: ["name"],
};

const merchantSchema: RxJsonSchema<Merchant> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    name: { type: "string", maxLength: 200 },
  },
  required: ["id", "name"],
  indexes: ["name"],
};

const accountSchema: RxJsonSchema<Account> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    name: { type: "string" },
    type: { type: "string" },
  },
  required: ["id", "name"],
};

const merchantRuleSchema: RxJsonSchema<MerchantRule> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    logic: { type: "string" },
    conditions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          field: { type: "string" },
          operator: { type: "string" },
          value: { type: "string" },
        },
      },
    },
    merchantId: { type: "string" },
    tagIds: { type: "array", items: { type: "string" } },
  },
  required: ["id", "logic", "conditions", "tagIds"],
};

const dashboardChartSchema: RxJsonSchema<DashboardChart> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    title: { type: "string" },
    chartType: { type: "string" },
    granularity: { type: "string" },
    startDate: { type: "string" },
    endDate: { type: "string" },
    tagId: { type: "string" },
    merchantId: { type: "string" },
    position: { type: "number" },
    colSpan: { type: "number" },
    rowSpan: { type: "number" },
    excludedTagIds: { type: "array", items: { type: "string" } },
    excludedMerchantIds: { type: "array", items: { type: "string" } },
    direction: { type: "string" },
    descriptionFilter: { type: "string" },
    descriptionFilterMode: { type: "string" },
    legendPosition: { type: "string" },
    filters: {
      type: "array",
      items: {
        type: "object",
        properties: {
          field: { type: "string" },
          operator: { type: "string" },
          value: { type: "string" },
        },
      },
    },
  },
  required: ["id", "title", "chartType", "granularity", "position"],
};

const dashboardTableSchema: RxJsonSchema<DashboardTable> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    title: { type: "string" },
    model: { type: "string" },
    columns: { type: "array", items: { type: "string" } },
    position: { type: "number" },
    colSpan: { type: "number" },
    rowSpan: { type: "number" },
  },
  required: ["id", "title", "model", "columns", "position"],
};

interface SchemaVersionDoc {
  id: string;
  value: number;
}

const metaSchema: RxJsonSchema<SchemaVersionDoc> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    value: { type: "number" },
  },
  required: ["id", "value"],
};

const backupSchema: RxJsonSchema<{ id: string; data?: string }> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    data: { type: "string" },
  },
  required: ["id"],
};

type DatabaseCollections = {
  transactions: RxCollection<Transaction>;
  tags: RxCollection<Tag>;
  merchants: RxCollection<Merchant>;
  accounts: RxCollection<Account>;
  merchant_rules: RxCollection<MerchantRule>;
  dashboard_charts: RxCollection<DashboardChart>;
  dashboard_tables: RxCollection<DashboardTable>;
  meta: RxCollection<SchemaVersionDoc>;
  backups: RxCollection<{ id: string; data?: string }>;
};

export type BudgeeDatabase = RxDatabase<DatabaseCollections>;

export class Collection<T extends { id: string }> {
  #collection: RxCollection<T>;

  constructor(collection: RxCollection<T>) {
    this.#collection = collection;
  }

  get rxCollection(): RxCollection<T> {
    return this.#collection;
  }

  async get(id: string): Promise<T> {
    const doc = await this.#collection.findOne(id).exec();
    if (!doc) throw new Error(`Document not found: ${id}`);
    return doc.toJSON(true) as T;
  }

  async put(doc: T): Promise<{ id: string }> {
    await this.#collection.upsert(doc);
    return { id: doc.id };
  }

  async bulkDocs(docs: T[]): Promise<void> {
    await this.#collection.bulkUpsert(docs);
  }

  async remove(id: string): Promise<void> {
    const doc = await this.#collection.findOne(id).exec();
    if (doc) await doc.remove();
  }

  async find(query: MangoQuery<T>): Promise<T[]> {
    const results = await this.#collection.find(query).exec();
    return results.map((doc) => doc.toJSON(true) as T);
  }

  async all(): Promise<T[]> {
    const results = await this.#collection.find().exec();
    return results.map((doc) => doc.toJSON(true) as T);
  }

  async clear(): Promise<void> {
    const docs = await this.#collection.find().exec();
    await Promise.all(docs.map((doc) => doc.remove()));
  }

  async count(): Promise<number> {
    return this.#collection.count().exec();
  }
}

export interface Databases {
  transactions: Collection<Transaction>;
  tags: Collection<Tag>;
  merchants: Collection<Merchant>;
  accounts: Collection<Account>;
  merchantRules: Collection<MerchantRule>;
  dashboardCharts: Collection<DashboardChart>;
  dashboardTables: Collection<DashboardTable>;
  meta: Collection<SchemaVersionDoc>;
  backups: Collection<{ id: string; data?: string }>;
}

export async function createDatabases(storage: unknown): Promise<Databases> {
  const name = `budgee_${Math.random().toString(36).slice(2)}`;
  const rxdb = await createRxDatabase<DatabaseCollections>({
    name,
    storage: storage as Parameters<typeof createRxDatabase>[0]["storage"],
  });

  await rxdb.addCollections({
    transactions: { schema: transactionSchema },
    tags: { schema: tagSchema },
    merchants: { schema: merchantSchema },
    accounts: { schema: accountSchema },
    merchant_rules: { schema: merchantRuleSchema },
    dashboard_charts: { schema: dashboardChartSchema },
    dashboard_tables: { schema: dashboardTableSchema },
    meta: { schema: metaSchema },
    backups: { schema: backupSchema },
  });

  return {
    transactions: new Collection(rxdb.transactions),
    tags: new Collection(rxdb.tags),
    merchants: new Collection(rxdb.merchants),
    accounts: new Collection(rxdb.accounts),
    merchantRules: new Collection(rxdb.merchant_rules),
    dashboardCharts: new Collection(rxdb.dashboard_charts),
    dashboardTables: new Collection(rxdb.dashboard_tables),
    meta: new Collection(rxdb.meta),
    backups: new Collection(rxdb.backups),
  };
}

export async function destroyAll(dbs: Databases) {
  const rxCollection = (dbs.transactions as Collection<Transaction>).rxCollection;
  const rxdb = rxCollection.database;
  const storage = rxdb.storage;
  const name = rxdb.name;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (rxdb as any).destroy();
  await removeRxDatabase(name, storage);
}

async function createDefaultDatabase(): Promise<Databases> {
  if (import.meta.env?.MODE === "test") {
    const { getRxStorageMemory } = await import("rxdb/plugins/storage-memory");
    return createDatabases(getRxStorageMemory());
  }
  const { getRxStorageDexie } = await import("rxdb/plugins/storage-dexie");
  return createDatabases(getRxStorageDexie());
}

export let db: Databases;

const dbReady = createDefaultDatabase().then((dbs) => {
  db = dbs;
  return dbs;
});

export function waitForDb(): Promise<Databases> {
  return dbReady;
}
