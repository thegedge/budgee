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

export type DocType =
  | "transaction"
  | "tag"
  | "merchant"
  | "account"
  | "merchantRule"
  | "dashboardChart"
  | "dashboardTable"
  | "meta"
  | "backup";

type PouchDoc = Record<string, unknown> & { _id: string; _rev: string };

export class Collection<T extends object> {
  #db: PouchDB.Database;
  #docType: DocType;

  constructor(db: PouchDB.Database, docType: DocType) {
    this.#db = db;
    this.#docType = docType;
  }

  get raw(): PouchDB.Database {
    return this.#db;
  }

  get docType(): DocType {
    return this.#docType;
  }

  async get(id: string): Promise<T & { _id: string; _rev: string }> {
    return this.#db.get(id) as Promise<T & { _id: string; _rev: string }>;
  }

  async put(doc: T & { _id: string; _rev?: string }): Promise<PouchDB.Core.Response> {
    return this.#db.put({
      ...doc,
      docType: this.#docType,
    } as unknown as PouchDB.Core.PutDocument<PouchDoc>);
  }

  async bulkDocs(docs: T[]): Promise<(PouchDB.Core.Response | PouchDB.Core.Error)[]> {
    return this.#db.bulkDocs(
      docs.map((d) => ({
        ...d,
        docType: this.#docType,
      })) as unknown as PouchDB.Core.PutDocument<PouchDoc>[],
    );
  }

  async remove(doc: T & { _id: string; _rev: string }): Promise<PouchDB.Core.Response> {
    return this.#db.remove(doc as unknown as PouchDB.Core.RemoveDocument);
  }

  async find(request: PouchDB.Find.FindRequest<T>): Promise<PouchDB.Find.FindResponse<T>> {
    const result = await this.#db.find({
      limit: Number.MAX_SAFE_INTEGER,
      ...request,
      selector: { ...request.selector, docType: this.#docType },
    } as PouchDB.Find.FindRequest<Record<string, unknown>>);
    return result as unknown as PouchDB.Find.FindResponse<T>;
  }

  async allDocs(_options?: { include_docs: true }): Promise<PouchDB.Core.AllDocsResponse<T>> {
    const result = await this.#db.find({
      selector: { docType: this.#docType },
      limit: Number.MAX_SAFE_INTEGER,
    });
    const docs = result.docs as unknown as (T & { _id: string; _rev: string })[];
    return {
      offset: 0,
      total_rows: docs.length,
      rows: docs.map((doc) => ({
        id: doc._id,
        key: doc._id,
        value: { rev: doc._rev },
        doc,
      })),
    } as PouchDB.Core.AllDocsResponse<T>;
  }

  async createIndex(options: {
    index: { fields: string[] };
  }): Promise<PouchDB.Find.CreateIndexResponse<T>> {
    return this.#db.createIndex({
      index: { fields: ["docType", ...options.index.fields] },
    }) as Promise<PouchDB.Find.CreateIndexResponse<T>>;
  }
}

export interface SchemaVersionDoc {
  _id: string;
  value: number;
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
  backups: Collection<Record<string, unknown>>;
}

let dbCounter = 0;

export function createDatabases(adapter?: string): Databases {
  const name = adapter ? `budgee_${++dbCounter}` : "budgee";
  const rawDb = new PouchDB(name, adapter ? { adapter } : {});
  return {
    transactions: new Collection<Transaction>(rawDb, "transaction"),
    tags: new Collection<Tag>(rawDb, "tag"),
    merchants: new Collection<Merchant>(rawDb, "merchant"),
    accounts: new Collection<Account>(rawDb, "account"),
    merchantRules: new Collection<MerchantRule>(rawDb, "merchantRule"),
    dashboardCharts: new Collection<DashboardChart>(rawDb, "dashboardChart"),
    dashboardTables: new Collection<DashboardTable>(rawDb, "dashboardTable"),
    meta: new Collection<SchemaVersionDoc>(rawDb, "meta"),
    backups: new Collection<Record<string, unknown>>(rawDb, "backup"),
  };
}

export function rawDatabase(dbs: Databases): PouchDB.Database {
  return dbs.transactions.raw;
}

export async function createIndexes(dbs: Databases) {
  await rawDatabase(dbs).createIndex({ index: { fields: ["docType"] } });
  await dbs.transactions.createIndex({ index: { fields: ["merchantId"] } });
  await dbs.transactions.createIndex({ index: { fields: ["accountId"] } });
  await dbs.tags.createIndex({ index: { fields: ["name"] } });
  await dbs.merchants.createIndex({ index: { fields: ["name"] } });
}

export async function destroyAll(dbs: Databases) {
  await rawDatabase(dbs).destroy();
}

const defaultAdapter = import.meta.env?.MODE === "test" ? "memory" : undefined;
export const db = createDatabases(defaultAdapter);
createIndexes(db);
