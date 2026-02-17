import { describe, expect, it } from "vitest";
import { migrateV1toV2 } from "./v1_fix_orphaned_references";
import type { DatabaseExport } from "../importDb";

describe("migrateV1toV2", () => {
  it("should strip orphaned tagIds from transactions", () => {
    const data: DatabaseExport = {
      version: 1,
      tags: [{ id: "tag-1", name: "Food", color: "#f00" }],
      merchants: [],
      accounts: [],
      transactions: [
        {
          id: "tx-1",
          date: "2026-01-01",
          amount: -50,
          originalDescription: "Grocery",
          tagIds: ["tag-1", "orphaned-tag"],
        },
      ],
      merchantRules: [],
      dashboardCharts: [],
    };

    const result = migrateV1toV2(data);
    expect(result.version).toBe(2);
    expect(result.transactions![0].tagIds).toEqual(["tag-1"]);
  });

  it("should clear orphaned merchantId from transactions", () => {
    const data: DatabaseExport = {
      version: 1,
      tags: [],
      merchants: [{ id: "m-1", name: "Store" }],
      accounts: [],
      transactions: [
        {
          id: "tx-1",
          date: "2026-01-01",
          amount: -50,
          originalDescription: "Test",
          tagIds: [],
          merchantId: "orphaned-merchant",
        },
        {
          id: "tx-2",
          date: "2026-01-02",
          amount: -30,
          originalDescription: "Test2",
          tagIds: [],
          merchantId: "m-1",
        },
      ],
      merchantRules: [],
      dashboardCharts: [],
    };

    const result = migrateV1toV2(data);
    expect(result.transactions![0].merchantId).toBeUndefined();
    expect(result.transactions![1].merchantId).toBe("m-1");
  });

  it("should fix orphaned references in dashboard charts", () => {
    const data: DatabaseExport = {
      version: 1,
      tags: [{ id: "tag-1", name: "Food", color: "#f00" }],
      merchants: [],
      accounts: [],
      transactions: [],
      merchantRules: [],
      dashboardCharts: [
        {
          id: "chart-1",
          title: "Test",
          chartType: "pie" as const,
          granularity: "byTag" as const,
          position: 0,
          tagId: "orphaned-tag",
          excludedTagIds: ["tag-1", "orphaned-tag"],
        },
      ],
    };

    const result = migrateV1toV2(data);
    expect(result.dashboardCharts![0].tagId).toBeUndefined();
    expect(result.dashboardCharts![0].excludedTagIds).toEqual(["tag-1"]);
  });

  it("should preserve valid references", () => {
    const data: DatabaseExport = {
      version: 1,
      tags: [{ id: "tag-1", name: "Food", color: "#f00" }],
      merchants: [{ id: "m-1", name: "Store" }],
      accounts: [{ id: "a-1", name: "Checking", type: "chequing" }],
      transactions: [
        {
          id: "tx-1",
          date: "2026-01-01",
          amount: -50,
          originalDescription: "Test",
          tagIds: ["tag-1"],
          merchantId: "m-1",
          accountId: "a-1",
        },
      ],
      merchantRules: [],
      dashboardCharts: [],
    };

    const result = migrateV1toV2(data);
    expect(result.transactions![0].tagIds).toEqual(["tag-1"]);
    expect(result.transactions![0].merchantId).toBe("m-1");
    expect(result.transactions![0].accountId).toBe("a-1");
  });
});
