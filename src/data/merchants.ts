import { db } from "../database/db";
import { allDocs } from "../database/pouchHelpers";
import type { Merchant } from "../database/types";
import { uuid } from "../uuid";

export class Merchants {
  private constructor() {}

  static async all(): Promise<Merchant[]> {
    return allDocs(db.merchants);
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
    await db.merchants.put({ _id: id, name });
    return id;
  }

  static async update(id: string, changes: Partial<Merchant>): Promise<void> {
    const doc = await db.merchants.get(id);
    await db.merchants.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const doc = await db.merchants.get(id);
    await db.merchants.remove(doc);
  }

  static async byName(name: string): Promise<Merchant | undefined> {
    const all = await allDocs(db.merchants);
    return all.find((m) => m.name.toLowerCase() === name.toLowerCase());
  }
}
