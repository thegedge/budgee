import { Repository } from "../database/Repository";
import type { AccountRecord, AccountType } from "../database/types";

export class Account {
  readonly id: string;
  readonly name: string;
  readonly type?: AccountType;
  readonly alias?: string;
  readonly _owner?: string;
  readonly _permission?: string;

  constructor(data: AccountRecord) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.alias = data.alias || undefined;
    this._owner = data._owner;
    this._permission = data._permission;
  }

  static async subscribe(callback: () => void) {
    return accounts.subscribe(callback);
  }

  static async all(): Promise<Account[]> {
    const docs = await accounts.all();
    return docs.map((d) => new Account(d));
  }

  static async get(id: string): Promise<Account | undefined> {
    const doc = await accounts.get(id);
    return doc ? new Account(doc) : undefined;
  }

  static async create(account: Omit<AccountRecord, "id">): Promise<Account> {
    const doc = await accounts.create(account);
    return new Account(doc);
  }

  static async update(id: string, changes: Partial<AccountRecord>): Promise<void> {
    await accounts.update(id, changes);
  }

  static async remove(id: string): Promise<void> {
    await accounts.remove(id);
  }

  static toLookup(accts: AccountRecord[]): Record<string, AccountRecord> {
    const map: Record<string, AccountRecord> = {};
    for (const a of accts) {
      map[a.id] = a;
    }
    return map;
  }
}

export const accounts = new Repository<AccountRecord>({
  collection: (dbs) => dbs.accounts,
  onRemove: async (id, dbs) => {
    const all = await dbs.transactions.all();
    const affected = all.filter((t) => t.accountId === id);
    if (affected.length > 0) {
      await dbs.transactions.bulkDocs(affected.map((t) => ({ ...t, accountId: "" })));
    }
  },
});
