import { describe, expect, it } from "vitest";
import { dbNameForLogin, LEGACY_DB_NAME, sanitizeLoginForDbName } from "./Db";

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
