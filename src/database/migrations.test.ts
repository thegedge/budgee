import { beforeEach, describe, expect, it } from "vitest";
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
});

describe("migrateDatabase", () => {
  beforeEach(async () => {
    const dbs = await db();
    await dbs.tags.clear();
    await dbs.merchants.clear();
    await dbs.transactions.clear();
    await dbs.accounts.clear();
    await dbs.merchantRules.clear();
    await dbs.dashboardCharts.clear();
    await dbs.dashboardTables.clear();
    await dbs.meta.clear();
    await dbs.backups.clear();
  });

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
