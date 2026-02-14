import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Database } from "./db";

describe("BudgeeDatabase", () => {
  let db: Database;

  beforeEach(() => {
    db = new Database();
  });

  afterEach(async () => {
    await db.delete();
  });

  it("should initialize successfully", () => {
    expect(db).toBeDefined();
    expect(db.transactions).toBeDefined();
    expect(db.tags).toBeDefined();
    expect(db.merchants).toBeDefined();
    expect(db.accounts).toBeDefined();
    expect(db.merchantRules).toBeDefined();
    expect(db.dashboardCharts).toBeDefined();
  });

  it("should create and retrieve a tag", async () => {
    const tagId = await db.tags.add({ name: "Groceries" });
    const tag = await db.tags.get(tagId);
    expect(tag).toEqual({ id: tagId, name: "Groceries" });
  });

  it("should create and retrieve a transaction", async () => {
    const tagId = await db.tags.add({ name: "Coffee" });
    const merchantId = await db.merchants.add({ name: "Starbucks" });
    const accountId = await db.accounts.add({ name: "Checking Account", type: "Checking" });

    const txId = await db.transactions.add({
      date: "2023-10-27",
      amount: -5.5,
      originalDescription: "Starbucks Coffee",
      tagIds: [tagId],
      merchantId,
      accountId,
    });

    const tx = await db.transactions.get(txId);
    expect(tx).toBeDefined();
    expect(tx?.amount).toBe(-5.5);
    expect(tx?.tagIds).toContain(tagId);
    expect(tx?.merchantId).toBe(merchantId);
    expect(tx?.accountId).toBe(accountId);
  });

  it("should prevent duplicate tag names", async () => {
    await db.tags.add({ name: "Utilities" });
    await expect(db.tags.add({ name: "Utilities" })).rejects.toThrow();
  });
});
