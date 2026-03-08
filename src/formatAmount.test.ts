import { describe, expect, it } from "vitest";
import { formatAmount } from "./formatAmount";

describe("formatAmount", () => {
  it("formats a whole number with 2 decimal places", () => {
    expect(formatAmount(100)).toBe("$100.00");
  });

  it("formats a value with existing decimals", () => {
    expect(formatAmount(9.99)).toBe("$9.99");
  });

  it("adds thousand separators", () => {
    expect(formatAmount(1234567.89)).toBe("$1,234,567.89");
  });

  it("formats zero", () => {
    expect(formatAmount(0)).toBe("$0.00");
  });

  it("formats negative amounts with a minus sign, not parentheses", () => {
    const result = formatAmount(-42.5);
    expect(result).toBe("-$42.50");
    expect(result).not.toContain("(");
    expect(result).not.toContain(")");
  });

  it("formats negative amounts with thousand separators", () => {
    expect(formatAmount(-1234.56)).toBe("-$1,234.56");
  });

  it("rounds to 2 decimal places", () => {
    expect(formatAmount(1.005)).toBe("$1.01");
    expect(formatAmount(1.004)).toBe("$1.00");
  });

  it("returns a string", () => {
    expect(typeof formatAmount(0)).toBe("string");
  });
});
