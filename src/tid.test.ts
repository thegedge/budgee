import { describe, expect, it } from "vitest";
import { tid } from "./tid";

describe("tid", () => {
  it("generates 13-character strings", () => {
    const id = tid();
    expect(id).toHaveLength(13);
  });

  it("uses only valid base32-sortable characters", () => {
    const validChars = /^[234567abcdefghijklmnopqrstuvwxyz]+$/;
    for (let i = 0; i < 100; i++) {
      expect(tid()).toMatch(validChars);
    }
  });

  it("generates monotonically increasing values", () => {
    const ids: string[] = [];
    for (let i = 0; i < 100; i++) {
      ids.push(tid());
    }
    const sorted = [...ids].sort();
    expect(ids).toEqual(sorted);
  });

  it("generates unique values", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(tid());
    }
    expect(ids.size).toBe(1000);
  });
});
