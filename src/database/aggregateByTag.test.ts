import { describe, expect, it } from "vitest";
import type { Transaction } from "./types";
import { aggregateByTag } from "./aggregateByTag";

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
