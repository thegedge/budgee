import { describe, expect, it } from "vitest";
import { movingAverageWindow } from "./movingAverageWindow";

describe("movingAverageWindow", () => {
  it("returns minimum of 2 for small data", () => {
    expect(movingAverageWindow(1)).toBe(2);
    expect(movingAverageWindow(5)).toBe(2);
  });

  it("returns ~10% of count for medium data", () => {
    expect(movingAverageWindow(50)).toBe(5);
    expect(movingAverageWindow(100)).toBe(10);
  });

  it("caps at 12 for large data", () => {
    expect(movingAverageWindow(200)).toBe(12);
    expect(movingAverageWindow(1000)).toBe(12);
  });
});
