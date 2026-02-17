import { describe, expect, it } from "vitest";
import type { Transaction } from "./types";
import {
  aggregateByMerchant,
  aggregateByPeriod,
  aggregateByTag,
  filterTransactions,
} from "./aggregations";

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

const tags = [
  { id: "tag1", name: "Food" },
  { id: "tag2", name: "Coffee" },
  { id: "tag3", name: "Income" },
];

const merchants = [
  { id: "m10", name: "Grocery Store" },
  { id: "m20", name: "Coffee Shop" },
];

describe("aggregateByTag", () => {
  it("should aggregate all tags by default", () => {
    const result = aggregateByTag(transactions, tags);
    expect(result.size).toBe(3);
    expect(result.get("Food")).toBe(-140);
    expect(result.get("Coffee")).toBe(-25);
    expect(result.get("Income")).toBe(2500);
  });

  it("should exclude specified tags from grouping", () => {
    const result = aggregateByTag(transactions, tags, ["tag3"]);
    expect(result.size).toBe(2);
    expect(result.has("Income")).toBe(false);
    expect(result.get("Food")).toBe(-140);
  });

  it("should handle empty exclusion list", () => {
    const result = aggregateByTag(transactions, tags, []);
    expect(result.size).toBe(3);
  });
});

describe("aggregateByMerchant", () => {
  it("should aggregate all merchants by default", () => {
    const result = aggregateByMerchant(transactions, merchants);
    expect(result.size).toBe(2);
    expect(result.get("Grocery Store")).toBe(-140);
    expect(result.get("Coffee Shop")).toBe(-25);
  });

  it("should exclude specified merchants from grouping", () => {
    const result = aggregateByMerchant(transactions, merchants, ["m20"]);
    expect(result.size).toBe(1);
    expect(result.has("Coffee Shop")).toBe(false);
    expect(result.get("Grocery Store")).toBe(-140);
  });

  it("should handle empty exclusion list", () => {
    const result = aggregateByMerchant(transactions, merchants, []);
    expect(result.size).toBe(2);
  });
});

describe("filterTransactions", () => {
  it("should filter by tagId", () => {
    const result = filterTransactions(transactions, { tagId: "tag1" });
    expect(result).toHaveLength(3);
    expect(result.every((t) => t.tagIds.includes("tag1"))).toBe(true);
  });

  it("should filter by merchantId", () => {
    const result = filterTransactions(transactions, { merchantId: "m10" });
    expect(result).toHaveLength(3);
  });

  it("should filter by date range", () => {
    const result = filterTransactions(transactions, {
      startDate: "2024-01-10",
      endDate: "2024-02-05",
    });
    expect(result).toHaveLength(2);
  });

  it("should combine filters", () => {
    const result = filterTransactions(transactions, {
      tagId: "tag1",
      merchantId: "m10",
      startDate: "2024-02-01",
    });
    expect(result).toHaveLength(2);
  });

  it("should return all when no filters", () => {
    const result = filterTransactions(transactions, {});
    expect(result).toHaveLength(5);
  });

  it("should filter debits only", () => {
    const result = filterTransactions(transactions, { direction: "debit" });
    expect(result).toHaveLength(4);
    expect(result.every((t) => t.amount < 0)).toBe(true);
  });

  it("should filter credits only", () => {
    const result = filterTransactions(transactions, { direction: "credit" });
    expect(result).toHaveLength(1);
    expect(result[0].originalDescription).toBe("Payroll");
  });

  it("should exclude by description", () => {
    const result = filterTransactions(transactions, {
      descriptionFilter: "Groceries",
      descriptionFilterMode: "exclude",
    });
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.originalDescription.includes("Groceries"))).toBe(true);
  });

  it("should include by description", () => {
    const result = filterTransactions(transactions, {
      descriptionFilter: "Groceries",
      descriptionFilterMode: "include",
    });
    expect(result).toHaveLength(3);
    expect(result.every((t) => t.originalDescription.includes("Groceries"))).toBe(true);
  });

  it("should be case-insensitive for description filter", () => {
    const result = filterTransactions(transactions, {
      descriptionFilter: "groceries",
      descriptionFilterMode: "include",
    });
    expect(result).toHaveLength(3);
  });

  it("should combine direction and description filters", () => {
    const result = filterTransactions(transactions, {
      direction: "debit",
      descriptionFilter: "Coffee",
      descriptionFilterMode: "exclude",
    });
    expect(result).toHaveLength(3);
  });
});
