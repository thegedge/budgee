import { describe, expect, it } from "vitest";
import type { MerchantRule, Transaction } from "../database/types";
import { applyRules } from "./applyRules";

describe("applyRules", () => {
  const baseTransaction: Omit<Transaction, "id"> = {
    date: "2024-01-01",
    amount: -5.75,
    originalDescription: "Starbucks Coffee #123",
    tagIds: [],
  };

  it("should add tags from a matching rule", () => {
    const rules: MerchantRule[] = [{ pattern: "starbucks", tagIds: [1, 2] }];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual([1, 2]);
  });

  it("should be case-insensitive", () => {
    const rules: MerchantRule[] = [{ pattern: "STARBUCKS", tagIds: [1] }];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual([1]);
  });

  it("should not modify transaction when no rules match", () => {
    const rules: MerchantRule[] = [{ pattern: "walmart", tagIds: [1] }];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual([]);
  });

  it("should merge tags without duplicates", () => {
    const transaction = { ...baseTransaction, tagIds: [1, 3] };
    const rules: MerchantRule[] = [{ pattern: "starbucks", tagIds: [1, 2] }];
    const result = applyRules(transaction, rules);
    expect(result.tagIds).toEqual([1, 3, 2]);
  });

  it("should apply only the first matching rule", () => {
    const rules: MerchantRule[] = [
      { pattern: "starbucks", tagIds: [1] },
      { pattern: "coffee", tagIds: [2] },
    ];
    const result = applyRules(baseTransaction, rules);
    expect(result.tagIds).toEqual([1]);
  });
});
