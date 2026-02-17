import { uuid } from "../uuid";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { clearDb } from "../database/pouchHelpers";
import { Merchants } from "./merchants";

beforeEach(async () => {
  await clearDb(db.merchants);
});

describe("Merchants", () => {
  it("should return all merchants", async () => {
    await db.merchants.bulkDocs([
      { _id: uuid(), name: "Store A" },
      { _id: uuid(), name: "Store B" },
    ]);
    const all = await Merchants.all();
    expect(all).toHaveLength(2);
  });

  it("should get a merchant by id", async () => {
    const resp = await db.merchants.put({ _id: uuid(), name: "Test" });
    const m = await Merchants.get(resp.id);
    expect(m?.name).toBe("Test");
  });

  it("should create a merchant", async () => {
    const id = await Merchants.create("New Store");
    const m = await db.merchants.get(id);
    expect(m?.name).toBe("New Store");
  });

  it("should remove a merchant", async () => {
    const resp = await db.merchants.put({ _id: uuid(), name: "Temp" });
    await Merchants.remove(resp.id);
    expect(await db.merchants.get(resp.id).catch(() => undefined)).toBeUndefined();
  });

  it("should find a merchant by name (case-insensitive)", async () => {
    await db.merchants.put({ _id: uuid(), name: "Costco" });
    const m = await Merchants.byName("costco");
    expect(m?.name).toBe("Costco");
  });
});
