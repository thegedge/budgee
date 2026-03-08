import { uuid } from "../uuid";
import { describe, expect, it } from "vitest";
import { collectionSchemas, db } from "./Db";

describe("schema snapshots", () => {
  for (const [name, schema] of Object.entries(collectionSchemas)) {
    it(`${name} schema should match snapshot`, () => {
      expect({
        version: schema.version,
        properties: schema.properties,
        required: schema.required,
        indexes: "indexes" in schema ? schema.indexes : undefined,
      }).toMatchSnapshot();
    });
  }
});

describe("BudgeeDatabase", () => {
  it("should initialize successfully", async () => {
    const dbs = await db();
    expect(dbs).toBeDefined();
    expect(dbs.transactions).toBeDefined();
    expect(dbs.tags).toBeDefined();
    expect(dbs.merchants).toBeDefined();
    expect(dbs.accounts).toBeDefined();
    expect(dbs.merchantRules).toBeDefined();
    expect(dbs.dashboardCharts).toBeDefined();
  });

  it("should create and retrieve a tag", async () => {
    const dbs = await db();
    const id = uuid();
    await dbs.tags.put({ id, name: "Groceries" });
    const tag = await dbs.tags.get(id);
    expect(tag.name).toBe("Groceries");
    expect(tag.id).toBe(id);
  });

  it("should create and retrieve a transaction", async () => {
    const dbs = await db();
    const tagId = uuid();
    await dbs.tags.put({ id: tagId, name: "Coffee" });

    const merchantId = uuid();
    await dbs.merchants.put({ id: merchantId, name: "Starbucks" });

    const accountId = uuid();
    await dbs.accounts.put({ id: accountId, name: "Checking Account", type: "chequing" });

    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2023-10-27",
      amount: -5.5,
      description: "Starbucks Coffee",
      tagIds: [tagId],
      merchantId,
      accountId,
    });

    const tx = await dbs.transactions.get(txId);
    expect(tx).toBeDefined();
    expect(tx.amount).toBe(-5.5);
    expect(tx.tagIds).toContain(tagId);
    expect(tx.merchantId).toBe(merchantId);
    expect(tx.accountId).toBe(accountId);
  });

  it("should isolate collections within the single database", async () => {
    const dbs = await db();
    await dbs.tags.put({ id: "shared-id", name: "A Tag" });
    await dbs.merchants.put({ id: "merchant-id", name: "A Merchant" });

    const tags = await dbs.tags.all();
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("A Tag");

    const merchants = await dbs.merchants.all();
    expect(merchants).toHaveLength(1);
    expect(merchants[0].name).toBe("A Merchant");
  });
});
