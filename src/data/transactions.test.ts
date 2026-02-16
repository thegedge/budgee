import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { Transactions } from "./transactions";

beforeEach(async () => {
  await db.transactions.clear();
});

describe("Transactions", () => {
  it("should return all transactions", async () => {
    await db.transactions.bulkAdd([
      { date: "2024-01-01", amount: -10, originalDescription: "A", tagIds: [] },
      { date: "2024-01-02", amount: -20, originalDescription: "B", tagIds: [] },
    ]);
    const all = await Transactions.all();
    expect(all).toHaveLength(2);
  });

  it("should get a transaction by id", async () => {
    const id = await db.transactions.add({
      date: "2024-01-01",
      amount: -10,
      originalDescription: "Test",
      tagIds: [],
    });
    const tx = await Transactions.get(id as number);
    expect(tx?.originalDescription).toBe("Test");
  });

  it("should update a transaction", async () => {
    const id = await db.transactions.add({
      date: "2024-01-01",
      amount: -10,
      originalDescription: "Test",
      tagIds: [],
    });
    await Transactions.update(id as number, { amount: -20 });
    const tx = await db.transactions.get(id as number);
    expect(tx?.amount).toBe(-20);
  });

  it("should return transactions for a merchant sorted by date desc", async () => {
    const merchantId = 1;
    await db.transactions.bulkAdd([
      { date: "2024-01-01", amount: -10, originalDescription: "A", tagIds: [], merchantId },
      { date: "2024-01-03", amount: -30, originalDescription: "C", tagIds: [], merchantId },
      { date: "2024-01-02", amount: -20, originalDescription: "B", tagIds: [], merchantId },
      { date: "2024-01-01", amount: -5, originalDescription: "D", tagIds: [], merchantId: 2 },
    ]);
    const results = await Transactions.forMerchant(merchantId);
    expect(results).toHaveLength(3);
    expect(results[0].date).toBe("2024-01-03");
  });

  it("should return all transactions for a merchant unsorted", async () => {
    const merchantId = 1;
    await db.transactions.bulkAdd([
      { date: "2024-01-01", amount: -10, originalDescription: "A", tagIds: [], merchantId },
      { date: "2024-01-02", amount: -20, originalDescription: "B", tagIds: [], merchantId },
    ]);
    const results = await Transactions.forMerchantAll(merchantId);
    expect(results).toHaveLength(2);
  });

  it("should delete transactions for a specific account", async () => {
    await db.transactions.bulkAdd([
      { date: "2024-01-01", amount: -10, originalDescription: "A", tagIds: [], accountId: 1 },
      { date: "2024-01-02", amount: -20, originalDescription: "B", tagIds: [], accountId: 1 },
      { date: "2024-01-03", amount: -30, originalDescription: "C", tagIds: [], accountId: 2 },
    ]);
    const deleted = await Transactions.deleteForAccount(1);
    expect(deleted).toBe(2);
    const remaining = await db.transactions.toArray();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].accountId).toBe(2);
  });

  it("should bulk add transactions", async () => {
    await Transactions.bulkAdd([
      { date: "2024-01-01", amount: -10, originalDescription: "A", tagIds: [] },
      { date: "2024-01-02", amount: -20, originalDescription: "B", tagIds: [] },
    ]);
    const all = await db.transactions.toArray();
    expect(all).toHaveLength(2);
  });
});
