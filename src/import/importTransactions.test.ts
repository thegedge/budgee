import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import type { ColumnMapping } from "./parseCsv";
import { importTransactions } from "./importTransactions";

describe("importTransactions", () => {
  beforeEach(async () => {
    await db.transactions.clear();
    await db.merchantRules.clear();
  });

  const rows = [
    { Date: "2024-01-01", Amount: "-50.00", Description: "Groceries", Account: "Visa" },
    { Date: "2024-01-02", Amount: "2500.00", Description: "Payroll", Account: "Checking" },
  ];

  const mapping: ColumnMapping = {
    date: "Date",
    amount: "Amount",
    description: "Description",
    account: "Account",
  };

  it("should insert transactions into the database", async () => {
    const count = await importTransactions(rows, mapping);
    expect(count).toBe(2);

    const stored = await db.transactions.toArray();
    expect(stored).toHaveLength(2);
    expect(stored[0].date).toBe("2024-01-01");
    expect(stored[0].amount).toBe(50);
    expect(stored[0].originalDescription).toBe("Groceries");
    expect(stored[1].amount).toBe(-2500);
  });

  it("should skip rows with missing required fields", async () => {
    const incomplete = [
      { Date: "2024-01-01", Amount: "-50.00", Description: "Groceries" },
      { Date: "2024-01-02", Amount: "", Description: "Missing amount" },
      { Date: "", Amount: "10.00", Description: "Missing date" },
    ];

    const count = await importTransactions(incomplete, mapping);
    expect(count).toBe(1);
  });

  it("should skip rows with non-numeric amounts", async () => {
    const bad = [{ Date: "2024-01-01", Amount: "not-a-number", Description: "Bad" }];
    const count = await importTransactions(bad, mapping);
    expect(count).toBe(0);
  });

  it("should apply merchant rules during import", async () => {
    await db.merchantRules.add({
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "groceries" }],
      tagIds: [42],
    });

    const count = await importTransactions(rows, mapping);
    expect(count).toBe(2);

    const stored = await db.transactions.toArray();
    expect(stored[0].tagIds).toEqual([42]);
    expect(stored[1].tagIds).toEqual([]);
  });
});
