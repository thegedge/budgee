import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { adaptTagColor } from "./adaptTagColor";

describe("adaptTagColor", () => {
  beforeEach(() => {
    // Default to light mode
    document.documentElement.dataset.theme = "light";
  });

  afterEach(() => {
    delete document.documentElement.dataset.theme;
  });

  it("returns color unchanged in light mode", () => {
    expect(adaptTagColor("#ff0000")).toBe("#ff0000");
    expect(adaptTagColor("lch(30 50 270)")).toBe("lch(30 50 270)");
  });

  describe("dark mode", () => {
    beforeEach(() => {
      document.documentElement.dataset.theme = "dark";
    });

    it("inverts lch lightness", () => {
      const result = adaptTagColor("lch(30 50 270)");
      expect(result).toBe("lch(70% 50 270)");
    });

    it("inverts lch lightness for high L", () => {
      const result = adaptTagColor("lch(80 20 120)");
      expect(result).toBe("lch(20% 20 120)");
    });

    it("transforms hex colors to rgb", () => {
      const result = adaptTagColor("#1a1a1a");
      // Dark hex → should become lighter in dark mode
      expect(result).toMatch(/^rgb\(/);
    });

    it("returns valid rgb for hex input", () => {
      const result = adaptTagColor("#336699");
      const match = result.match(/rgb\((\d+), (\d+), (\d+)\)/);
      expect(match).not.toBeNull();
      const [, r, g, b] = match!;
      expect(Number(r)).toBeGreaterThanOrEqual(0);
      expect(Number(r)).toBeLessThanOrEqual(255);
      expect(Number(g)).toBeGreaterThanOrEqual(0);
      expect(Number(b)).toBeGreaterThanOrEqual(0);
    });
  });

  it("detects dark mode via matchMedia when no theme set", () => {
    delete document.documentElement.dataset.theme;
    // matchMedia returns false by default in jsdom → light mode
    expect(adaptTagColor("#ff0000")).toBe("#ff0000");
  });
});
