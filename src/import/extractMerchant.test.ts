import { describe, expect, it } from "vitest";
import { extractMerchant } from "./extractMerchant";

describe("extractMerchant", () => {
  it("title cases the description", () => {
    expect(extractMerchant("STARBUCKS COFFEE")).toBe("Starbucks Coffee");
  });

  it("strips SQ * prefix", () => {
    expect(extractMerchant("SQ *SOME MERCHANT")).toBe("Some Merchant");
  });

  it("strips TST* prefix", () => {
    expect(extractMerchant("TST* SOME MERCHANT")).toBe("Some Merchant");
  });

  it("strips SP * prefix", () => {
    expect(extractMerchant("SP *SOME MERCHANT")).toBe("Some Merchant");
  });

  it("strips PAYPAL * prefix", () => {
    expect(extractMerchant("PAYPAL *SOME MERCHANT")).toBe("Some Merchant");
  });

  it("strips trailing location (province code)", () => {
    expect(extractMerchant("SOME MERCHANT OTTAWA, ON")).toBe("Some Merchant");
  });

  it("handles description with both prefix and location", () => {
    expect(extractMerchant("SQ *COFFEE SHOP TORONTO, ON")).toBe("Coffee Shop");
  });
});
