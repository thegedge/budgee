import { describe, expect, it } from "vitest";
import type { Transaction } from "./types";
import { aggregateByMerchant } from "./aggregateByMerchant";

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

const merchants = [
  { id: "m10", name: "Grocery Store" },
  { id: "m20", name: "Coffee Shop" },
];

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
