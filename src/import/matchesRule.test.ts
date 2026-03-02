import { describe, expect, it } from "vitest";
import type { AccountRecord, MerchantRuleRecord } from "../database/types";
import { matchesRule } from "./matchesRule";

describe("matchesRule", () => {
  const rule: MerchantRuleRecord = {
    id: "r1",
    logic: "and",
    conditions: [{ field: "description", operator: "contains", value: "coffee" }],
    tagIds: [],
  };

  const tx = (description: string, accountId?: string) => ({ description, accountId });

  it("should match when no accountId on rule", () => {
    expect(matchesRule(tx("coffee shop"), rule)).toBe(true);
    expect(matchesRule(tx("coffee shop", "acc1"), rule)).toBe(true);
  });

  it("should match when accountId matches", () => {
    const scoped = { ...rule, accountId: "acc1" };
    expect(matchesRule(tx("coffee shop", "acc1"), scoped)).toBe(true);
  });

  it("should not match when accountId differs", () => {
    const scoped = { ...rule, accountId: "acc1" };
    expect(matchesRule(tx("coffee shop", "acc2"), scoped)).toBe(false);
  });

  it("should not match when rule has accountId but transaction has none", () => {
    const scoped = { ...rule, accountId: "acc1" };
    expect(matchesRule(tx("coffee shop"), scoped)).toBe(false);
  });

  describe("account field conditions", () => {
    const accounts: Record<string, AccountRecord> = {
      acc1: { id: "acc1", name: "My Chequing" },
      acc2: { id: "acc2", name: "Savings Account" },
    };

    const accountRule = (operator: "contains" | "equals", value: string): MerchantRuleRecord => ({
      id: "r1",
      logic: "and",
      conditions: [{ field: "account", operator, value }],
      tagIds: [],
    });

    it("should match account name with contains", () => {
      expect(matchesRule(tx("coffee", "acc1"), accountRule("contains", "chequing"), accounts)).toBe(true);
    });

    it("should match account name with equals", () => {
      expect(matchesRule(tx("coffee", "acc1"), accountRule("equals", "my chequing"), accounts)).toBe(true);
    });

    it("should not match when account name differs", () => {
      expect(matchesRule(tx("coffee", "acc2"), accountRule("equals", "my chequing"), accounts)).toBe(false);
    });

    it("should not match when transaction has no accountId", () => {
      expect(matchesRule(tx("coffee"), accountRule("contains", "chequing"), accounts)).toBe(false);
    });

    it("should be case-insensitive", () => {
      expect(matchesRule(tx("coffee", "acc1"), accountRule("contains", "CHEQUING"), accounts)).toBe(true);
    });

    it("should fall back to accountId when account not in lookup", () => {
      expect(matchesRule(tx("coffee", "acc99"), accountRule("equals", "acc99"), {})).toBe(true);
    });
  });
});
