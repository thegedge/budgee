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
      { _id: crypto.randomUUID(), name: "Checking" },
      { _id: crypto.randomUUID(), name: "Savings" },
    ]);
    const all = await Accounts.all();
    expect(all).toHaveLength(2);
  });

  it("should return empty array when no accounts", async () => {
    const all = await Accounts.all();
    expect(all).toEqual([]);
  });
});
