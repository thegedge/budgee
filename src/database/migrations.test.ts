import "pouchdb-adapter-memory";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createDatabases, destroyAll, type Databases } from "./db";
import type { DatabaseExport } from "./importDb";
import { LATEST_VERSION, migrateDatabase, migrateExport } from "./migrations";
import { allDocs } from "./pouchHelpers";

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
      tags: [{ _id: "t1", name: "Food" }],
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
    expect(result.version).toBe(1);
    expect(result.tags![0]._id).toBeDefined();
    expect(result.tags![0].name).toBe("Food");
  });

  it("should treat missing version as version 1 (no migration needed)", () => {
    const data: DatabaseExport = {
      tags: [{ _id: "t1", name: "Food" }],
    };
    const result = migrateExport(data);
    expect(result).toBe(data);
  });
});

describe("migrateDatabase", () => {
  let dbs: Databases;

  beforeEach(() => {
    dbs = createDatabases("memory");
  });

  afterEach(async () => {
    await destroyAll(dbs);
  });

  it("should set schema version on first run with empty database", async () => {
    await migrateDatabase(dbs);

    const doc = await dbs.meta.get("schema_version");
    expect(doc.value).toBe(LATEST_VERSION);
  });

  it("should skip migration when already at latest version", async () => {
    await dbs.meta.put({ _id: "schema_version", value: LATEST_VERSION });
    await dbs.tags.put({ _id: "t1", name: "Food" });

    await migrateDatabase(dbs);

    const tags = await allDocs(dbs.tags);
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("Food");
  });

  it("should save a backup before migrating when version is behind", async () => {
    // Set version to 0 to force migration
    await dbs.meta.put({ _id: "schema_version", value: 0 });
    await dbs.tags.put({ _id: "t1", name: "Food" });

    await migrateDatabase(dbs);

    const backups = await allDocs(dbs.backups);
    expect(backups.length).toBeGreaterThanOrEqual(1);

    const backup = backups[0] as unknown as Record<string, unknown>;
    expect(backup._id).toMatch(/^backup_/);
  });

  it("should prune backups to keep only the 10 most recent", async () => {
    // Create 11 existing backups with known timestamps
    for (let i = 0; i < 11; i++) {
      await dbs.backups.put({
        _id: `backup_2024-01-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`,
        version: 1,
      } as Record<string, unknown> & { _id: string });
    }

    // Trigger a migration that creates a new backup (12 total, should prune to 10)
    await dbs.meta.put({ _id: "schema_version", value: 0 });
    await migrateDatabase(dbs);

    const backups = await allDocs(dbs.backups);
    expect(backups).toHaveLength(10);

    // The two oldest backups should have been pruned
    for (const backup of backups) {
      expect(backup._id).not.toBe("backup_2024-01-01T00:00:00.000Z");
      expect(backup._id).not.toBe("backup_2024-01-02T00:00:00.000Z");
    }
  });

  it("should preserve data through migration when already at v1", async () => {
    await dbs.tags.put({ _id: "t1", name: "Food" });
    await dbs.merchants.put({ _id: "m1", name: "Costco" });
    // No version set → will export as v1, which is latest, so no transform needed

    await migrateDatabase(dbs);

    const tags = await allDocs(dbs.tags);
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("Food");

    const merchants = await allDocs(dbs.merchants);
    expect(merchants).toHaveLength(1);
    expect(merchants[0].name).toBe("Costco");
  });
});
