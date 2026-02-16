import { describe, expect, it } from "vitest";
import { contrastTextColor, randomTagColor } from "./tagColor";

describe("randomTagColor", () => {
  it("should return a valid HSL string", () => {
    const color = randomTagColor();
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
  });

  it("should have saturation between 60 and 79", () => {
    for (let i = 0; i < 50; i++) {
      const match = randomTagColor().match(/hsl\(\d+, (\d+)%, \d+%\)/);
      const s = Number(match![1]);
      expect(s).toBeGreaterThanOrEqual(60);
      expect(s).toBeLessThanOrEqual(79);
    }
  });

  it("should have lightness between 40 and 59", () => {
    for (let i = 0; i < 50; i++) {
      const match = randomTagColor().match(/hsl\(\d+, \d+%, (\d+)%\)/);
      const l = Number(match![1]);
      expect(l).toBeGreaterThanOrEqual(40);
      expect(l).toBeLessThanOrEqual(59);
    }
  });
});

describe("contrastTextColor", () => {
  it("should return white for dark colors", () => {
    expect(contrastTextColor("#000000")).toBe("white");
    expect(contrastTextColor("hsl(0, 70%, 20%)")).toBe("white");
  });

  it("should return black for light colors", () => {
    expect(contrastTextColor("#ffffff")).toBe("black");
    expect(contrastTextColor("hsl(60, 70%, 80%)")).toBe("black");
  });

  it("should handle hex shorthand", () => {
    expect(contrastTextColor("#fff")).toBe("black");
    expect(contrastTextColor("#000")).toBe("white");
  });
});
