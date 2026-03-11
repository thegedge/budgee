import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { clearDb } from "../test/clearDb";
import { uuid } from "../uuid";
import { Account } from "./Account";

beforeEach(async () => {
  await clearDb(db.accounts);
});

describe("Account", () => {
  it("should return all accounts", async () => {
    await db.accounts.bulkDocs([
      { id: uuid(), name: "Checking" },
      { id: uuid(), name: "Savings" },
    ]);
    const all = await Account.all();
    expect(all).toHaveLength(2);
  });

  it("should return empty array when no accounts", async () => {
    const all = await Account.all();
    expect(all).toEqual([]);
  });

  it("should create an account with a type", async () => {
    const { id } = await Account.create({ name: "Main", type: "chequing" });
    const account = await Account.get(id);
    expect(account?.name).toBe("Main");
    expect(account?.type).toBe("chequing");
  });

  it("should create an account without a type", async () => {
    const { id } = await Account.create({ name: "Main" });
    const account = await Account.get(id);
    expect(account?.name).toBe("Main");
    expect(account?.type).toBeUndefined();
  });

  it("should update account type", async () => {
    const { id } = await Account.create({ name: "Card", type: "chequing" });
    await Account.update(id, { type: "credit_card" });
    const account = await Account.get(id);
    expect(account?.type).toBe("credit_card");
  });

  it("should remove an account", async () => {
    const { id } = await Account.create({ name: "ToRemove" });
    await Account.remove(id);
    const account = await Account.get(id);
    expect(account).toBeUndefined();
  });
});
