import { db } from "../database/db";
import { allDocs } from "../database/pouchHelpers";
import type { Account } from "../database/types";
import { uuid } from "../uuid";

export class Accounts {
  private constructor() {}

  static async all(): Promise<Account[]> {
    return allDocs(db.accounts);
  }

  static async get(id: string): Promise<Account | undefined> {
    try {
      return await db.accounts.get(id);
    } catch {
      return undefined;
    }
  }

  static async create(account: Omit<Account, "_id" | "_rev">): Promise<string> {
    const id = uuid();
    await db.accounts.put({ ...account, _id: id });
    return id;
  }

  static async update(id: string, changes: Partial<Account>): Promise<void> {
    const doc = await db.accounts.get(id);
    await db.accounts.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const doc = await db.accounts.get(id);
    await db.accounts.remove(doc);
  }
}
