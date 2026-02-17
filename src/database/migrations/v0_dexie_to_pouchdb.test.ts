import { describe, expect, it } from "vitest";
import type { DatabaseExport } from "../importDb";
import { migrateV0toV1 } from "./v0_dexie_to_pouchdb";

describe("migrateV0toV1", () => {
  it("should set version to 1", () => {
    const input: DatabaseExport = { version: 0 };
    const result = migrateV0toV1(input);
    expect(result.version).toBe(1);
  });

  it("should remap entity numeric ids to UUIDs", () => {
    const input = {
      version: 0,
      tags: [{ id: 1, name: "Food" }],
      merchants: [{ id: 10, name: "Costco" }],
      accounts: [{ id: 100, name: "Checking" }],
    } as unknown as DatabaseExport;

    const result = migrateV0toV1(input);

    expect(result.tags).toHaveLength(1);
    expect(result.tags![0]._id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
    expect(result.tags![0].name).toBe("Food");
    expect((result.tags![0] as unknown as Record<string, unknown>).id).toBeUndefined();

    expect(result.merchants![0]._id).toBeDefined();
    expect(result.merchants![0].name).toBe("Costco");
    expect(result.accounts![0]._id).toBeDefined();
    expect(result.accounts![0].name).toBe("Checking");
  });

  it("should rewrite foreign keys in transactions", () => {
    const input = {
      version: 0,
      tags: [
        { id: 1, name: "Food" },
        { id: 2, name: "Coffee" },
      ],
      merchants: [{ id: 10, name: "Costco" }],
      accounts: [{ id: 100, name: "Checking" }],
      transactions: [
        {
          id: 999,
          date: "2024-01-01",
          amount: -50,
          originalDescription: "COSTCO",
          merchantId: 10,
          accountId: 100,
          tagIds: [1, 2],
        },
      ],
      merchantRules: [],
      dashboardCharts: [],
      dashboardTables: [],
    } as unknown as DatabaseExport;

    const result = migrateV0toV1(input);

    const tx = result.transactions![0];
    expect(tx._id).toBeDefined();
    expect(tx.merchantId).toBe(result.merchants![0]._id);
    expect(tx.accountId).toBe(result.accounts![0]._id);
    expect(tx.tagIds).toEqual([result.tags![0]._id, result.tags![1]._id]);
  });

  it("should rewrite foreign keys in merchant rules", () => {
    const input = {
      version: 0,
      tags: [{ id: 1, name: "Food" }],
      merchants: [{ id: 10, name: "Costco" }],
      accounts: [],
      transactions: [],
      merchantRules: [
        {
          id: 5,
          logic: "and",
          conditions: [{ field: "description", operator: "contains", value: "COSTCO" }],
          merchantId: 10,
          tagIds: [1],
        },
      ],
      dashboardCharts: [],
      dashboardTables: [],
    } as unknown as DatabaseExport;

    const result = migrateV0toV1(input);

    const rule = result.merchantRules![0];
    expect(rule._id).toBeDefined();
    expect(rule.merchantId).toBe(result.merchants![0]._id);
    expect(rule.tagIds).toEqual([result.tags![0]._id]);
  });

  it("should rewrite foreign keys in dashboard charts", () => {
    const input = {
      version: 0,
      tags: [{ id: 1, name: "Food" }],
      merchants: [{ id: 10, name: "Costco" }],
      accounts: [],
      transactions: [],
      merchantRules: [],
      dashboardCharts: [
        {
          id: 7,
          title: "Spending",
          chartType: "bar",
          granularity: "month",
          position: 0,
          tagId: 1,
          merchantId: 10,
          excludedTagIds: [1],
          excludedMerchantIds: [10],
        },
      ],
      dashboardTables: [],
    } as unknown as DatabaseExport;

    const result = migrateV0toV1(input);

    const chart = result.dashboardCharts![0] as unknown as Record<string, unknown>;
    expect(chart._id).toBeDefined();
    expect(chart.tagId).toBe(result.tags![0]._id);
    expect(chart.merchantId).toBe(result.merchants![0]._id);
    expect(chart.excludedTagIds).toEqual([result.tags![0]._id]);
    expect(chart.excludedMerchantIds).toEqual([result.merchants![0]._id]);
  });

  it("should handle empty data", () => {
    const input: DatabaseExport = { version: 0 };
    const result = migrateV0toV1(input);
    expect(result.version).toBe(1);
    expect(result.transactions).toEqual([]);
    expect(result.tags).toEqual([]);
  });
});
