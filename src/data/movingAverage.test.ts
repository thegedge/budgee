import { describe, expect, it } from "vitest";
import { movingAverage } from "./movingAverage";

describe("movingAverage", () => {
  it("returns all values when window is 1", () => {
    expect(movingAverage([1, 2, 3], 1)).toEqual([1, 2, 3]);
  });

  it("returns nulls for the first window-1 entries", () => {
    const result = movingAverage([1, 2, 3, 4, 5], 3);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
  });

  it("computes the correct average starting at index window-1", () => {
    const result = movingAverage([1, 2, 3, 4, 5], 3);
    expect(result[2]).toBeCloseTo(2); // (1+2+3)/3
    expect(result[3]).toBeCloseTo(3); // (2+3+4)/3
    expect(result[4]).toBeCloseTo(4); // (3+4+5)/3
  });

  it("handles window equal to data length", () => {
    const result = movingAverage([10, 20, 30], 3);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
    expect(result[2]).toBeCloseTo(20);
  });

  it("handles empty array", () => {
    expect(movingAverage([], 3)).toEqual([]);
  });

  it("handles window of 2", () => {
    const result = movingAverage([4, 8, 6], 2);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeCloseTo(6); // (4+8)/2
    expect(result[2]).toBeCloseTo(7); // (8+6)/2
  });

  it("handles negative values", () => {
    const result = movingAverage([-10, -20, -30], 2);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeCloseTo(-15);
    expect(result[2]).toBeCloseTo(-25);
  });
});
