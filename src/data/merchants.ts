import { db } from "../database/db";
import type { Merchant } from "../database/types";
import { uuid } from "../uuid";

export class Merchants {
  private constructor() {}

  static async all(): Promise<Merchant[]> {
    return db.merchants.all();
  }

  static async get(id: string): Promise<Merchant | undefined> {
    try {
      return await db.merchants.get(id);
    } catch {
      return undefined;
    }
  }

  static async create(name: string): Promise<string> {
    const id = uuid();
    await db.merchants.put({ id, name });
    return id;
  }

  static async update(id: string, changes: Partial<Merchant>): Promise<void> {
    const doc = await db.merchants.get(id);
    await db.merchants.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    await db.merchants.remove(id);
  }

  static async byName(name: string): Promise<Merchant | undefined> {
    const all = await db.merchants.all();
    return all.find((m) => m.name.toLowerCase() === name.toLowerCase());
  }
}
