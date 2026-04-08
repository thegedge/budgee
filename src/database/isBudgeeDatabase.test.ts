import { describe, expect, it } from "vitest";
import { isBudgeeDatabase } from "./Db";

/**
 * Adversarial fixtures for the IndexedDB name filter used by
 * `deleteAllDatabases`. These are kept in a separate file from the
 * `deleteAllDatabases` integration test so the RxDB-destroying side effects
 * of that test don't interfere with the filter-only assertions here.
 *
 * Previously the filter used `.includes("budgee")` which would incorrectly
 * match unrelated databases from other apps on the same origin (e.g.
 * `budgeeshop-inventory`, `my-budgee-fork-data`, or another RxDB app with
 * a substring collision).
 */
describe("isBudgeeDatabase", () => {
  it("matches only budgee-owned databases and ignores substring collisions", () => {
    const shouldMatch = [
      "budgee",
      "budgee-alice",
      "rxdb-dexie-budgee--0--_rxdb_internal",
      "rxdb-dexie-budgee--1--transactions",
      "rxdb-dexie-budgee-alice--0--_rxdb_internal",
      "rxdb-dexie-budgee-alice--1--transactions",
      "rxdb-dexie-budgee-bob--1--tags",
    ];
    const shouldNotMatch = [
      "budgeeshop-inventory",
      "my-budgee-fork-data",
      "Budgee", // IndexedDB names are case-sensitive
      "rxdb-dexie-mimir-local--1--notes",
      "rxdb-dexie-mygard-local--1--messages",
      "rxdb-dexie-budgeeshop--1--products",
      "firebase-messaging-database",
      "localforage",
      "keyval-store",
      "__proto_db__",
    ];

    const matched = [...shouldMatch, ...shouldNotMatch].filter(isBudgeeDatabase).sort();
    expect(matched).toEqual([...shouldMatch].sort());
  });
});
