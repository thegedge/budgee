import { describe, expect, it } from "vitest";
import { db } from "./Db";
import type { DatabaseExport } from "./importDb";
import { LATEST_VERSION, migrateDatabase, migrateExport } from "./migrations";

describe("migrateExport", () => {
  it("should return data unchanged when already at latest version", () => {
    const data: DatabaseExport = {
      version: LATEST_VERSION,
      tags: [{ id: "t1", name: "Food" }],
    };
    const result = migrateExport(data);
    expect(result).toBe(data);
  });

  it("should treat missing version as latest (no migration needed)", () => {
    const data: DatabaseExport = {
      tags: [{ id: "t1", name: "Food" }],
    };
    const result = migrateExport(data);
    expect(result).toBe(data);
  });

  it("should migrate legacy chart filter fields to filters array", () => {
    const data: DatabaseExport = {
      version: 0,
      dashboardCharts: [
        {
          id: "c1",
          title: "Test",
          chartType: "bar",
          granularity: "month",
          position: 0,
          tagId: "tag1",
          merchantId: "m1",
          direction: "debit",
          descriptionFilter: "CC PAYMENT",
          descriptionFilterMode: "exclude",
          excludedTagIds: ["tag2", "tag3"],
          excludedMerchantIds: ["m2"],
        } as DatabaseExport["dashboardCharts"] extends (infer T)[] | undefined ? T : never,
      ],
    };

    const result = migrateExport(data);
    expect(result.version).toBe(LATEST_VERSION);
    expect(result.dashboardCharts).toHaveLength(1);

    const chart = result.dashboardCharts![0];
    expect(chart.filters).toEqual([
      { field: "tag", operator: "is", value: "tag1" },
      { field: "merchant", operator: "is", value: "m1" },
      { field: "amount", operator: "lt", value: "0" },
      { field: "description", operator: "excludes", value: "CC PAYMENT" },
      { field: "tag", operator: "isNot", value: "tag2" },
      { field: "tag", operator: "isNot", value: "tag3" },
      { field: "merchant", operator: "isNot", value: "m2" },
    ]);

    // Legacy fields should be removed
    const raw = chart as unknown as Record<string, unknown>;
    expect(raw.tagId).toBeUndefined();
    expect(raw.merchantId).toBeUndefined();
    expect(raw.direction).toBeUndefined();
    expect(raw.descriptionFilter).toBeUndefined();
    expect(raw.descriptionFilterMode).toBeUndefined();
    expect(raw.excludedTagIds).toBeUndefined();
    expect(raw.excludedMerchantIds).toBeUndefined();
  });

  it("should not create filters for empty legacy fields", () => {
    const data: DatabaseExport = {
      version: 0,
      dashboardCharts: [
        {
          id: "c1",
          title: "Plain",
          chartType: "bar",
          granularity: "month",
          position: 0,
        },
      ],
    };

    const result = migrateExport(data);
    expect(result.dashboardCharts![0].filters).toBeUndefined();
  });

  it("should preserve existing filters during migration", () => {
    const data: DatabaseExport = {
      version: 0,
      dashboardCharts: [
        {
          id: "c1",
          title: "Mixed",
          chartType: "bar",
          granularity: "month",
          position: 0,
          direction: "credit",
          filters: [{ field: "tag", operator: "is", value: "existing" }],
        } as DatabaseExport["dashboardCharts"] extends (infer T)[] | undefined ? T : never,
      ],
    };

    const result = migrateExport(data);
    expect(result.dashboardCharts![0].filters).toEqual([
      { field: "tag", operator: "is", value: "existing" },
      { field: "amount", operator: "gt", value: "0" },
    ]);
  });
});

describe("migrateDatabase", () => {
  it("should set schema version on first run with empty database", async () => {
    const dbs = await db();
    await migrateDatabase(dbs);

    const doc = await dbs.meta.get("schema_version");
    expect(doc.value).toBe(LATEST_VERSION);
  });

  it("should skip migration when already at latest version", async () => {
    const dbs = await db();
    await dbs.meta.put({ id: "schema_version", value: LATEST_VERSION });
    await dbs.tags.put({ id: "t1", name: "Food" });

    await migrateDatabase(dbs);

    const tags = await dbs.tags.all();
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("Food");
  });

  it("should preserve data through migration when already at latest version", async () => {
    const dbs = await db();
    await dbs.tags.put({ id: "t1", name: "Food" });
    await dbs.merchants.put({ id: "m1", name: "Costco" });

    await migrateDatabase(dbs);

    const tags = await dbs.tags.all();
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("Food");

    const merchants = await dbs.merchants.all();
    expect(merchants).toHaveLength(1);
    expect(merchants[0].name).toBe("Costco");
  });
});
