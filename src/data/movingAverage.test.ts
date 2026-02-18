import { describe, expect, it } from "vitest";
import { movingMedian } from "./movingAverage";

describe("movingMedian", () => {
  it("returns all values when window is 1", () => {
    expect(movingMedian([1, 2, 3], 1)).toEqual([1, 2, 3]);
  });

  it("returns nulls for the first window-1 entries", () => {
    const result = movingMedian([1, 2, 3, 4, 5], 3);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
  });

  it("computes the correct median starting at index window-1", () => {
    const result = movingMedian([1, 2, 3, 4, 5], 3);
    expect(result[2]).toBe(2); // median of [1,2,3]
    expect(result[3]).toBe(3); // median of [2,3,4]
    expect(result[4]).toBe(4); // median of [3,4,5]
  });

  it("handles window equal to data length", () => {
    const result = movingMedian([10, 20, 30], 3);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
    expect(result[2]).toBe(20);
  });

  it("handles empty array", () => {
    expect(movingMedian([], 3)).toEqual([]);
  });

  it("handles even window size", () => {
    const result = movingMedian([4, 8, 6, 2], 2);
    expect(result[0]).toBeNull();
    expect(result[1]).toBe(6); // median of [4,8] = (4+8)/2
    expect(result[2]).toBe(7); // median of [8,6] = (6+8)/2
    expect(result[3]).toBe(4); // median of [6,2] = (2+6)/2
  });

  it("handles negative values", () => {
    const result = movingMedian([-10, -20, -30], 2);
    expect(result[0]).toBeNull();
    expect(result[1]).toBe(-15); // median of [-10,-20]
    expect(result[2]).toBe(-25); // median of [-20,-30]
  });

  it("is robust to outliers", () => {
    const result = movingMedian([10, 10, 10, 1000, 10], 3);
    expect(result[2]).toBe(10); // median of [10,10,10]
    expect(result[3]).toBe(10); // median of [10,10,1000] — outlier ignored
    expect(result[4]).toBe(10); // median of [10,1000,10] — outlier ignored
  });
});
