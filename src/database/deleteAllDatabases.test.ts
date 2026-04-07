import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { deleteAllDatabases } from "./Db";

const realIndexedDB = globalThis.indexedDB;

describe("deleteAllDatabases", () => {
  let mockDeleteDatabase: ReturnType<typeof vi.fn>;

  afterEach(() => {
    vi.stubGlobal("indexedDB", realIndexedDB);
  });

  beforeEach(() => {
    mockDeleteDatabase = vi.fn((_name: string) => {
      const req = { onsuccess: null as (() => void) | null, onerror: null, onblocked: null };
      // Simulate async success
      Promise.resolve().then(() => req.onsuccess?.());
      return req;
    });
  });

  it("deletes databases with rxdb-dexie- prefix", async () => {
    vi.stubGlobal("indexedDB", {
      databases: vi
        .fn()
        .mockResolvedValue([
          { name: "rxdb-dexie-budgee-bob--1--transactions" },
          { name: "rxdb-dexie-budgee-bob--0--_rxdb_internal" },
          { name: "rxdb-dexie-budgee-alice--1--tags" },
          { name: "unrelated-database" },
        ]),
      deleteDatabase: mockDeleteDatabase,
    });

    await deleteAllDatabases();

    const deleted = mockDeleteDatabase.mock.calls.map((c: string[]) => c[0]);
    expect(deleted).toContain("rxdb-dexie-budgee-bob--1--transactions");
    expect(deleted).toContain("rxdb-dexie-budgee-bob--0--_rxdb_internal");
    expect(deleted).toContain("rxdb-dexie-budgee-alice--1--tags");
    expect(deleted).not.toContain("unrelated-database");
  });
});
