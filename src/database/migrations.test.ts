import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "./db";
import type { DatabaseExport } from "./importDb";
import { LATEST_VERSION, migrateDatabase, migrateExport } from "./migrations";

vi.mock("./migrations/v0_dexie_to_pouchdb", async (importOriginal) => {
  const original = await importOriginal<typeof import("./migrations/v0_dexie_to_pouchdb")>();
  return {
    ...original,
    readDexieData: vi.fn().mockResolvedValue(null),
    deleteDexieDatabase: vi.fn(),
  };
});

describe("migrateExport", () => {
  it("should return data unchanged when already at latest version", () => {
    const data: DatabaseExport = {
      version: LATEST_VERSION,
      tags: [{ id: "t1", name: "Food" }],
    };
    const result = migrateExport(data);
    expect(result).toBe(data);
  });

  it("should apply v0→v1 migration for version 0 data", () => {
    const data = {
      version: 0,
      tags: [{ id: 1, name: "Food" }],
      merchants: [],
      accounts: [],
      transactions: [],
      merchantRules: [],
      dashboardCharts: [],
      dashboardTables: [],
    } as unknown as DatabaseExport;

    const result = migrateExport(data);
    expect(result.version).toBe(LATEST_VERSION);
    expect(result.tags![0].id).toBeDefined();
    expect(result.tags![0].name).toBe("Food");
  });

  it("should treat missing version as version 1 (no migration needed)", () => {
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

  it("should save a backup before migrating when version is behind", async () => {
    await db.meta.put({ id: "schema_version", value: 0 });
    await db.tags.put({ id: "t1", name: "Food" });

    await migrateDatabase(db);

    const backups = await db.backups.all();
    expect(backups.length).toBeGreaterThanOrEqual(1);

    const backup = backups[0];
    expect(backup.id).toMatch(/^backup_/);
  });

  it("should prune backups to keep only the 10 most recent", async () => {
    for (let i = 0; i < 11; i++) {
      await db.backups.put({
        id: `backup_2024-01-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`,
        data: JSON.stringify({ version: 1 }),
      });
    }

    await db.meta.put({ id: "schema_version", value: 0 });
    await migrateDatabase(db);

    const backups = await db.backups.all();
    expect(backups).toHaveLength(10);

    for (const backup of backups) {
      expect(backup.id).not.toBe("backup_2024-01-01T00:00:00.000Z");
      expect(backup.id).not.toBe("backup_2024-01-02T00:00:00.000Z");
    }
  });

  it("should preserve data through migration when already at v1", async () => {
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
