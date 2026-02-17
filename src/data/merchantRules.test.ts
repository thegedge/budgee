import { uuid } from "../uuid";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { allDocs, clearDb } from "../database/pouchHelpers";
import { MerchantRules } from "./merchantRules";

beforeEach(async () => {
  await clearDb(db.merchantRules);
  await clearDb(db.transactions);
});

describe("MerchantRules", () => {
  it("should return all rules", async () => {
    await db.merchantRules.put({
      _id: uuid(),
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
    const resp = await db.merchantRules.put({
      _id: uuid(),
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "x" }],
      tagIds: [],
    });
    await MerchantRules.remove(resp.id);
    expect(await db.merchantRules.get(resp.id).catch(() => undefined)).toBeUndefined();
  });

  it("should apply a rule to matching transactions", async () => {
    await db.transactions.bulkDocs([
      {
        _id: uuid(),
        date: "2024-01-01",
        amount: -5,
        originalDescription: "COFFEE SHOP",
        tagIds: [],
      },
      {
        _id: uuid(),
        date: "2024-01-02",
        amount: -10,
        originalDescription: "GROCERY STORE",
        tagIds: [],
      },
    ]);

    const ruleId = uuid();
    const merchantId = "m99";
    const tagId = "t1";
    const rule = {
      _id: ruleId,
      _rev: "",
      logic: "and" as const,
      conditions: [
        { field: "description" as const, operator: "contains" as const, value: "coffee" },
      ],
      merchantId,
      tagIds: [tagId],
    };

    const count = await MerchantRules.applyToTransactions(rule);
    expect(count).toBe(1);

    const txs = await allDocs(db.transactions);
    const coffee = txs.find((t) => t.originalDescription === "COFFEE SHOP");
    expect(coffee?.merchantId).toBe(merchantId);
    expect(coffee?.tagIds).toContain(tagId);

    const grocery = txs.find((t) => t.originalDescription === "GROCERY STORE");
    expect(grocery?.merchantId).toBeUndefined();
  });
});
