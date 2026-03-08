import { uuid } from "../uuid";
import { describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { Transaction } from "./Transaction";

describe("Transaction", () => {
  it("should return all transactions", async () => {
    const dbs = await db();
    await dbs.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -10,
        description: "A",
        tagIds: [],
      },
      {
        id: uuid(),
        date: "2024-01-02",
        amount: -20,
        description: "B",
        tagIds: [],
      },
    ]);
    const all = await Transaction.all();
    expect(all).toHaveLength(2);
  });

  it("should get a transaction by id", async () => {
    const dbs = await db();
    const id = uuid();
    await dbs.transactions.put({
      id,
      date: "2024-01-01",
      amount: -10,
      description: "Test",
      tagIds: [],
    });
    const tx = await Transaction.get(id);
    expect(tx?.description).toBe("Test");
  });

  it("should update a transaction", async () => {
    const dbs = await db();
    const id = uuid();
    await dbs.transactions.put({
      id,
      date: "2024-01-01",
      amount: -10,
      description: "Test",
      tagIds: [],
    });
    await Transaction.update(id, { amount: -20 });
    const tx = await dbs.transactions.get(id);
    expect(tx?.amount).toBe(-20);
  });

  it("should return transactions for a merchant sorted by date desc", async () => {
    const dbs = await db();
    const merchantId = "m1";
    await dbs.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -10,
        description: "A",
        tagIds: [],
        merchantId,
      },
      {
        id: uuid(),
        date: "2024-01-03",
        amount: -30,
        description: "C",
        tagIds: [],
        merchantId,
      },
      {
        id: uuid(),
        date: "2024-01-02",
        amount: -20,
        description: "B",
        tagIds: [],
        merchantId,
      },
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -5,
        description: "D",
        tagIds: [],
        merchantId: "m2",
      },
    ]);
    const results = await Transaction.forMerchant(merchantId);
    expect(results).toHaveLength(3);
    expect(results[0].date).toBe("2024-01-03");
  });

  it("should delete transactions for a specific account", async () => {
    const dbs = await db();
    await dbs.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -10,
        description: "A",
        tagIds: [],
        accountId: "a1",
      },
      {
        id: uuid(),
        date: "2024-01-02",
        amount: -20,
        description: "B",
        tagIds: [],
        accountId: "a1",
      },
      {
        id: uuid(),
        date: "2024-01-03",
        amount: -30,
        description: "C",
        tagIds: [],
        accountId: "a2",
      },
    ]);
    const deleted = await Transaction.deleteForAccount("a1");
    expect(deleted).toBe(2);
    const remaining = await dbs.transactions.all();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].accountId).toBe("a2");
  });

  it("should bulk add transactions", async () => {
    const dbs = await db();
    await Transaction.bulkAdd([
      { date: "2024-01-01", amount: -10, description: "A", tagIds: [] },
      { date: "2024-01-02", amount: -20, description: "B", tagIds: [] },
    ]);
    const all = await dbs.transactions.all();
    expect(all).toHaveLength(2);
  });
});
