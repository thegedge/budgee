import { waitForDb } from "../database/Db";
import type { MerchantRecord } from "../database/types";
import { uuid } from "../uuid";

export class Merchant {
  readonly id: string;
  readonly name: string;

  constructor(data: MerchantRecord) {
    this.id = data.id;
    this.name = data.name;
  }

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.merchants.subscribe(callback);
  }

  static async all(): Promise<Merchant[]> {
    const db = await waitForDb();
    return (await db.merchants.all()).map((d) => new Merchant(d));
  }

  static async get(id: string): Promise<Merchant | undefined> {
    const db = await waitForDb();
    try {
      return new Merchant(await db.merchants.get(id));
    } catch {
      return undefined;
    }
  }

  static async create(name: string): Promise<Merchant> {
    const db = await waitForDb();
    const data = { id: uuid(), name };
    await db.merchants.put(data);
    return new Merchant(data);
  }

  static async update(id: string, changes: Partial<MerchantRecord>): Promise<void> {
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
    const found = all.find((m) => m.name.toLowerCase() === name.toLowerCase());
    return found ? new Merchant(found) : undefined;
  }
}
