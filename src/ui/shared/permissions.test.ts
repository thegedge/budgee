import { describe, expect, it } from "vitest";
import { isReadOnly, isShared } from "./permissions";

describe("isReadOnly", () => {
  it("returns false when no _owner", () => {
    expect(isReadOnly({})).toBe(false);
  });

  it("returns false when no _owner even with _permission", () => {
    expect(isReadOnly({ _permission: "read" })).toBe(false);
  });

  it("returns true for shared record with read permission", () => {
    expect(isReadOnly({ _owner: "did:web:alice", _permission: "read" })).toBe(true);
  });

  it("returns true for shared record with no permission", () => {
    expect(isReadOnly({ _owner: "did:web:alice" })).toBe(true);
  });

  it("returns false for shared record with write permission", () => {
    expect(isReadOnly({ _owner: "did:web:alice", _permission: "write" })).toBe(false);
  });

  it("returns false for shared record with admin permission", () => {
    expect(isReadOnly({ _owner: "did:web:alice", _permission: "admin" })).toBe(false);
  });
});

describe("isShared", () => {
  it("returns false when no _owner", () => {
    expect(isShared({})).toBe(false);
  });

  it("returns true when _owner is set", () => {
    expect(isShared({ _owner: "did:web:alice" })).toBe(true);
  });

  it("returns false when _owner is empty string", () => {
    expect(isShared({ _owner: "" })).toBe(false);
  });
});
