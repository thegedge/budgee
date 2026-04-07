import { afterEach, describe, expect, it, vi } from "vitest";
import {
  dbNameForLogin,
  findExistingBudgeeDb,
  legacyDbExists,
  LEGACY_DB_NAME,
  resolveDbName,
  sanitizeLoginForDbName,
} from "./Db";

describe("sanitizeLoginForDbName", () => {
  it("replaces @ with -", () => {
    expect(sanitizeLoginForDbName("user@example.com")).toBe("user-example-com");
  });

  it("replaces . with -", () => {
    expect(sanitizeLoginForDbName("first.last")).toBe("first-last");
  });

  it("replaces multiple special characters", () => {
    expect(sanitizeLoginForDbName("user.name@sub.domain.com")).toBe("user-name-sub-domain-com");
  });

  it("leaves plain usernames unchanged", () => {
    expect(sanitizeLoginForDbName("alice")).toBe("alice");
  });

  it("leaves hyphens and underscores unchanged", () => {
    expect(sanitizeLoginForDbName("alice-bob_123")).toBe("alice-bob_123");
  });
});

describe("dbNameForLogin", () => {
  it("returns legacy name when no login is provided", () => {
    expect(dbNameForLogin()).toBe(LEGACY_DB_NAME);
  });

  it("returns legacy name for null login", () => {
    expect(dbNameForLogin(null)).toBe(LEGACY_DB_NAME);
  });

  it("returns legacy name for empty string login", () => {
    expect(dbNameForLogin("")).toBe(LEGACY_DB_NAME);
  });

  it("prefixes legacy name with sanitized login", () => {
    expect(dbNameForLogin("alice")).toBe("budgee-alice");
  });

  it("sanitizes email login in the db name", () => {
    expect(dbNameForLogin("user@example.com")).toBe("budgee-user-example-com");
  });

  it("sanitizes login with dots", () => {
    expect(dbNameForLogin("first.last")).toBe("budgee-first-last");
  });
});

function mockDatabases(names: string[]) {
  vi.stubGlobal(
    "indexedDB",
    Object.assign(Object.create(globalThis.indexedDB ?? {}), {
      databases: vi.fn().mockResolvedValue(names.map((name) => ({ name }))),
    }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("legacyDbExists", () => {
  it("returns true when legacy 'budgee' DB exists", async () => {
    mockDatabases(["budgee", "some-other-db"]);
    expect(await legacyDbExists()).toBe(true);
  });

  it("returns false when legacy DB is absent", async () => {
    mockDatabases(["budgee-alice", "other"]);
    expect(await legacyDbExists()).toBe(false);
  });

  it("returns false when indexedDB.databases is unavailable", async () => {
    vi.stubGlobal("indexedDB", undefined);
    expect(await legacyDbExists()).toBe(false);
  });
});

describe("findExistingBudgeeDb", () => {
  it("returns the first budgee-* DB found", async () => {
    mockDatabases(["other-db", "budgee-alice"]);
    expect(await findExistingBudgeeDb()).toBe("budgee-alice");
  });

  it("returns null when no budgee-* DB exists", async () => {
    mockDatabases(["other-db", "another-db"]);
    expect(await findExistingBudgeeDb()).toBeNull();
  });

  it("does not match the bare 'budgee' legacy name", async () => {
    mockDatabases(["budgee"]);
    expect(await findExistingBudgeeDb()).toBeNull();
  });

  it("returns null when indexedDB.databases is unavailable", async () => {
    vi.stubGlobal("indexedDB", undefined);
    expect(await findExistingBudgeeDb()).toBeNull();
  });
});

describe("resolveDbName", () => {
  it("returns legacy name when legacy 'budgee' DB exists", async () => {
    mockDatabases(["budgee"]);
    expect(await resolveDbName()).toBe(LEGACY_DB_NAME);
  });

  it("prefers legacy 'budgee' over any budgee-* DB", async () => {
    mockDatabases(["budgee", "budgee-alice"]);
    expect(await resolveDbName()).toBe(LEGACY_DB_NAME);
  });

  it("returns existing budgee-* name when no legacy DB", async () => {
    mockDatabases(["budgee-alice"]);
    expect(await resolveDbName()).toBe("budgee-alice");
  });

  it("returns 'budgee-local' for a new install with no existing DBs", async () => {
    mockDatabases([]);
    expect(await resolveDbName()).toBe("budgee-local");
  });

  it("returns 'budgee-local' when indexedDB.databases is unavailable", async () => {
    vi.stubGlobal("indexedDB", undefined);
    expect(await resolveDbName()).toBe("budgee-local");
  });
});
