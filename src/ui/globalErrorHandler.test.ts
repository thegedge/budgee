import { describe, expect, it } from "vitest";

// Mirror the isIDBError logic (not exported from the module)
function isIDBError(error: unknown): boolean {
  if (error instanceof DOMException) {
    return error.name === "InvalidStateError" || error.name === "TransactionInactiveError";
  }
  if (error instanceof Error) {
    return error.message.includes("IDBTransaction") || error.message.includes("objectStore");
  }
  return false;
}

describe("isIDBError", () => {
  it("detects InvalidStateError DOMException", () => {
    const error = new DOMException("test", "InvalidStateError");
    expect(isIDBError(error)).toBe(true);
  });

  it("detects TransactionInactiveError DOMException", () => {
    const error = new DOMException("test", "TransactionInactiveError");
    expect(isIDBError(error)).toBe(true);
  });

  it("rejects other DOMException types", () => {
    const error = new DOMException("test", "NotFoundError");
    expect(isIDBError(error)).toBe(false);
  });

  it("detects Error with IDBTransaction message", () => {
    const error = new Error("Failed to execute on IDBTransaction");
    expect(isIDBError(error)).toBe(true);
  });

  it("detects Error with objectStore message", () => {
    const error = new Error("objectStore not found");
    expect(isIDBError(error)).toBe(true);
  });

  it("rejects unrelated Error", () => {
    expect(isIDBError(new Error("network error"))).toBe(false);
  });

  it("rejects non-error values", () => {
    expect(isIDBError("string")).toBe(false);
    expect(isIDBError(null)).toBe(false);
    expect(isIDBError(undefined)).toBe(false);
    expect(isIDBError(42)).toBe(false);
  });
});
