import { describe, expect, it } from "vitest";
import { colorToHex } from "./colorToHex";

describe("colorToHex", () => {
  it("passes through hex colors unchanged", () => {
    expect(colorToHex("#ff0000")).toBe("#ff0000");
  });

  it("passes through 3-digit hex unchanged", () => {
    expect(colorToHex("#f00")).toBe("#f00");
  });

  it("converts hsl to hex", () => {
    expect(colorToHex("hsl(0, 100%, 50%)")).toBe("#ff0000");
  });

  it("converts lch to hex", () => {
    const hex = colorToHex("lch(0 0 0)");
    expect(hex).toBe("#000000");
  });

  it("returns #000000 for unknown formats", () => {
    expect(colorToHex("unknown")).toBe("#000000");
  });
});
