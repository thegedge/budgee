import { db } from "../database/db";
import type { Merchant } from "../database/types";

export class Merchants {
  private constructor() {}

  static all(): Promise<Merchant[]> {
    return db.merchants.toArray();
  }

  static get(id: number): Promise<Merchant | undefined> {
    return db.merchants.get(id);
  }

  static create(name: string): Promise<number> {
    return db.merchants.add({ name }) as Promise<number>;
  }

  static update(id: number, changes: Partial<Merchant>): Promise<number> {
    return db.merchants.update(id, changes);
  }

  static remove(id: number): Promise<void> {
    return db.merchants.delete(id);
  }

  static byName(name: string): Promise<Merchant | undefined> {
    return db.merchants.where("name").equalsIgnoreCase(name).first();
  }
}
