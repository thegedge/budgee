import { uuid } from "../uuid";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { clearDb } from "../database/pouchHelpers";
import { Accounts } from "./accounts";

beforeEach(async () => {
  await clearDb(db.accounts);
});

describe("Accounts", () => {
  it("should return all accounts", async () => {
    await db.accounts.bulkDocs([
      { id: uuid(), name: "Checking" },
      { id: uuid(), name: "Savings" },
    ]);
    const all = await Accounts.all();
    expect(all).toHaveLength(2);
  });

  it("should return empty array when no accounts", async () => {
    const all = await Accounts.all();
    expect(all).toEqual([]);
  });

  it("should create an account with a type", async () => {
    const id = await Accounts.create({ name: "Main", type: "chequing" });
    const account = await Accounts.get(id);
    expect(account?.name).toBe("Main");
    expect(account?.type).toBe("chequing");
  });

  it("should create an account without a type", async () => {
    const id = await Accounts.create({ name: "Main" });
    const account = await Accounts.get(id);
    expect(account?.name).toBe("Main");
    expect(account?.type).toBeUndefined();
  });

  it("should update account type", async () => {
    const id = await Accounts.create({ name: "Card", type: "chequing" });
    await Accounts.update(id, { type: "credit_card" });
    const account = await Accounts.get(id);
    expect(account?.type).toBe("credit_card");
  });

  it("should remove an account", async () => {
    const id = await Accounts.create({ name: "ToRemove" });
    await Accounts.remove(id);
    const account = await Accounts.get(id);
    expect(account).toBeUndefined();
  });
});
