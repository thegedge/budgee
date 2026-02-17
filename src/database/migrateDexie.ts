import { db } from "./db";

const OLD_DB_NAME = "BudgeeDatabase";

const ENTITY_STORES = ["tags", "merchants", "accounts"] as const;
const FK_STORES = ["transactions", "merchantRules", "dashboardCharts", "dashboardTables"] as const;
const ALL_STORES = [...ENTITY_STORES, ...FK_STORES] as const;

type StoreName = (typeof ALL_STORES)[number];

const POUCH_DB_NAMES: Record<StoreName, string> = {
  transactions: "budgee_transactions",
  tags: "budgee_tags",
  merchants: "budgee_merchants",
  accounts: "budgee_accounts",
  merchantRules: "budgee_merchant_rules",
  dashboardCharts: "budgee_dashboard_charts",
  dashboardTables: "budgee_dashboard_tables",
};

function databaseExists(name: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = indexedDB.open(name);
    let existed = true;
    req.onupgradeneeded = () => {
      existed = false;
    };
    req.onsuccess = () => {
      req.result.close();
      if (!existed) {
        indexedDB.deleteDatabase(name);
      }
      resolve(existed);
    };
    req.onerror = () => resolve(false);
  });
}

function readAllRecords(idb: IDBDatabase, storeName: string): Promise<Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    if (!idb.objectStoreNames.contains(storeName)) {
      resolve([]);
      return;
    }
    const tx = idb.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result ?? []);
    req.onerror = () => reject(req.error);
  });
}

function openDatabase(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function mapId(map: Map<number, string>, oldId: unknown): string | undefined {
  if (typeof oldId === "number") {
    return map.get(oldId);
  }
  return undefined;
}

function mapIds(map: Map<number, string>, oldIds: unknown): string[] {
  if (!Array.isArray(oldIds)) return [];
  return oldIds.map((id) => map.get(id)).filter((id): id is string => id != null);
}

export async function migrateDexie() {
  const oldExists = await databaseExists(OLD_DB_NAME);
  if (!oldExists) return;

  const pouchEmpty = await Promise.all(
    Object.values(POUCH_DB_NAMES).map(async (name) => {
      const exists = await databaseExists(`_pouch_${name}`);
      return !exists;
    }),
  );
  if (!pouchEmpty.every(Boolean)) return;

  console.log("[migrateDexie] Migrating data from Dexie to PouchDB...");

  const idb = await openDatabase(OLD_DB_NAME);

  const data: Record<StoreName, Record<string, unknown>[]> = {} as Record<
    StoreName,
    Record<string, unknown>[]
  >;
  for (const store of ALL_STORES) {
    data[store] = await readAllRecords(idb, store);
  }

  idb.close();

  const idMaps: Record<string, Map<number, string>> = {};
  for (const store of ENTITY_STORES) {
    const map = new Map<number, string>();
    for (const record of data[store]) {
      const oldId = record.id as number;
      map.set(oldId, crypto.randomUUID());
    }
    idMaps[store] = map;
  }

  async function insertEntities<T extends object>(
    pouchDb: PouchDB.Database<T>,
    records: Record<string, unknown>[],
    idMap: Map<number, string>,
  ) {
    if (records.length === 0) return;
    const docs = records.map((record) => {
      const { id: _id, ...rest } = record;
      return { ...rest, _id: idMap.get(_id as number) } as PouchDB.Core.PutDocument<T>;
    });
    await pouchDb.bulkDocs(docs);
  }

  await insertEntities(db.tags, data.tags, idMaps.tags);
  await insertEntities(db.merchants, data.merchants, idMaps.merchants);
  await insertEntities(db.accounts, data.accounts, idMaps.accounts);

  // Transactions
  if (data.transactions.length > 0) {
    const docs = data.transactions.map((record) => {
      const { id: _oldId, merchantId, accountId, tagIds, ...rest } = record;
      return {
        ...rest,
        _id: crypto.randomUUID(),
        merchantId: mapId(idMaps.merchants, merchantId),
        accountId: mapId(idMaps.accounts, accountId),
        tagIds: mapIds(idMaps.tags, tagIds),
      };
    });
    await db.transactions.bulkDocs(docs as Parameters<typeof db.transactions.bulkDocs>[0]);
  }

  // Merchant rules
  if (data.merchantRules.length > 0) {
    const docs = data.merchantRules.map((record) => {
      const { id: _oldId, merchantId, tagIds, ...rest } = record;
      return {
        ...rest,
        _id: crypto.randomUUID(),
        merchantId: mapId(idMaps.merchants, merchantId),
        tagIds: mapIds(idMaps.tags, tagIds),
      };
    });
    await db.merchantRules.bulkDocs(docs as Parameters<typeof db.merchantRules.bulkDocs>[0]);
  }

  // Dashboard charts
  if (data.dashboardCharts.length > 0) {
    const docs = data.dashboardCharts.map((record) => {
      const {
        id: _oldId,
        tagId,
        merchantId,
        excludedTagIds,
        excludedMerchantIds,
        ...rest
      } = record;
      return {
        ...rest,
        _id: crypto.randomUUID(),
        tagId: mapId(idMaps.tags, tagId),
        merchantId: mapId(idMaps.merchants, merchantId),
        excludedTagIds: mapIds(idMaps.tags, excludedTagIds),
        excludedMerchantIds: mapIds(idMaps.merchants, excludedMerchantIds),
      };
    });
    await db.dashboardCharts.bulkDocs(docs as Parameters<typeof db.dashboardCharts.bulkDocs>[0]);
  }

  // Dashboard tables
  if (data.dashboardTables.length > 0) {
    const docs = data.dashboardTables.map((record) => {
      const { id: _oldId, ...rest } = record;
      return { ...rest, _id: crypto.randomUUID() };
    });
    await db.dashboardTables.bulkDocs(docs as Parameters<typeof db.dashboardTables.bulkDocs>[0]);
  }

  indexedDB.deleteDatabase(OLD_DB_NAME);
  console.log("[migrateDexie] Migration complete.");
}
