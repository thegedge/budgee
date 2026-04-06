import {
  type MangoQuery,
  type RxCollection,
  type RxDatabase,
  type RxJsonSchema,
  addRxPlugin,
  createRxDatabase,
  removeRxDatabase,
} from "rxdb/plugins/core";
import { RxDBCleanupPlugin } from "rxdb/plugins/cleanup";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import type {
  AccountRecord,
  DashboardChartRecord,
  DashboardTableRecord,
  MerchantRecord,
  MerchantRuleRecord,
  TagRecord,
  TransactionRecord,
} from "./types";

addRxPlugin(RxDBCleanupPlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);

export class SchemaVersionError extends Error {
  override cause: unknown;

  constructor(message: string, cause: unknown) {
    super(message);
    this.name = "SchemaVersionError";
    this.cause = cause;
  }
}

const ID_FIELD = { type: "string" as const, maxLength: 100 };

const transactionSchema: RxJsonSchema<TransactionRecord> = {
  version: 3,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    date: { type: "string", maxLength: 10 },
    amount: { type: "number" },
    description: { type: "string" },
    memo: { type: "string" },
    merchantId: { type: "string", maxLength: 100 },
    accountId: { type: "string", maxLength: 100 },
    tagIds: { type: "array", items: { type: "string" } },
    _owner: { type: "string", maxLength: 256 },
    _permission: { type: "string", maxLength: 10 },
  },
  required: ["id", "date", "amount", "description", "tagIds"],
  indexes: ["date"],
};

const tagSchema: RxJsonSchema<TagRecord> = {
  version: 2,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    name: { type: "string", maxLength: 200 },
    icon: { type: "string" },
    color: { type: "string" },
    _owner: { type: "string", maxLength: 256 },
    _permission: { type: "string", maxLength: 10 },
  },
  required: ["id", "name"],
  indexes: ["name"],
};

const merchantSchema: RxJsonSchema<MerchantRecord> = {
  version: 2,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    name: { type: "string", maxLength: 200 },
    _owner: { type: "string", maxLength: 256 },
    _permission: { type: "string", maxLength: 10 },
  },
  required: ["id", "name"],
  indexes: ["name"],
};

const accountSchema: RxJsonSchema<AccountRecord> = {
  version: 3,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    name: { type: "string" },
    type: { type: "string" },
    alias: { type: "string" },
    _owner: { type: "string", maxLength: 256 },
    _permission: { type: "string", maxLength: 10 },
  },
  required: ["id", "name"],
};

const merchantRuleSchema: RxJsonSchema<MerchantRuleRecord> = {
  version: 3,
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
    accountId: { type: "string" },
    tagIds: { type: "array", items: { type: "string" } },
    _owner: { type: "string", maxLength: 256 },
    _permission: { type: "string", maxLength: 10 },
  },
  required: ["id", "logic", "conditions", "tagIds"],
};

const dashboardChartSchema: RxJsonSchema<DashboardChartRecord> = {
  version: 3,
  primaryKey: "id",
  type: "object",
  properties: {
    id: ID_FIELD,
    title: { type: "string" },
    chartType: { type: "string" },
    granularity: { type: "string" },
    startDate: { type: "string" },
    endDate: { type: "string" },
    position: { type: "number" },
    colSpan: { type: "number" },
    rowSpan: { type: "number" },
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
    _owner: { type: "string", maxLength: 256 },
    _permission: { type: "string", maxLength: 10 },
  },
  required: ["id", "title", "chartType", "granularity", "position"],
};

const dashboardTableSchema: RxJsonSchema<DashboardTableRecord> = {
  version: 2,
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
    _owner: { type: "string", maxLength: 256 },
    _permission: { type: "string", maxLength: 10 },
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

export const collectionSchemas = {
  transactions: transactionSchema,
  tags: tagSchema,
  merchants: merchantSchema,
  accounts: accountSchema,
  merchant_rules: merchantRuleSchema,
  dashboard_charts: dashboardChartSchema,
  dashboard_tables: dashboardTableSchema,
  meta: metaSchema,
  backups: backupSchema,
} as const;

type DatabaseCollections = {
  transactions: RxCollection<TransactionRecord>;
  tags: RxCollection<TagRecord>;
  merchants: RxCollection<MerchantRecord>;
  accounts: RxCollection<AccountRecord>;
  merchant_rules: RxCollection<MerchantRuleRecord>;
  dashboard_charts: RxCollection<DashboardChartRecord>;
  dashboard_tables: RxCollection<DashboardTableRecord>;
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

  async bulkRemove(ids: string[]): Promise<void> {
    if (ids.length > 0) {
      await this.#collection.bulkRemove(ids);
    }
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
    const ids = docs.map((doc) => doc.primary);
    if (ids.length > 0) {
      await this.#collection.bulkRemove(ids);
    }
  }

  async count(): Promise<number> {
    return this.#collection.count().exec();
  }

  subscribe(callback: () => void): { unsubscribe: () => void } {
    const sub = this.#collection.$.subscribe(callback);
    return { unsubscribe: () => sub.unsubscribe() };
  }
}

export type { DatabaseCollections };

export interface Databases {
  rxdb: RxDatabase<DatabaseCollections>;
  transactions: Collection<TransactionRecord>;
  tags: Collection<TagRecord>;
  merchants: Collection<MerchantRecord>;
  accounts: Collection<AccountRecord>;
  merchantRules: Collection<MerchantRuleRecord>;
  dashboardCharts: Collection<DashboardChartRecord>;
  dashboardTables: Collection<DashboardTableRecord>;
  meta: Collection<SchemaVersionDoc>;
  backups: Collection<{ id: string; data?: string }>;
}

async function hashFunction(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  if (typeof crypto !== "undefined" && crypto.subtle?.digest) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = new Uint8Array(hashBuffer);
    return Array.from(hashArray, (b) => b.toString(16).padStart(2, "0")).join("");
  }

  // Fallback for non-secure contexts (HTTP)
  let hash = 0x811c9dc5;
  for (let i = 0; i < data.length; i++) {
    hash ^= data[i];
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export const LEGACY_DB_NAME = "budgee";

/**
 * Sanitize a user login string for use as an IndexedDB database name suffix.
 * Replaces `@` and `.` with `-`.
 */
export function sanitizeLoginForDbName(login: string): string {
  return login.replace(/[@.]/g, "-");
}

/**
 * Derive the database name for a given user login.
 * Falls back to the legacy name when no login is provided.
 */
export function dbNameForLogin(login?: string | null): string {
  if (!login) return LEGACY_DB_NAME;
  return `${LEGACY_DB_NAME}-${sanitizeLoginForDbName(login)}`;
}

/**
 * Check whether the legacy `budgee` database exists in IndexedDB.
 * Returns false when the `indexedDB.databases()` API is unavailable.
 */
async function legacyDbExists(): Promise<boolean> {
  if (typeof indexedDB === "undefined" || typeof indexedDB.databases !== "function") {
    return false;
  }
  try {
    const dbs = await indexedDB.databases();
    return dbs.some((entry) => entry.name === LEGACY_DB_NAME);
  } catch {
    return false;
  }
}

export async function createDatabases(storage: unknown, name = LEGACY_DB_NAME): Promise<Databases> {
  const rxdb = await createRxDatabase<DatabaseCollections>({
    name,
    storage: storage as Parameters<typeof createRxDatabase>[0]["storage"],
    hashFunction,
    cleanupPolicy: {
      minimumDeletedTime: 1000 * 60 * 60, // 1 hour
      minimumCollectionAge: 1000 * 60, // 1 minute
      runEach: 1000 * 60 * 5, // every 5 minutes
      awaitReplicationsInSync: true,
      waitForLeadership: true,
    },
  });

  // Add collections one at a time.  RxDB's addCollections opens a separate
  // Dexie/IDB database per collection in parallel.  Firefox's IDB chokes on
  // many concurrent version-change transactions, producing
  // "IDBTransaction.objectStore: Transaction is already committing or done."
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collections: Record<
    string,
    { schema: RxJsonSchema<any>; migrationStrategies?: Record<number, (doc: any) => any> }
  > = {
    transactions: {
      schema: transactionSchema,
      migrationStrategies: {
        1: (doc: Record<string, unknown>) => {
          doc.description = doc.originalDescription;
          delete doc.originalDescription;
          return doc;
        },
        2: (doc: TransactionRecord) => doc,
        3: (doc: TransactionRecord) => doc,
      },
    },
    tags: {
      schema: tagSchema,
      migrationStrategies: {
        1: (doc: TagRecord) => doc,
        2: (doc: TagRecord) => doc,
      },
    },
    merchants: {
      schema: merchantSchema,
      migrationStrategies: {
        1: (doc: MerchantRecord) => doc,
        2: (doc: MerchantRecord) => doc,
      },
    },
    accounts: {
      schema: accountSchema,
      migrationStrategies: {
        1: (doc: AccountRecord) => doc,
        2: (doc: AccountRecord) => doc,
        3: (doc: AccountRecord) => doc,
      },
    },
    merchant_rules: {
      schema: merchantRuleSchema,
      migrationStrategies: {
        1: (doc: MerchantRuleRecord) => doc,
        2: (doc: MerchantRuleRecord) => doc,
        3: (doc: MerchantRuleRecord) => doc,
      },
    },
    dashboard_charts: {
      schema: dashboardChartSchema,
      migrationStrategies: {
        1: (doc: Record<string, unknown>) => {
          const filters: { field: string; operator: string; value: string }[] = [
            ...((doc.filters as { field: string; operator: string; value: string }[]) ?? []),
          ];
          if (doc.tagId) filters.push({ field: "tag", operator: "is", value: doc.tagId as string });
          if (doc.merchantId)
            filters.push({ field: "merchant", operator: "is", value: doc.merchantId as string });
          if (doc.direction === "debit")
            filters.push({ field: "amount", operator: "lt", value: "0" });
          else if (doc.direction === "credit")
            filters.push({ field: "amount", operator: "gt", value: "0" });
          if (doc.descriptionFilter) {
            filters.push({
              field: "description",
              operator: doc.descriptionFilterMode === "include" ? "contains" : "excludes",
              value: doc.descriptionFilter as string,
            });
          }
          for (const id of (doc.excludedTagIds as string[]) ?? []) {
            filters.push({ field: "tag", operator: "isNot", value: id });
          }
          for (const id of (doc.excludedMerchantIds as string[]) ?? []) {
            filters.push({ field: "merchant", operator: "isNot", value: id });
          }
          delete doc.tagId;
          delete doc.merchantId;
          delete doc.direction;
          delete doc.descriptionFilter;
          delete doc.descriptionFilterMode;
          delete doc.excludedTagIds;
          delete doc.excludedMerchantIds;
          doc.filters = filters.length > 0 ? filters : undefined;
          return doc;
        },
        2: (doc: DashboardChartRecord) => doc,
        3: (doc: DashboardChartRecord) => doc,
      },
    },
    dashboard_tables: {
      schema: dashboardTableSchema,
      migrationStrategies: {
        1: (doc: DashboardTableRecord) => doc,
        2: (doc: DashboardTableRecord) => doc,
      },
    },
    meta: { schema: metaSchema },
    backups: { schema: backupSchema },
  };

  try {
    for (const [name, config] of Object.entries(collections)) {
      await rxdb.addCollections({ [name]: config });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("DB6")) {
      throw new SchemaVersionError("Database schema version mismatch (DB6)", error);
    }
    throw error;
  }

  return {
    rxdb,
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

export async function clearAllCollections(dbs: Databases): Promise<void> {
  await Promise.all([
    dbs.transactions.clear(),
    dbs.tags.clear(),
    dbs.merchants.clear(),
    dbs.accounts.clear(),
    dbs.merchantRules.clear(),
    dbs.dashboardCharts.clear(),
    dbs.dashboardTables.clear(),
    dbs.meta.clear(),
    dbs.backups.clear(),
  ]);
}

export async function destroyAll(dbs: Databases) {
  const rxCollection = (dbs.transactions as Collection<TransactionRecord>).rxCollection;
  const rxdb = rxCollection.database;
  const storage = rxdb.storage;
  const name = rxdb.name;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (rxdb as any).destroy();
  await removeRxDatabase(name, storage);
}

/**
 * Destroy the cached RxDB instance (closing IDB connections), then delete
 * all budgee IndexedDB databases. Designed to be called from error recovery
 * UI where the database may be in a broken state.
 */
export async function deleteAllDatabases(): Promise<void> {
  // Destroy the RxDB instance to release IDB connections
  if (cachedDb) {
    try {
      const dbs = await cachedDb;
      await destroyAll(dbs);
    } catch {
      // Database may already be broken — ignore destroy errors
    }
    cachedDb = undefined;
  }

  // Delete any remaining budgee databases via raw IDB API
  if (typeof indexedDB !== "undefined" && typeof indexedDB.databases === "function") {
    const allDbs = await indexedDB.databases();
    const budgeeDbs = allDbs.filter((d) => d.name?.includes("budgee"));
    await Promise.all(
      budgeeDbs.map(
        (d) =>
          new Promise<void>((resolve) => {
            const req = indexedDB.deleteDatabase(d.name!);
            req.onsuccess = () => resolve();
            req.onerror = () => resolve();
            req.onblocked = () => resolve();
          }),
      ),
    );
  }
}

export const isDemoMode =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).get("demo") === "1";

async function createDefaultDatabase(login?: string | null): Promise<Databases> {
  if (import.meta.env?.MODE === "test") {
    const { getRxStorageMemory } = await import("rxdb/plugins/storage-memory");
    return createDatabases(getRxStorageMemory(), "budgee_test");
  }

  if (isDemoMode) {
    const { getRxStorageMemory } = await import("rxdb/plugins/storage-memory");
    return createDatabases(getRxStorageMemory(), "budgee_demo");
  }

  const { getRxStorageDexie } = await import("rxdb/plugins/storage-dexie");
  const name = dbNameForLogin(login);

  if (login && name !== LEGACY_DB_NAME && (await legacyDbExists())) {
    console.warn(
      `Legacy database '${LEGACY_DB_NAME}' detected. Data will be synced from the server into your new user-specific database.`,
    );
  }

  return createDatabases(getRxStorageDexie(), name);
}

let cachedDb: Promise<Databases> | undefined;

export function db(): Promise<Databases> {
  if (!cachedDb) {
    cachedDb = (async () => {
      const { fetchIdentity } = await import("../identity");
      const user = await fetchIdentity();
      const dbs = await createDefaultDatabase(user?.login ?? null);
      const { migrateDatabase } = await import("./migrations");
      await migrateDatabase(dbs);
      if (isDemoMode) {
        const { seedDemoData } = await import("./demo");
        await seedDemoData(dbs);
      }
      return dbs;
    })();
  }
  return cachedDb;
}

/**
 * @deprecated Use `db()` instead.
 */
export function waitForDb(): Promise<Databases> {
  return db();
}
