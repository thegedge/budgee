import { describe, expect, it } from "vitest";
import type { Transaction } from "./types";
import { aggregateByPeriod, filterTransactions } from "./aggregations";

const transactions: Transaction[] = [
  {
    id: 1,
    date: "2024-01-05",
    amount: -50,
    originalDescription: "Groceries",
    tagIds: [1],
    merchantId: 10,
  },
  {
    id: 2,
    date: "2024-01-15",
    amount: -25,
    originalDescription: "Coffee",
    tagIds: [2],
    merchantId: 20,
  },
  {
    id: 3,
    date: "2024-02-01",
    amount: -30,
    originalDescription: "Groceries",
    tagIds: [1],
    merchantId: 10,
  },
  { id: 4, date: "2024-02-10", amount: 2500, originalDescription: "Payroll", tagIds: [3] },
  {
    id: 5,
    date: "2025-01-01",
    amount: -60,
    originalDescription: "Groceries",
    tagIds: [1],
    merchantId: 10,
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

describe("filterTransactions", () => {
  it("should filter by tagId", () => {
    const result = filterTransactions(transactions, { tagId: 1 });
    expect(result).toHaveLength(3);
    expect(result.every((t) => t.tagIds.includes(1))).toBe(true);
  });

  it("should filter by merchantId", () => {
    const result = filterTransactions(transactions, { merchantId: 10 });
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
      tagId: 1,
      merchantId: 10,
      startDate: "2024-02-01",
    });
    expect(result).toHaveLength(2);
  });

  it("should return all when no filters", () => {
    const result = filterTransactions(transactions, {});
    expect(result).toHaveLength(5);
  });
});
