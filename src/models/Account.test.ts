import { describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { tid as uuid } from "../tid";
import { Account } from "./Account";

describe("Account", () => {
  it("should return all accounts", async () => {
    const dbs = await db();
    await dbs.accounts.bulkDocs([
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

  it("should cascade-clear accountId on transactions when removing", async () => {
    const dbs = await db();
    const { id: accountId } = await Account.create({ name: "CascadeTest" });
    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2024-01-01",
      amount: -10,
      description: "Test",
      tagIds: [],
      accountId,
    });
    await Account.remove(accountId);
    const tx = await dbs.transactions.get(txId);
    expect(tx.accountId).toBe("");
  });
});
