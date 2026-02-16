import { describe, expect, it } from "vitest";
import { contrastTextColor, randomTagColor } from "./tagColor";

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

describe("contrastTextColor", () => {
  it("should return white for dark LCh colors", () => {
    expect(contrastTextColor("lch(20 50 0)")).toBe("white");
    expect(contrastTextColor("lch(60 60 240)")).toBe("white");
  });

  it("should return black for light LCh colors", () => {
    expect(contrastTextColor("lch(80 30 60)")).toBe("black");
    expect(contrastTextColor("lch(90 10 120)")).toBe("black");
  });

  it("should return white for dark hex colors", () => {
    expect(contrastTextColor("#000000")).toBe("white");
    expect(contrastTextColor("#000")).toBe("white");
  });

  it("should return black for light hex colors", () => {
    expect(contrastTextColor("#ffffff")).toBe("black");
    expect(contrastTextColor("#fff")).toBe("black");
  });

  it("should handle legacy HSL values", () => {
    expect(contrastTextColor("hsl(0, 70%, 20%)")).toBe("white");
    expect(contrastTextColor("hsl(60, 70%, 80%)")).toBe("black");
  });
});
