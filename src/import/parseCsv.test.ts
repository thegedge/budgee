import { readFile } from "fs/promises";
import path from "path";
import { describe, expect, it } from "vitest";
import { parseCsv } from "./parseCsv";

describe("parseCsv", () => {
  const loadFixture = async (filename: string) => {
    return await readFile(path.join(import.meta.dirname, "__fixtures__", filename), "utf-8");
  };

  it("should parse standard CSV and guess mapping correctly", async () => {
    const csvContent = await loadFixture("standard.csv");
    const result = await parseCsv(csvContent);

    expect(result.suggestedMapping.date).toBe("Date");
    expect(result.suggestedMapping.amount).toBe("Amount");
    expect(result.suggestedMapping.description).toBe("Description");
    expect(result.suggestedMapping.account).toBe("Account");

    expect(result.data).toEqual([
      {
        Date: "2023-10-25",
        Amount: "-150.25",
        Description: "Whole Foods",
        Account: "Visa",
      },
      {
        Date: "2023-10-26",
        Amount: "-5.75",
        Description: "Starbucks",
        Account: "Visa",
      },
      {
        Date: "2023-10-29",
        Amount: "2500.00",
        Description: "Payroll",
        Account: "Checking",
      },
    ]);
  });

  it("should parse alternative CSV and guess mapping correctly", async () => {
    const csvContent = await loadFixture("alternative.csv");
    const result = await parseCsv(csvContent);

    expect(result.suggestedMapping.date).toBe("Transaction Time");
    expect(result.suggestedMapping.amount).toBe("Cost");
    expect(result.suggestedMapping.description).toBe("Merchant Name");
    expect(result.suggestedMapping.account).toBe("Payment Method");

    expect(result.data).toEqual([
      {
        "Transaction Time": "2023-10-25",
        Cost: "-150.25",
        "Merchant Name": "Whole Foods",
        "Payment Method": "Visa",
      },
      {
        "Transaction Time": "2023-10-26",
        Cost: "-5.75",
        "Merchant Name": "Starbucks",
        "Payment Method": "Visa",
      },
      {
        "Transaction Time": "2023-10-29",
        Cost: "2500.00",
        "Merchant Name": "Payroll",
        "Payment Method": "Checking",
      },
    ]);
  });
});
