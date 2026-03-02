import { describe, expect, it } from "vitest";
import type { Transaction } from "./types";
import { aggregate } from "./aggregate";

const transactions: Transaction[] = [
  {
    id: "t1",
    date: "2024-01-05",
    amount: -50,
    originalDescription: "Groceries",
    tagIds: ["tag1"],
    merchantId: "m10",
  },
  {
    id: "t2",
    date: "2024-01-15",
    amount: -25,
    originalDescription: "Coffee",
    tagIds: ["tag2"],
    merchantId: "m20",
  },
  {
    id: "t3",
    date: "2024-02-01",
    amount: -30,
    originalDescription: "Groceries",
    tagIds: ["tag1"],
    merchantId: "m10",
  },
  {
    id: "t4",
    date: "2024-02-10",
    amount: 2500,
    originalDescription: "Payroll",
    tagIds: ["tag3"],
  },
  {
    id: "t5",
    date: "2025-01-01",
    amount: -60,
    originalDescription: "Groceries",
    tagIds: ["tag1"],
    merchantId: "m10",
  },
];

const tags = [
  { id: "tag1", name: "Food" },
  { id: "tag2", name: "Coffee" },
  { id: "tag3", name: "Income" },
];

const merchants = [
  { id: "m10", name: "Grocery Store" },
  { id: "m20", name: "Coffee Shop" },
];

describe("aggregate", () => {
  describe("by tag", () => {
    const byTag = (txs: Transaction[], t = tags) => aggregate(txs, t, (tx) => tx.tagIds);

    it("should aggregate amounts by tag", () => {
      const result = byTag(transactions);
      expect(result.size).toBe(3);
      expect(result.get("Food")).toBe(-140);
      expect(result.get("Coffee")).toBe(-25);
      expect(result.get("Income")).toBe(2500);
    });

    it("should only include provided entities", () => {
      const result = byTag(
        transactions,
        tags.filter((t) => t.id !== "tag3"),
      );
      expect(result.size).toBe(2);
      expect(result.has("Income")).toBe(false);
      expect(result.get("Food")).toBe(-140);
    });
  });

  describe("by merchant", () => {
    const byMerchant = (txs: Transaction[], m = merchants) =>
      aggregate(txs, m, (tx) => (tx.merchantId ? [tx.merchantId] : []));

    it("should aggregate amounts by merchant", () => {
      const result = byMerchant(transactions);
      expect(result.size).toBe(2);
      expect(result.get("Grocery Store")).toBe(-140);
      expect(result.get("Coffee Shop")).toBe(-25);
    });

    it("should only include provided entities", () => {
      const result = byMerchant(
        transactions,
        merchants.filter((m) => m.id !== "m20"),
      );
      expect(result.size).toBe(1);
      expect(result.has("Coffee Shop")).toBe(false);
      expect(result.get("Grocery Store")).toBe(-140);
    });
  });
});
