import { describe, expect, it } from "vitest";
import type { Transaction } from "./types";
import { aggregateByPeriod } from "./aggregateByPeriod";

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
