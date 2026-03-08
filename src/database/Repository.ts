import type { MangoQuery } from "rxdb/plugins/core";
import { db, type Collection, type Databases } from "./Db";
import { uuid } from "../uuid";

type CollectionAccessor<T extends { id: string }> = (dbs: Databases) => Collection<T>;

export interface CascadeHook {
  (id: string, dbs: Databases): Promise<void>;
}

export interface RepositoryOptions<T extends { id: string }> {
  collection: CollectionAccessor<T>;
  cache?: boolean;
  onRemove?: CascadeHook;
}

export class Repository<T extends { id: string }> {
  #getCollection: CollectionAccessor<T>;
  #useCache: boolean;
  #cached: T[] | null = null;
  #cacheSubscribed = false;
  #onRemove?: CascadeHook;

  constructor(options: RepositoryOptions<T>) {
    this.#getCollection = options.collection;
    this.#useCache = options.cache ?? false;
    this.#onRemove = options.onRemove;
  }

  async #collection(): Promise<Collection<T>> {
    const dbs = await db();
    return this.#getCollection(dbs);
  }

  async #getCache(): Promise<T[]> {
    if (this.#cached) return this.#cached;
    const col = await this.#collection();
    this.#cached = await col.all();
    if (!this.#cacheSubscribed) {
      this.#cacheSubscribed = true;
      col.subscribe(() => {
        this.#cached = null;
      });
    }
    return this.#cached;
  }

  async all(): Promise<T[]> {
    if (this.#useCache) return this.#getCache();
    const col = await this.#collection();
    return col.all();
  }

  async get(id: string): Promise<T | undefined> {
    const col = await this.#collection();
    try {
      return await col.get(id);
    } catch {
      return undefined;
    }
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const col = await this.#collection();
    const doc = { ...data, id: uuid() } as T;
    await col.put(doc);
    return doc;
  }

  async update(id: string, changes: Partial<T>): Promise<void> {
    const col = await this.#collection();
    const doc = await col.get(id);
    await col.put({ ...doc, ...changes });
  }

  async remove(id: string): Promise<void> {
    if (this.#onRemove) {
      const dbs = await db();
      await this.#onRemove(id, dbs);
    }
    const col = await this.#collection();
    await col.remove(id);
  }

  async find(query: MangoQuery<T>): Promise<T[]> {
    const col = await this.#collection();
    return col.find(query);
  }

  async put(doc: T): Promise<{ id: string }> {
    const col = await this.#collection();
    return col.put(doc);
  }

  async bulkDocs(docs: T[]): Promise<void> {
    const col = await this.#collection();
    await col.bulkDocs(docs);
  }

  async bulkRemove(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    const col = await this.#collection();
    await col.bulkRemove(ids);
  }

  async clear(): Promise<void> {
    const col = await this.#collection();
    await col.clear();
  }

  async count(): Promise<number> {
    const col = await this.#collection();
    return col.count();
  }

  async subscribe(callback: () => void): Promise<{ unsubscribe: () => void }> {
    const col = await this.#collection();
    return col.subscribe(callback);
  }

  clearCache(): void {
    this.#cached = null;
    this.#cacheSubscribed = false;
  }
}
