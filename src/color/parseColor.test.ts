import { describe, expect, it } from "vitest";
import { parseColor } from "./parseColor";

describe("parseColor", () => {
  describe("hex colors", () => {
    it("parses 6-digit hex", () => {
      expect(parseColor("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("parses 3-digit hex", () => {
      expect(parseColor("#f00")).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("parses black", () => {
      expect(parseColor("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    });

    it("parses white", () => {
      expect(parseColor("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    });

    it("parses mixed hex", () => {
      expect(parseColor("#1a2b3c")).toEqual({ r: 26, g: 43, b: 60 });
    });
  });

  describe("hsl colors", () => {
    it("parses red", () => {
      expect(parseColor("hsl(0, 100%, 50%)")).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("parses green", () => {
      expect(parseColor("hsl(120, 100%, 50%)")).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("parses blue", () => {
      expect(parseColor("hsl(240, 100%, 50%)")).toEqual({ r: 0, g: 0, b: 255 });
    });

    it("parses grey (0% saturation)", () => {
      const { r, g, b } = parseColor("hsl(0, 0%, 50%)");
      expect(r).toBe(g);
      expect(g).toBe(b);
      expect(r).toBeCloseTo(128, 0);
    });
  });

  describe("lch colors", () => {
    it("parses lch and returns valid RGB", () => {
      const { r, g, b } = parseColor("lch(50 30 270)");
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(255);
      expect(g).toBeGreaterThanOrEqual(0);
      expect(b).toBeGreaterThanOrEqual(0);
    });

    it("parses lch black (L=0)", () => {
      const { r, g, b } = parseColor("lch(0 0 0)");
      expect(r).toBe(0);
      expect(g).toBe(0);
      expect(b).toBe(0);
    });

    it("parses lch white (L=100, C=0)", () => {
      const { r, g, b } = parseColor("lch(100 0 0)");
      // Should be close to white
      expect(r).toBeGreaterThan(250);
      expect(g).toBeGreaterThan(250);
      expect(b).toBeGreaterThan(250);
    });
  });

  describe("unknown format", () => {
    it("returns black for unrecognized format", () => {
      expect(parseColor("rgb(255, 0, 0)")).toEqual({ r: 0, g: 0, b: 0 });
    });

    it("returns black for empty string", () => {
      expect(parseColor("")).toEqual({ r: 0, g: 0, b: 0 });
    });
  });
});
