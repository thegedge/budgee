import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { Merchants } from "./merchants";

beforeEach(async () => {
  await db.merchants.clear();
});

describe("Merchants", () => {
  it("should return all merchants", async () => {
    await db.merchants.bulkAdd([{ name: "Store A" }, { name: "Store B" }]);
    const all = await Merchants.all();
    expect(all).toHaveLength(2);
  });

  it("should get a merchant by id", async () => {
    const id = (await db.merchants.add({ name: "Test" })) as number;
    const m = await Merchants.get(id);
    expect(m?.name).toBe("Test");
  });

  it("should create a merchant", async () => {
    const id = await Merchants.create("New Store");
    const m = await db.merchants.get(id);
    expect(m?.name).toBe("New Store");
  });

  it("should remove a merchant", async () => {
    const id = (await db.merchants.add({ name: "Temp" })) as number;
    await Merchants.remove(id);
    expect(await db.merchants.get(id)).toBeUndefined();
  });

  it("should find a merchant by name (case-insensitive)", async () => {
    await db.merchants.add({ name: "Costco" });
    const m = await Merchants.byName("costco");
    expect(m?.name).toBe("Costco");
  });
});
