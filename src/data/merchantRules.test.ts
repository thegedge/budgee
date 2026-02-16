import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { MerchantRules } from "./merchantRules";

beforeEach(async () => {
  await db.merchantRules.clear();
  await db.transactions.clear();
});

describe("MerchantRules", () => {
  it("should return all rules", async () => {
    await db.merchantRules.add({
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "test" }],
      tagIds: [],
    });
    const all = await MerchantRules.all();
    expect(all).toHaveLength(1);
  });

  it("should create a rule", async () => {
    const id = await MerchantRules.create({
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "coffee" }],
      tagIds: [],
    });
    const rule = await db.merchantRules.get(id);
    expect(rule?.conditions[0].value).toBe("coffee");
  });

  it("should remove a rule", async () => {
    const id = (await db.merchantRules.add({
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "x" }],
      tagIds: [],
    })) as number;
    await MerchantRules.remove(id);
    expect(await db.merchantRules.get(id)).toBeUndefined();
  });

  it("should apply a rule to matching transactions", async () => {
    await db.transactions.bulkAdd([
      { date: "2024-01-01", amount: -5, originalDescription: "COFFEE SHOP", tagIds: [] },
      { date: "2024-01-02", amount: -10, originalDescription: "GROCERY STORE", tagIds: [] },
    ]);

    const rule = {
      id: 1,
      logic: "and" as const,
      conditions: [
        { field: "description" as const, operator: "contains" as const, value: "coffee" },
      ],
      merchantId: 99,
      tagIds: [1],
    };

    const count = await MerchantRules.applyToTransactions(rule);
    expect(count).toBe(1);

    const txs = await db.transactions.toArray();
    const coffee = txs.find((t) => t.originalDescription === "COFFEE SHOP");
    expect(coffee?.merchantId).toBe(99);
    expect(coffee?.tagIds).toContain(1);

    const grocery = txs.find((t) => t.originalDescription === "GROCERY STORE");
    expect(grocery?.merchantId).toBeUndefined();
  });
});
