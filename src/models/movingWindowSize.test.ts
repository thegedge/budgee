import { describe, expect, it } from "vitest";
import { movingWindowSize } from "./movingWindowSize";

describe("movingAverageWindow", () => {
  it("returns minimum of 6 for small data", () => {
    expect(movingWindowSize(1)).toBe(6);
    expect(movingWindowSize(5)).toBe(6);
  });

  it("returns ~10% of count for medium data", () => {
    expect(movingWindowSize(50)).toBe(6);
    expect(movingWindowSize(100)).toBe(10);
  });

  it("caps at 12 for large data", () => {
    expect(movingWindowSize(200)).toBe(12);
    expect(movingWindowSize(1000)).toBe(12);
  });
});
