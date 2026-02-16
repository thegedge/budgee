import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { allDocs, clearDb } from "../database/pouchHelpers";
import { Transactions } from "./transactions";

beforeEach(async () => {
  await clearDb(db.transactions);
});

describe("Transactions", () => {
  it("should return all transactions", async () => {
    await db.transactions.bulkDocs([
      {
        _id: crypto.randomUUID(),
        date: "2024-01-01",
        amount: -10,
        originalDescription: "A",
        tagIds: [],
      },
      {
        _id: crypto.randomUUID(),
        date: "2024-01-02",
        amount: -20,
        originalDescription: "B",
        tagIds: [],
      },
    ]);
    const all = await Transactions.all();
    expect(all).toHaveLength(2);
  });

  it("should get a transaction by id", async () => {
    const resp = await db.transactions.put({
      _id: crypto.randomUUID(),
      date: "2024-01-01",
      amount: -10,
      originalDescription: "Test",
      tagIds: [],
    });
    const tx = await Transactions.get(resp.id);
    expect(tx?.originalDescription).toBe("Test");
  });

  it("should update a transaction", async () => {
    const resp = await db.transactions.put({
      _id: crypto.randomUUID(),
      date: "2024-01-01",
      amount: -10,
      originalDescription: "Test",
      tagIds: [],
    });
    await Transactions.update(resp.id, { amount: -20 });
    const tx = await db.transactions.get(resp.id);
    expect(tx?.amount).toBe(-20);
  });

  it("should return transactions for a merchant sorted by date desc", async () => {
    const merchantId = "m1";
    await db.transactions.bulkDocs([
      {
        _id: crypto.randomUUID(),
        date: "2024-01-01",
        amount: -10,
        originalDescription: "A",
        tagIds: [],
        merchantId,
      },
      {
        _id: crypto.randomUUID(),
        date: "2024-01-03",
        amount: -30,
        originalDescription: "C",
        tagIds: [],
        merchantId,
      },
      {
        _id: crypto.randomUUID(),
        date: "2024-01-02",
        amount: -20,
        originalDescription: "B",
        tagIds: [],
        merchantId,
      },
      {
        _id: crypto.randomUUID(),
        date: "2024-01-01",
        amount: -5,
        originalDescription: "D",
        tagIds: [],
        merchantId: "m2",
      },
    ]);
    const results = await Transactions.forMerchant(merchantId);
    expect(results).toHaveLength(3);
    expect(results[0].date).toBe("2024-01-03");
  });

  it("should return all transactions for a merchant unsorted", async () => {
    const merchantId = "m1";
    await db.transactions.bulkDocs([
      {
        _id: crypto.randomUUID(),
        date: "2024-01-01",
        amount: -10,
        originalDescription: "A",
        tagIds: [],
        merchantId,
      },
      {
        _id: crypto.randomUUID(),
        date: "2024-01-02",
        amount: -20,
        originalDescription: "B",
        tagIds: [],
        merchantId,
      },
    ]);
    const results = await Transactions.forMerchantAll(merchantId);
    expect(results).toHaveLength(2);
  });

  it("should delete transactions for a specific account", async () => {
    await db.transactions.bulkDocs([
      {
        _id: crypto.randomUUID(),
        date: "2024-01-01",
        amount: -10,
        originalDescription: "A",
        tagIds: [],
        accountId: "a1",
      },
      {
        _id: crypto.randomUUID(),
        date: "2024-01-02",
        amount: -20,
        originalDescription: "B",
        tagIds: [],
        accountId: "a1",
      },
      {
        _id: crypto.randomUUID(),
        date: "2024-01-03",
        amount: -30,
        originalDescription: "C",
        tagIds: [],
        accountId: "a2",
      },
    ]);
    const deleted = await Transactions.deleteForAccount("a1");
    expect(deleted).toBe(2);
    const remaining = await allDocs(db.transactions);
    expect(remaining).toHaveLength(1);
    expect(remaining[0].accountId).toBe("a2");
  });

  it("should bulk add transactions", async () => {
    await Transactions.bulkAdd([
      { date: "2024-01-01", amount: -10, originalDescription: "A", tagIds: [] },
      { date: "2024-01-02", amount: -20, originalDescription: "B", tagIds: [] },
    ]);
    const all = await allDocs(db.transactions);
    expect(all).toHaveLength(2);
  });
});
