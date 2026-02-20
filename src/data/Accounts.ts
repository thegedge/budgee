import { waitForDb } from "../database/Db";
import type { Account } from "../database/types";
import { uuid } from "../uuid";

export class Accounts {
  private constructor() {}

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.accounts.subscribe(callback);
  }

  static async all(): Promise<Account[]> {
    const db = await waitForDb();
    return db.accounts.all();
  }

  static async get(id: string): Promise<Account | undefined> {
    const db = await waitForDb();
    try {
      return await db.accounts.get(id);
    } catch {
      return undefined;
    }
  }

  static async create(account: Omit<Account, "id">): Promise<string> {
    const db = await waitForDb();
    const id = uuid();
    await db.accounts.put({ ...account, id });
    return id;
  }

  static async update(id: string, changes: Partial<Account>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.accounts.get(id);
    await db.accounts.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const db = await waitForDb();
    await db.accounts.remove(id);
  }
}
