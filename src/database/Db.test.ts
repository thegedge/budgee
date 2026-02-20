import { uuid } from "../uuid";
import { describe, expect, it, beforeEach } from "vitest";
import { db } from "./Db";

describe("BudgeeDatabase", () => {
  beforeEach(async () => {
    await db.tags.clear();
    await db.merchants.clear();
    await db.transactions.clear();
    await db.accounts.clear();
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
    const id = uuid();
    await db.tags.put({ id, name: "Groceries" });
    const tag = await db.tags.get(id);
    expect(tag.name).toBe("Groceries");
    expect(tag.id).toBe(id);
  });

  it("should create and retrieve a transaction", async () => {
    const tagId = uuid();
    await db.tags.put({ id: tagId, name: "Coffee" });

    const merchantId = uuid();
    await db.merchants.put({ id: merchantId, name: "Starbucks" });

    const accountId = uuid();
    await db.accounts.put({ id: accountId, name: "Checking Account", type: "chequing" });

    const txId = uuid();
    await db.transactions.put({
      id: txId,
      date: "2023-10-27",
      amount: -5.5,
      originalDescription: "Starbucks Coffee",
      tagIds: [tagId],
      merchantId,
      accountId,
    });

    const tx = await db.transactions.get(txId);
    expect(tx).toBeDefined();
    expect(tx.amount).toBe(-5.5);
    expect(tx.tagIds).toContain(tagId);
    expect(tx.merchantId).toBe(merchantId);
    expect(tx.accountId).toBe(accountId);
  });

  it("should isolate collections within the single database", async () => {
    await db.tags.put({ id: "shared-id", name: "A Tag" });
    await db.merchants.put({ id: "merchant-id", name: "A Merchant" });

    const tags = await db.tags.all();
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("A Tag");

    const merchants = await db.merchants.all();
    expect(merchants).toHaveLength(1);
    expect(merchants[0].name).toBe("A Merchant");
  });
});
