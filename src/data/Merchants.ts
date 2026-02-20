import { waitForDb } from "../database/Db";
import type { Merchant } from "../database/types";
import { uuid } from "../uuid";

export class Merchants {
  private constructor() {}

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.merchants.subscribe(callback);
  }

  static async all(): Promise<Merchant[]> {
    const db = await waitForDb();
    return db.merchants.all();
  }

  static async get(id: string): Promise<Merchant | undefined> {
    const db = await waitForDb();
    try {
      return await db.merchants.get(id);
    } catch {
      return undefined;
    }
  }

  static async create(name: string): Promise<string> {
    const db = await waitForDb();
    const id = uuid();
    await db.merchants.put({ id, name });
    return id;
  }

  static async update(id: string, changes: Partial<Merchant>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.merchants.get(id);
    await db.merchants.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const db = await waitForDb();
    await db.merchants.remove(id);
  }

  static async byName(name: string): Promise<Merchant | undefined> {
    const db = await waitForDb();
    const all = await db.merchants.all();
    return all.find((m) => m.name.toLowerCase() === name.toLowerCase());
  }
}
