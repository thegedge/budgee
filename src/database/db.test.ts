import { uuid } from "../uuid";
import "pouchdb-adapter-memory";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createDatabases, destroyAll, type Databases } from "./db";

describe("BudgeeDatabase", () => {
  let dbs: Databases;

  beforeEach(() => {
    dbs = createDatabases("memory");
  });

  afterEach(async () => {
    await destroyAll(dbs);
  });

  it("should initialize successfully", () => {
    expect(dbs).toBeDefined();
    expect(dbs.transactions).toBeDefined();
    expect(dbs.tags).toBeDefined();
    expect(dbs.merchants).toBeDefined();
    expect(dbs.accounts).toBeDefined();
    expect(dbs.merchantRules).toBeDefined();
    expect(dbs.dashboardCharts).toBeDefined();
  });

  it("should create and retrieve a tag", async () => {
    const id = uuid();
    await dbs.tags.put({ _id: id, name: "Groceries" });
    const tag = await dbs.tags.get(id);
    expect(tag.name).toBe("Groceries");
    expect(tag._id).toBe(id);
  });

  it("should create and retrieve a transaction", async () => {
    const tagId = uuid();
    await dbs.tags.put({ _id: tagId, name: "Coffee" });

    const merchantId = uuid();
    await dbs.merchants.put({ _id: merchantId, name: "Starbucks" });

    const accountId = uuid();
    await dbs.accounts.put({ _id: accountId, name: "Checking Account", type: "chequing" });

    const txId = uuid();
    await dbs.transactions.put({
      _id: txId,
      date: "2023-10-27",
      amount: -5.5,
      originalDescription: "Starbucks Coffee",
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
    await dbs.tags.put({ _id: "shared-id", name: "A Tag" });
    await dbs.merchants.put({ _id: "merchant-id", name: "A Merchant" });

    const tagResult = await dbs.tags.allDocs({ include_docs: true });
    expect(tagResult.rows).toHaveLength(1);
    expect(tagResult.rows[0].doc!.name).toBe("A Tag");

    const merchantResult = await dbs.merchants.allDocs({ include_docs: true });
    expect(merchantResult.rows).toHaveLength(1);
    expect(merchantResult.rows[0].doc!.name).toBe("A Merchant");
  });
});
