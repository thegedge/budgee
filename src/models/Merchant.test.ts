import { describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { tid as uuid } from "../tid";
import { Merchant } from "./Merchant";

describe("Merchant", () => {
  it("should return all merchants", async () => {
    const dbs = await db();
    await dbs.merchants.bulkDocs([
      { id: uuid(), name: "Store A" },
      { id: uuid(), name: "Store B" },
    ]);
    const all = await Merchant.all();
    expect(all).toHaveLength(2);
  });

  it("should get a merchant by id", async () => {
    const dbs = await db();
    const resp = await dbs.merchants.put({ id: uuid(), name: "Test" });
    const m = await Merchant.get(resp.id);
    expect(m?.name).toBe("Test");
  });

  it("should create a merchant", async () => {
    const dbs = await db();
    const { id } = await Merchant.create("New Store");
    const m = await dbs.merchants.get(id);
    expect(m?.name).toBe("New Store");
  });

  it("should remove a merchant", async () => {
    const dbs = await db();
    const resp = await dbs.merchants.put({ id: uuid(), name: "Temp" });
    await Merchant.remove(resp.id);
    expect(await dbs.merchants.get(resp.id).catch(() => undefined)).toBeUndefined();
  });

  it("should find a merchant by name (case-insensitive)", async () => {
    const dbs = await db();
    await dbs.merchants.put({ id: uuid(), name: "Costco" });
    const m = await Merchant.byName("costco");
    expect(m?.name).toBe("Costco");
  });

  it("should cascade-clear merchantId on transactions when removing", async () => {
    const dbs = await db();
    const { id: merchantId } = await Merchant.create("CascadeMerchant");
    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2024-01-01",
      amount: -10,
      description: "Test",
      tagIds: [],
      merchantId,
    });
    await Merchant.remove(merchantId);
    const tx = await dbs.transactions.get(txId);
    expect(tx.merchantId).toBe("");
  });
});
