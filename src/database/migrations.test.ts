import { beforeEach, describe, expect, it } from "vitest";
import { db } from "./db";
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
    await db.tags.clear();
    await db.merchants.clear();
    await db.transactions.clear();
    await db.accounts.clear();
    await db.merchantRules.clear();
    await db.dashboardCharts.clear();
    await db.dashboardTables.clear();
    await db.meta.clear();
    await db.backups.clear();
  });

  it("should set schema version on first run with empty database", async () => {
    await migrateDatabase(db);

    const doc = await db.meta.get("schema_version");
    expect(doc.value).toBe(LATEST_VERSION);
  });

  it("should skip migration when already at latest version", async () => {
    await db.meta.put({ id: "schema_version", value: LATEST_VERSION });
    await db.tags.put({ id: "t1", name: "Food" });

    await migrateDatabase(db);

    const tags = await db.tags.all();
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("Food");
  });

  it("should preserve data through migration when already at latest version", async () => {
    await db.tags.put({ id: "t1", name: "Food" });
    await db.merchants.put({ id: "m1", name: "Costco" });

    await migrateDatabase(db);

    const tags = await db.tags.all();
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("Food");

    const merchants = await db.merchants.all();
    expect(merchants).toHaveLength(1);
    expect(merchants[0].name).toBe("Costco");
  });
});
