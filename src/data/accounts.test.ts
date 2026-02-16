import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { Accounts } from "./accounts";

beforeEach(async () => {
  await db.accounts.clear();
});

describe("Accounts", () => {
  it("should return all accounts", async () => {
    await db.accounts.bulkAdd([{ name: "Checking" }, { name: "Savings" }]);
    const all = await Accounts.all();
    expect(all).toHaveLength(2);
  });

  it("should return empty array when no accounts", async () => {
    const all = await Accounts.all();
    expect(all).toEqual([]);
  });
});
