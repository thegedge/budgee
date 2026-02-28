import { describe, expect, it } from "vitest";
import { cardNetworkFromPrefix } from "./cardNetwork";

describe("cardNetworkFromPrefix", () => {
  it("returns null for names without leading digits", () => {
    expect(cardNetworkFromPrefix("My Account")).toBeNull();
    expect(cardNetworkFromPrefix("")).toBeNull();
  });

  it("returns null for fewer than 4 leading digits", () => {
    expect(cardNetworkFromPrefix("123 Account")).toBeNull();
  });

  it("detects Visa (starts with 4)", () => {
    expect(cardNetworkFromPrefix("4512 My Visa")).toBe("Visa");
    expect(cardNetworkFromPrefix("4000123456789010")).toBe("Visa");
  });

  it("detects Mastercard (51-55)", () => {
    expect(cardNetworkFromPrefix("5100 Card")).toBe("Mastercard");
    expect(cardNetworkFromPrefix("5500 Card")).toBe("Mastercard");
  });

  it("detects Mastercard (2221-2720)", () => {
    expect(cardNetworkFromPrefix("2221 Card")).toBe("Mastercard");
    expect(cardNetworkFromPrefix("2720 Card")).toBe("Mastercard");
  });

  it("detects Amex (34, 37)", () => {
    expect(cardNetworkFromPrefix("3400 Card")).toBe("Amex");
    expect(cardNetworkFromPrefix("3700 Card")).toBe("Amex");
  });

  it("detects Discover (6011, 644-649, 65)", () => {
    expect(cardNetworkFromPrefix("6011 Card")).toBe("Discover");
    expect(cardNetworkFromPrefix("6440 Card")).toBe("Discover");
    expect(cardNetworkFromPrefix("6500 Card")).toBe("Discover");
  });

  it("returns null for unrecognized prefixes", () => {
    expect(cardNetworkFromPrefix("9999 Unknown")).toBeNull();
    expect(cardNetworkFromPrefix("3000 Unknown")).toBeNull();
  });
});
