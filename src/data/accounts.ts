import { db } from "../database/db";
import type { Account } from "../database/types";

export class Accounts {
  private constructor() {}

  static all(): Promise<Account[]> {
    return db.accounts.toArray();
  }

  static get(id: number): Promise<Account | undefined> {
    return db.accounts.get(id);
  }

  static create(account: Omit<Account, "id">): Promise<number> {
    return db.accounts.add(account) as Promise<number>;
  }

  static update(id: number, changes: Partial<Account>): Promise<number> {
    return db.accounts.update(id, changes);
  }

  static remove(id: number): Promise<void> {
    return db.accounts.delete(id);
  }
}
