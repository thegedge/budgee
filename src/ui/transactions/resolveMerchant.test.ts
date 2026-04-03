import { describe, it } from "vitest";
import { expect } from "vitest";
import { resolveMerchant } from "./resolveMerchant";

const OWNER = "did:example:alice";

function makeMap(entries: [string, string][]): Map<string, string> {
  return new Map(entries);
}

describe("resolveMerchant", () => {
  it("returns undefined when merchantId is undefined", () => {
    const map = makeMap([["m1", "Acme"]]);
    expect(resolveMerchant(map, undefined)).toBeUndefined();
    expect(resolveMerchant(map, undefined, OWNER)).toBeUndefined();
  });

  it("finds own merchant by bare merchantId (no owner)", () => {
    const map = makeMap([["m1", "Acme"]]);
    expect(resolveMerchant(map, "m1")).toEqual({ id: "m1", name: "Acme" });
  });

  it("finds shared merchant by prefixed ID when owner is provided", () => {
    const prefixedId = `${OWNER}~m1`;
    const map = makeMap([[prefixedId, "Shared Co"]]);
    expect(resolveMerchant(map, "m1", OWNER)).toEqual({ id: prefixedId, name: "Shared Co" });
  });

  it("returns undefined when shared merchant is not in map", () => {
    const map = makeMap([]);
    expect(resolveMerchant(map, "m1", OWNER)).toBeUndefined();
  });

  it("falls back to bare merchantId when owner prefix yields no match", () => {
    // Shared transaction whose merchant is actually owned by Bob (the viewer),
    // not prefixed under the sharer's DID.
    const map = makeMap([["m1", "Bob's Bakery"]]);
    expect(resolveMerchant(map, "m1", OWNER)).toEqual({ id: "m1", name: "Bob's Bakery" });
  });
});
