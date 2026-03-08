import { Repository } from "../database/Repository";
import type { MerchantRecord } from "../database/types";

export class Merchant {
  readonly id: string;
  readonly name: string;

  constructor(data: MerchantRecord) {
    this.id = data.id;
    this.name = data.name;
  }

  static async subscribe(callback: () => void) {
    return merchants.subscribe(callback);
  }

  static async all(): Promise<Merchant[]> {
    const docs = await merchants.all();
    return docs.map((d) => new Merchant(d));
  }

  static async get(id: string): Promise<Merchant | undefined> {
    const doc = await merchants.get(id);
    return doc ? new Merchant(doc) : undefined;
  }

  static async create(name: string): Promise<Merchant> {
    const doc = await merchants.create({ name } as Omit<MerchantRecord, "id">);
    return new Merchant(doc);
  }

  static async update(id: string, changes: Partial<MerchantRecord>): Promise<void> {
    await merchants.update(id, changes);
  }

  static async remove(id: string): Promise<void> {
    await merchants.remove(id);
  }

  static async byName(name: string): Promise<Merchant | undefined> {
    const all = await merchants.all();
    const found = all.find((m) => m.name.toLowerCase() === name.toLowerCase());
    return found ? new Merchant(found) : undefined;
  }
}

export const merchants = new Repository<MerchantRecord>({
  collection: (dbs) => dbs.merchants,
  onRemove: async (id, dbs) => {
    const all = await dbs.transactions.all();
    const affected = all.filter((t) => t.merchantId === id);
    if (affected.length > 0) {
      await dbs.transactions.bulkDocs(affected.map((t) => ({ ...t, merchantId: "" })));
    }
  },
});
