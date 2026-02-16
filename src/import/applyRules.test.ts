import { describe, expect, it } from "vitest";
import type { MerchantRule, Transaction } from "../database/types";
import { applyRules } from "./applyRules";

describe("applyRules", () => {
  const baseTransaction: Omit<Transaction, "_id" | "_rev"> = {
    date: "2024-01-01",
    amount: -5.75,
    originalDescription: "Starbucks Coffee #123",
    tagIds: [],
  };

  function containsRule(value: string, tagIds: string[]): MerchantRule {
    return {
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value }],
      tagIds,
    };
  }

  it("should add tags from a matching rule", () => {
    const rules = [containsRule("starbucks", ["t1", "t2"])];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual(["t1", "t2"]);
  });

  it("should be case-insensitive", () => {
    const rules = [containsRule("STARBUCKS", ["t1"])];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual(["t1"]);
  });

  it("should not modify transaction when no rules match", () => {
    const rules = [containsRule("walmart", ["t1"])];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual([]);
  });

  it("should merge tags without duplicates", () => {
    const transaction = { ...baseTransaction, tagIds: ["t1", "t3"] };
    const rules = [containsRule("starbucks", ["t1", "t2"])];
    const result = applyRules(transaction, rules);
    expect(result.tagIds).toEqual(["t1", "t3", "t2"]);
  });

  it("should apply only the first matching rule", () => {
    const rules = [containsRule("starbucks", ["t1"]), containsRule("coffee", ["t2"])];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual(["t1"]);
  });

  it("should set merchantId from matching rule", () => {
    const rules: MerchantRule[] = [
      {
        logic: "and",
        conditions: [{ field: "description", operator: "contains", value: "starbucks" }],
        merchantId: "m42",
        tagIds: ["t1"],
      },
    ];
    const result = applyRules(baseTransaction, rules);
    expect(result.merchantId).toBe("m42");
  });

  it("should support startsWith operator", () => {
    const rules: MerchantRule[] = [
      {
        logic: "and",
        conditions: [{ field: "description", operator: "startsWith", value: "starbucks" }],
        tagIds: ["t1"],
      },
    ];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual(["t1"]);
  });

  it("should support equals operator", () => {
    const rules: MerchantRule[] = [
      {
        logic: "and",
        conditions: [{ field: "description", operator: "equals", value: "starbucks coffee #123" }],
        tagIds: ["t1"],
      },
    ];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual(["t1"]);
  });

  it("should support regex operator", () => {
    const rules: MerchantRule[] = [
      {
        logic: "and",
        conditions: [{ field: "description", operator: "regex", value: "starbucks.*#\\d+" }],
        tagIds: ["t1"],
      },
    ];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual(["t1"]);
  });

  it("should support OR logic across conditions", () => {
    const rules: MerchantRule[] = [
      {
        logic: "or",
        conditions: [
          { field: "description", operator: "contains", value: "walmart" },
          { field: "description", operator: "contains", value: "coffee" },
        ],
        tagIds: ["t1"],
      },
    ];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual(["t1"]);
  });

  it("should require all conditions for AND logic", () => {
    const rules: MerchantRule[] = [
      {
        logic: "and",
        conditions: [
          { field: "description", operator: "contains", value: "starbucks" },
          { field: "description", operator: "contains", value: "walmart" },
        ],
        tagIds: ["t1"],
      },
    ];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual([]);
  });
});
