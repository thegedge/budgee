import { describe, expect, it } from "vitest";
import type { AccountRecord, MerchantRuleRecord } from "../database/types";
import { MerchantRule, prepareTransaction } from "../models/MerchantRule";

describe("matchesRule", () => {
  const rule = new MerchantRule({
    id: "r1",
    logic: "and",
    conditions: [{ field: "description", operator: "contains", value: "coffee" }],
    tagIds: [],
  });

  const tx = (description: string, accountId?: string, accounts: Record<string, AccountRecord> = {}) =>
    prepareTransaction({ description, accountId }, accounts);

  it("should match when no accountId on rule", () => {
    expect(rule.matches(tx("coffee shop"))).toBe(true);
    expect(rule.matches(tx("coffee shop", "acc1"))).toBe(true);
  });

  it("should match when accountId matches", () => {
    const scoped = new MerchantRule({ ...rule, accountId: "acc1" } as MerchantRuleRecord);
    expect(scoped.matches(tx("coffee shop", "acc1"))).toBe(true);
  });

  it("should not match when accountId differs", () => {
    const scoped = new MerchantRule({ ...rule, accountId: "acc1" } as MerchantRuleRecord);
    expect(scoped.matches(tx("coffee shop", "acc2"))).toBe(false);
  });

  it("should not match when rule has accountId but transaction has none", () => {
    const scoped = new MerchantRule({ ...rule, accountId: "acc1" } as MerchantRuleRecord);
    expect(scoped.matches(tx("coffee shop"))).toBe(false);
  });

  describe("account field conditions", () => {
    const accounts: Record<string, AccountRecord> = {
      acc1: { id: "acc1", name: "My Chequing" },
      acc2: { id: "acc2", name: "Savings Account" },
    };

    const accountRule = (operator: "contains" | "equals", value: string) =>
      new MerchantRule({
        id: "r1",
        logic: "and",
        conditions: [{ field: "account", operator, value }],
        tagIds: [],
      });

    it("should match account name with contains", () => {
      expect(accountRule("contains", "chequing").matches(tx("coffee", "acc1", accounts))).toBe(true);
    });

    it("should match account name with equals", () => {
      expect(accountRule("equals", "my chequing").matches(tx("coffee", "acc1", accounts))).toBe(true);
    });

    it("should not match when account name differs", () => {
      expect(accountRule("equals", "my chequing").matches(tx("coffee", "acc2", accounts))).toBe(false);
    });

    it("should not match when transaction has no accountId", () => {
      expect(accountRule("contains", "chequing").matches(tx("coffee", undefined, accounts))).toBe(
        false,
      );
    });

    it("should be case-insensitive", () => {
      expect(accountRule("contains", "CHEQUING").matches(tx("coffee", "acc1", accounts))).toBe(true);
    });

    it("should fall back to accountId when account not in lookup", () => {
      expect(accountRule("equals", "acc99").matches(tx("coffee", "acc99", {}))).toBe(true);
    });
  });
});
