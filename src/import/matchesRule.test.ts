import { describe, expect, it } from "vitest";
import type { MerchantRule } from "../database/types";
import { matchesRule } from "./matchesRule";

describe("matchesRule", () => {
  const rule: MerchantRule = {
    id: "r1",
    logic: "and",
    conditions: [{ field: "description", operator: "contains", value: "coffee" }],
    tagIds: [],
  };

  it("should match when no accountId on rule", () => {
    expect(matchesRule("coffee shop", rule)).toBe(true);
    expect(matchesRule("coffee shop", rule, "acc1")).toBe(true);
  });

  it("should match when accountId matches", () => {
    const scoped = { ...rule, accountId: "acc1" };
    expect(matchesRule("coffee shop", scoped, "acc1")).toBe(true);
  });

  it("should not match when accountId differs", () => {
    const scoped = { ...rule, accountId: "acc1" };
    expect(matchesRule("coffee shop", scoped, "acc2")).toBe(false);
  });

  it("should not match when rule has accountId but transaction has none", () => {
    const scoped = { ...rule, accountId: "acc1" };
    expect(matchesRule("coffee shop", scoped)).toBe(false);
  });
});
