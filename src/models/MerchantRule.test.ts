import { describe, expect, it } from "vitest";
import type { AccountRecord, MerchantRuleRecord } from "../database/types";
import { db } from "../database/Db";
import { tid as uuid } from "../tid";
import { MerchantRule, prepareTransaction } from "./MerchantRule";

describe("MerchantRule", () => {
  it("should return all rules", async () => {
    const dbs = await db();
    await dbs.merchantRules.put({
      id: uuid(),
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "test" }],
      tagIds: [],
    });
    const all = await MerchantRule.all();
    expect(all).toHaveLength(1);
  });

  it("should create a rule", async () => {
    const dbs = await db();
    const created = await MerchantRule.create({
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "coffee" }],
      tagIds: [],
    });
    const rule = await dbs.merchantRules.get(created.id);
    expect(rule?.conditions[0].value).toBe("coffee");
  });

  it("should remove a rule", async () => {
    const dbs = await db();
    const resp = await dbs.merchantRules.put({
      id: uuid(),
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "x" }],
      tagIds: [],
    });
    await MerchantRule.remove(resp.id);
    expect(await dbs.merchantRules.get(resp.id).catch(() => undefined)).toBeUndefined();
  });

  it("should apply a rule to matching transactions", async () => {
    const dbs = await db();
    await dbs.transactions.bulkDocs([
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

    const txs = await dbs.transactions.all();
    const coffee = txs.find((t) => t.description === "COFFEE SHOP");
    expect(coffee?.merchantId).toBe(merchantId);
    expect(coffee?.tagIds).toContain(tagId);

    const grocery = txs.find((t) => t.description === "GROCERY STORE");
    expect(grocery?.merchantId).toBeUndefined();
  });

  describe("matches", () => {
    const rule = new MerchantRule({
      id: "r1",
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "coffee" }],
      tagIds: [],
    });

    const tx = (
      description: string,
      accountId?: string,
      accounts: Record<string, AccountRecord> = {},
    ) => prepareTransaction({ description, accountId }, accounts);

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
        expect(accountRule("contains", "chequing").matches(tx("coffee", "acc1", accounts))).toBe(
          true,
        );
      });

      it("should match account name with equals", () => {
        expect(accountRule("equals", "my chequing").matches(tx("coffee", "acc1", accounts))).toBe(
          true,
        );
      });

      it("should not match when account name differs", () => {
        expect(accountRule("equals", "my chequing").matches(tx("coffee", "acc2", accounts))).toBe(
          false,
        );
      });

      it("should not match when transaction has no accountId", () => {
        expect(accountRule("contains", "chequing").matches(tx("coffee", undefined, accounts))).toBe(
          false,
        );
      });

      it("should be case-insensitive", () => {
        expect(accountRule("contains", "CHEQUING").matches(tx("coffee", "acc1", accounts))).toBe(
          true,
        );
      });

      it("should fall back to accountId when account not in lookup", () => {
        expect(accountRule("equals", "acc99").matches(tx("coffee", "acc99", {}))).toBe(true);
      });
    });

    describe("oneOf operator", () => {
      const accounts: Record<string, AccountRecord> = {
        acc1: { id: "acc1", name: "My Chequing" },
        acc2: { id: "acc2", name: "Savings Account" },
        acc3: { id: "acc3", name: "Credit Card" },
      };

      const oneOfRule = (field: "description" | "account", value: string) =>
        new MerchantRule({
          id: "r1",
          logic: "and",
          conditions: [{ field, operator: "oneOf", value }],
          tagIds: [],
        });

      it("should match description against a list", () => {
        const rule = oneOfRule("description", "coffee shop, grocery store");
        expect(rule.matches(tx("coffee shop"))).toBe(true);
        expect(rule.matches(tx("grocery store"))).toBe(true);
        expect(rule.matches(tx("gas station"))).toBe(false);
      });

      it("should match account name against a list", () => {
        const rule = oneOfRule("account", "My Chequing, Credit Card");
        expect(rule.matches(tx("coffee", "acc1", accounts))).toBe(true);
        expect(rule.matches(tx("coffee", "acc3", accounts))).toBe(true);
        expect(rule.matches(tx("coffee", "acc2", accounts))).toBe(false);
      });

      it("should be case-insensitive", () => {
        const rule = oneOfRule("description", "COFFEE SHOP, GROCERY");
        expect(rule.matches(tx("coffee shop"))).toBe(true);
      });

      it("should trim whitespace around values", () => {
        const rule = oneOfRule("description", "  coffee shop , grocery store  ");
        expect(rule.matches(tx("coffee shop"))).toBe(true);
        expect(rule.matches(tx("grocery store"))).toBe(true);
      });

      it("should ignore empty entries", () => {
        const rule = oneOfRule("description", "coffee shop,,, grocery store");
        expect(rule.matches(tx("coffee shop"))).toBe(true);
        expect(rule.matches(tx(""))).toBe(false);
      });

      it("should not match when value is not in the list", () => {
        const rule = oneOfRule("description", "coffee shop, grocery store");
        expect(rule.matches(tx("coffee"))).toBe(false);
      });
    });
  });
});
