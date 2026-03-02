import { waitForDb } from "../database/Db";
import type { AccountRecord, AccountType } from "../database/types";
import { uuid } from "../uuid";

export class Account {
  readonly id: string;
  readonly name: string;
  readonly type?: AccountType;

  constructor(data: AccountRecord) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
  }

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.accounts.subscribe(callback);
  }

  static async all(): Promise<Account[]> {
    const db = await waitForDb();
    return (await db.accounts.all()).map((d) => new Account(d));
  }

  static async get(id: string): Promise<Account | undefined> {
    const db = await waitForDb();
    try {
      return new Account(await db.accounts.get(id));
    } catch {
      return undefined;
    }
  }

  static async create(account: Omit<AccountRecord, "id">): Promise<Account> {
    const db = await waitForDb();
    const data = { ...account, id: uuid() };
    await db.accounts.put(data);
    return new Account(data);
  }

  static async update(id: string, changes: Partial<AccountRecord>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.accounts.get(id);
    await db.accounts.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const db = await waitForDb();
    await db.accounts.remove(id);
  }
}
