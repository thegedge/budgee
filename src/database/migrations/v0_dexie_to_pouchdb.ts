import type { DatabaseExport } from "../importDb";

const OLD_DB_NAME = "BudgeeDatabase";

const ENTITY_STORES = ["tags", "merchants", "accounts"] as const;
const ALL_STORES = [
  ...ENTITY_STORES,
  "transactions",
  "merchantRules",
  "dashboardCharts",
  "dashboardTables",
] as const;

type StoreName = (typeof ALL_STORES)[number];
type RawData = Record<StoreName, Record<string, unknown>[]>;

function openDatabase(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
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

export function databaseExists(name: string): Promise<boolean> {
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

export async function readDexieData(): Promise<DatabaseExport | null> {
  const exists = await databaseExists(OLD_DB_NAME);
  if (!exists) return null;

  const idb = await openDatabase(OLD_DB_NAME);
  const data = {} as RawData;
  for (const store of ALL_STORES) {
    data[store] = await readAllRecords(idb, store);
  }
  idb.close();

  return { version: 0, ...data } as unknown as DatabaseExport;
}

export function deleteDexieDatabase() {
  indexedDB.deleteDatabase(OLD_DB_NAME);
}

function mapId(map: Map<number, string>, oldId: unknown): string | undefined {
  if (typeof oldId === "number") return map.get(oldId);
  return undefined;
}

function mapIds(map: Map<number, string>, oldIds: unknown): string[] {
  if (!Array.isArray(oldIds)) return [];
  return oldIds.map((id) => map.get(id)).filter((id): id is string => id != null);
}

/**
 * Pure migration: transforms version 0 (Dexie raw data) to version 1 (PouchDB format).
 * Remaps numeric ids to UUIDs and rewrites all foreign key references.
 */
export function migrateV0toV1(data: DatabaseExport): DatabaseExport {
  const raw = data as unknown as { version: number } & RawData;

  const idMaps: Record<string, Map<number, string>> = {};
  for (const store of ENTITY_STORES) {
    const map = new Map<number, string>();
    for (const record of raw[store] ?? []) {
      map.set(record.id as number, crypto.randomUUID());
    }
    idMaps[store] = map;
  }

  const mapEntity = (records: Record<string, unknown>[], idMap: Map<number, string>) =>
    records.map((record) => {
      const { id, ...rest } = record;
      return { ...rest, _id: idMap.get(id as number) };
    });

  const tags = mapEntity(raw.tags ?? [], idMaps.tags);
  const merchants = mapEntity(raw.merchants ?? [], idMaps.merchants);
  const accounts = mapEntity(raw.accounts ?? [], idMaps.accounts);

  const transactions = (raw.transactions ?? []).map((record) => {
    const { id: _oldId, merchantId, accountId, tagIds, ...rest } = record;
    return {
      ...rest,
      _id: crypto.randomUUID(),
      merchantId: mapId(idMaps.merchants, merchantId),
      accountId: mapId(idMaps.accounts, accountId),
      tagIds: mapIds(idMaps.tags, tagIds),
    };
  });

  const merchantRules = (raw.merchantRules ?? []).map((record) => {
    const { id: _oldId, merchantId, tagIds, ...rest } = record;
    return {
      ...rest,
      _id: crypto.randomUUID(),
      merchantId: mapId(idMaps.merchants, merchantId),
      tagIds: mapIds(idMaps.tags, tagIds),
    };
  });

  const dashboardCharts = (raw.dashboardCharts ?? []).map((record) => {
    const { id: _oldId, tagId, merchantId, excludedTagIds, excludedMerchantIds, ...rest } = record;
    return {
      ...rest,
      _id: crypto.randomUUID(),
      tagId: mapId(idMaps.tags, tagId),
      merchantId: mapId(idMaps.merchants, merchantId),
      excludedTagIds: mapIds(idMaps.tags, excludedTagIds),
      excludedMerchantIds: mapIds(idMaps.merchants, excludedMerchantIds),
    };
  });

  const dashboardTables = (raw.dashboardTables ?? []).map((record) => {
    const { id: _oldId, ...rest } = record;
    return { ...rest, _id: crypto.randomUUID() };
  });

  return {
    version: 1,
    transactions,
    tags,
    merchants,
    accounts,
    merchantRules,
    dashboardCharts,
    dashboardTables,
  } as unknown as DatabaseExport;
}
