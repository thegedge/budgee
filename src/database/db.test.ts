import "pouchdb-adapter-memory";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createDatabases, destroyAll, type Databases } from "./db";

describe("BudgeeDatabase", () => {
  let dbs: Databases;

  beforeEach(() => {
    dbs = createDatabases("memory");
  });

  afterEach(async () => {
    await destroyAll(dbs);
  });

  it("should initialize successfully", () => {
    expect(dbs).toBeDefined();
    expect(dbs.transactions).toBeDefined();
    expect(dbs.tags).toBeDefined();
    expect(dbs.merchants).toBeDefined();
    expect(dbs.accounts).toBeDefined();
    expect(dbs.merchantRules).toBeDefined();
    expect(dbs.dashboardCharts).toBeDefined();
  });

  it("should create and retrieve a tag", async () => {
    const id = crypto.randomUUID();
    await dbs.tags.put({ _id: id, name: "Groceries" });
    const tag = await dbs.tags.get(id);
    expect(tag.name).toBe("Groceries");
    expect(tag._id).toBe(id);
  });

  it("should create and retrieve a transaction", async () => {
    const tagId = crypto.randomUUID();
    await dbs.tags.put({ _id: tagId, name: "Coffee" });

    const merchantId = crypto.randomUUID();
    await dbs.merchants.put({ _id: merchantId, name: "Starbucks" });

    const accountId = crypto.randomUUID();
    await dbs.accounts.put({ _id: accountId, name: "Checking Account", type: "Checking" });

    const txId = crypto.randomUUID();
    await dbs.transactions.put({
      _id: txId,
      date: "2023-10-27",
      amount: -5.5,
      originalDescription: "Starbucks Coffee",
      tagIds: [tagId],
      merchantId,
      accountId,
    });

    const tx = await dbs.transactions.get(txId);
    expect(tx).toBeDefined();
    expect(tx.amount).toBe(-5.5);
    expect(tx.tagIds).toContain(tagId);
    expect(tx.merchantId).toBe(merchantId);
    expect(tx.accountId).toBe(accountId);
  });
});
