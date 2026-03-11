import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { clearDb } from "../test/clearDb";
import { uuid } from "../uuid";
import { MerchantRule } from "./MerchantRule";

beforeEach(async () => {
  await clearDb(db.merchantRules);
  await clearDb(db.transactions);
});

describe("MerchantRule", () => {
  it("should return all rules", async () => {
    await db.merchantRules.put({
      id: uuid(),
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "test" }],
      tagIds: [],
    });
    const all = await MerchantRule.all();
    expect(all).toHaveLength(1);
  });

  it("should create a rule", async () => {
    const created = await MerchantRule.create({
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "coffee" }],
      tagIds: [],
    });
    const rule = await db.merchantRules.get(created.id);
    expect(rule?.conditions[0].value).toBe("coffee");
  });

  it("should remove a rule", async () => {
    const resp = await db.merchantRules.put({
      id: uuid(),
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "x" }],
      tagIds: [],
    });
    await MerchantRule.remove(resp.id);
    expect(await db.merchantRules.get(resp.id).catch(() => undefined)).toBeUndefined();
  });

  it("should apply a rule to matching transactions", async () => {
    await db.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -5,
        description: "COFFEE SHOP",
        tagIds: [],
      },
      {
        id: uuid(),
        date: "2024-01-02",
        amount: -10,
        description: "GROCERY STORE",
        tagIds: [],
      },
    ]);

    const ruleId = uuid();
    const merchantId = "m99";
    const tagId = "t1";
    const rule = {
      id: ruleId,

      logic: "and" as const,
      conditions: [
        { field: "description" as const, operator: "contains" as const, value: "coffee" },
      ],
      merchantId,
      tagIds: [tagId],
    };

    const count = await MerchantRule.applyToTransactions(rule);
    expect(count).toBe(1);

    const txs = await db.transactions.all();
    const coffee = txs.find((t) => t.description === "COFFEE SHOP");
    expect(coffee?.merchantId).toBe(merchantId);
    expect(coffee?.tagIds).toContain(tagId);

    const grocery = txs.find((t) => t.description === "GROCERY STORE");
    expect(grocery?.merchantId).toBeUndefined();
  });
});
