import { describe, expect, it } from "vitest";
import { randomTagColor } from "./randomTagColor";

describe("randomTagColor", () => {
  it("should return a valid LCh string", () => {
    const color = randomTagColor();
    expect(color).toMatch(/^lch\(\d+ \d+ \d+\)$/);
  });

  it("should have lightness between 40 and 59", () => {
    for (let i = 0; i < 50; i++) {
      const match = randomTagColor().match(/lch\((\d+) /);
      const l = Number(match![1]);
      expect(l).toBeGreaterThanOrEqual(40);
      expect(l).toBeLessThanOrEqual(59);
    }
  });

  it("should have chroma between 20 and 49", () => {
    for (let i = 0; i < 50; i++) {
      const match = randomTagColor().match(/lch\(\d+ (\d+) /);
      const c = Number(match![1]);
      expect(c).toBeGreaterThanOrEqual(20);
      expect(c).toBeLessThanOrEqual(49);
    }
  });
});
