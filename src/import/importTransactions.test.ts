import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import type { ColumnMapping } from "./parseCsv";
import { importTransactions } from "./importTransactions";

describe("importTransactions", () => {
  const accountId = 1;
  const defaultOptions = { accountId, importMode: "append" as const };

  beforeEach(async () => {
    await db.transactions.clear();
    await db.merchantRules.clear();
    await db.accounts.clear();
    await db.accounts.add({ id: accountId, name: "Test Account" });
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
    const count = await importTransactions(rows, mapping, defaultOptions);
    expect(count).toBe(2);

    const stored = await db.transactions.toArray();
    expect(stored).toHaveLength(2);
    expect(stored[0].date).toBe("2024-01-01");
    expect(stored[0].amount).toBe(50);
    expect(stored[0].originalDescription).toBe("Groceries");
    expect(stored[0].accountId).toBe(accountId);
    expect(stored[1].amount).toBe(-2500);
  });

  it("should skip rows with missing required fields", async () => {
    const incomplete = [
      { Date: "2024-01-01", Amount: "-50.00", Description: "Groceries" },
      { Date: "2024-01-02", Amount: "", Description: "Missing amount" },
      { Date: "", Amount: "10.00", Description: "Missing date" },
    ];

    const count = await importTransactions(incomplete, mapping, defaultOptions);
    expect(count).toBe(1);
  });

  it("should skip rows with non-numeric amounts", async () => {
    const bad = [{ Date: "2024-01-01", Amount: "not-a-number", Description: "Bad" }];
    const count = await importTransactions(bad, mapping, defaultOptions);
    expect(count).toBe(0);
  });

  it("should handle split debit/credit columns", async () => {
    const splitRows = [
      { date: "2024-01-01", description: "Groceries", amount: "50.00", payment: "" },
      { date: "2024-01-02", description: "Payroll", amount: "", payment: "2500.00" },
    ];

    const splitMapping: ColumnMapping = {
      date: "date",
      amount: "amount",
      credit: "payment",
      description: "description",
    };

    const count = await importTransactions(splitRows, splitMapping, defaultOptions);
    expect(count).toBe(2);

    const stored = await db.transactions.toArray();
    expect(stored[0].amount).toBe(-50);
    expect(stored[1].amount).toBe(2500);
  });

  it("should negate a positive debit amount when credit column is empty", async () => {
    const csvRows = [
      {
        date: "2026-02-06",
        description: "SQ *HAPPY GOAT COFFEE COM Ottawa, ON",
        amount: "3.94",
        payment: "",
        card: "1234********5678",
      },
    ];

    const debitMapping: ColumnMapping = {
      date: "date",
      amount: "amount",
      credit: "payment",
      description: "description",
    };

    const count = await importTransactions(csvRows, debitMapping, defaultOptions);
    expect(count).toBe(1);

    const stored = await db.transactions.toArray();
    expect(stored[0].amount).toBe(-3.94);
  });

  it("should apply merchant rules during import", async () => {
    await db.merchantRules.add({
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "groceries" }],
      tagIds: [42],
    });

    const count = await importTransactions(rows, mapping, defaultOptions);
    expect(count).toBe(2);

    const stored = await db.transactions.toArray();
    expect(stored[0].tagIds).toEqual([42]);
    expect(stored[1].tagIds).toEqual([]);
  });

  it("should append transactions in append mode", async () => {
    await importTransactions(rows.slice(0, 1), mapping, defaultOptions);
    await importTransactions(rows.slice(1), mapping, defaultOptions);

    const stored = await db.transactions.toArray();
    expect(stored).toHaveLength(2);
  });

  it("should replace existing transactions in replace mode", async () => {
    await importTransactions(rows, mapping, defaultOptions);
    expect(await db.transactions.count()).toBe(2);

    const newRows = [{ Date: "2024-02-01", Amount: "-10.00", Description: "Coffee" }];
    const count = await importTransactions(newRows, mapping, { accountId, importMode: "replace" });
    expect(count).toBe(1);

    const stored = await db.transactions.toArray();
    expect(stored).toHaveLength(1);
    expect(stored[0].originalDescription).toBe("Coffee");
  });

  it("should only replace transactions for the specified account", async () => {
    const otherAccountId = 2;
    await db.accounts.add({ id: otherAccountId, name: "Other Account" });

    await importTransactions(rows, mapping, defaultOptions);
    await importTransactions(rows, mapping, { accountId: otherAccountId, importMode: "append" });
    expect(await db.transactions.count()).toBe(4);

    const newRows = [{ Date: "2024-02-01", Amount: "-10.00", Description: "Coffee" }];
    await importTransactions(newRows, mapping, { accountId, importMode: "replace" });

    const stored = await db.transactions.toArray();
    expect(stored).toHaveLength(3);
    expect(stored.filter((t) => t.accountId === otherAccountId)).toHaveLength(2);
    expect(stored.filter((t) => t.accountId === accountId)).toHaveLength(1);
  });
});
