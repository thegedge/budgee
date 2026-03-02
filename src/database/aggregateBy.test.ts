import { describe, expect, it } from "vitest";
import { aggregateBy, aggregateByPeriod, mapKeys } from "./aggregateBy";
import type { Transaction } from "./types";

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

describe("aggregateBy", () => {
  describe("by tag", () => {
    const byTag = (txs: Transaction[], t = tags) =>
      mapKeys(
        aggregateBy(txs, (tx) => tx.tagIds),
        t,
      );

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
      mapKeys(
        aggregateBy(txs, (tx) => (tx.merchantId ? [tx.merchantId] : [])),
        m,
      );

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

describe("aggregateByPeriod", () => {
  it("should aggregate by day", () => {
    const result = aggregateByPeriod(transactions, "day");
    expect(result.get("2024-01-05")).toBe(-50);
    expect(result.get("2024-01-15")).toBe(-25);
    expect(result.size).toBe(5);
  });

  it("should aggregate by month", () => {
    const result = aggregateByPeriod(transactions, "month");
    expect(result.get("2024-01")).toBe(-75);
    expect(result.get("2024-02")).toBe(2470);
    expect(result.get("2025-01")).toBe(-60);
    expect(result.size).toBe(3);
  });

  it("should aggregate by year", () => {
    const result = aggregateByPeriod(transactions, "year");
    expect(result.get("2024")).toBe(2395);
    expect(result.get("2025")).toBe(-60);
    expect(result.size).toBe(2);
  });
});
