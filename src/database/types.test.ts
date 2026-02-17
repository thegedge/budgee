import { describe, expect, it } from "vitest";
import { ACCOUNT_TYPES, accountTypeLabel } from "./types";

describe("accountTypeLabel", () => {
  it("should return a label for every account type", () => {
    for (const type of ACCOUNT_TYPES) {
      expect(accountTypeLabel(type)).toBeTruthy();
    }
  });

  it("should return expected labels", () => {
    expect(accountTypeLabel("chequing")).toBe("Chequing");
    expect(accountTypeLabel("savings")).toBe("Savings");
    expect(accountTypeLabel("credit_card")).toBe("Credit Card");
    expect(accountTypeLabel("investment")).toBe("Investment");
  });
});
