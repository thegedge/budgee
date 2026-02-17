import { describe, expect, it } from "vitest";
import { contrastTextColor } from "./contrastTextColor";

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
