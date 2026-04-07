import { describe, expect, it } from "vitest";
import { validateExportShape, ensureIds, remapId, remapIds } from "./importDb";

describe("validateExportShape", () => {
  it("accepts a valid export object", () => {
    expect(() => validateExportShape({ transactions: [], tags: [] })).not.toThrow();
  });

  it("accepts an empty object", () => {
    expect(() => validateExportShape({})).not.toThrow();
  });

  it("accepts an object with version only", () => {
    expect(() => validateExportShape({ version: 1 })).not.toThrow();
  });

  it("rejects null", () => {
    expect(() => validateExportShape(null)).toThrow("expected a JSON object");
  });

  it("rejects undefined", () => {
    expect(() => validateExportShape(undefined)).toThrow("expected a JSON object");
  });

  it("rejects arrays", () => {
    expect(() => validateExportShape([])).toThrow("expected a JSON object");
  });

  it("rejects primitives", () => {
    expect(() => validateExportShape("string")).toThrow("expected a JSON object");
    expect(() => validateExportShape(42)).toThrow("expected a JSON object");
  });

  it("rejects non-array collection value", () => {
    expect(() => validateExportShape({ transactions: "not-array" })).toThrow(
      'expected "transactions" to be an array',
    );
  });

  it("rejects object collection value", () => {
    expect(() => validateExportShape({ tags: {} })).toThrow('expected "tags" to be an array');
  });

  it("ignores unknown keys", () => {
    expect(() => validateExportShape({ unknownKey: "whatever" })).not.toThrow();
  });
});

describe("ensureIds", () => {
  it("returns empty docs and map for undefined", () => {
    const result = ensureIds(undefined);
    expect(result.docs).toEqual([]);
    expect(result.idMap.size).toBe(0);
  });

  it("preserves docs that already have ids", () => {
    const docs = [
      { id: "a", name: "first" },
      { id: "b", name: "second" },
    ];
    const result = ensureIds(docs);
    expect(result.docs).toEqual(docs);
    expect(result.idMap.size).toBe(0);
  });

  it("generates ids for docs without id and records mapping", () => {
    const docs = [{ id: "", _id: "old-1", name: "first" }];
    const result = ensureIds(docs);
    expect(result.docs[0].id).toBeTruthy();
    expect(result.docs[0].id).not.toBe("");
    expect(result.idMap.get("old-1")).toBe(result.docs[0].id);
  });
});

describe("remapId", () => {
  it("returns undefined for undefined input", () => {
    expect(remapId(new Map(), undefined)).toBeUndefined();
  });

  it("returns original id when not in map", () => {
    expect(remapId(new Map(), "original")).toBe("original");
  });

  it("returns mapped id when in map", () => {
    const map = new Map([["old", "new"]]);
    expect(remapId(map, "old")).toBe("new");
  });
});

describe("remapIds", () => {
  it("returns undefined for undefined input", () => {
    expect(remapIds(new Map(), undefined)).toBeUndefined();
  });

  it("remaps ids that are in the map", () => {
    const map = new Map([["old1", "new1"]]);
    expect(remapIds(map, ["old1", "other"])).toEqual(["new1", "other"]);
  });

  it("returns original array when no ids match", () => {
    expect(remapIds(new Map(), ["a", "b"])).toEqual(["a", "b"]);
  });
});
