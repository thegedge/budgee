import { db } from "../database/db";
import type { Account } from "../database/types";

export class Accounts {
  private constructor() {}

  static all(): Promise<Account[]> {
    return db.accounts.toArray();
  }
}
