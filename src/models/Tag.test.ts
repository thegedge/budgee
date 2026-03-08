import { describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { uuid } from "../uuid";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("should return all tags", async () => {
    const dbs = await db();
    await dbs.tags.bulkDocs([
      { id: uuid(), name: "food", color: "lch(50 30 0)" },
      { id: uuid(), name: "transport", color: "lch(50 30 120)" },
    ]);
    const all = await Tag.all();
    expect(all).toHaveLength(2);
  });

  it("should create a tag with auto-generated color", async () => {
    const dbs = await db();
    const { id } = await Tag.create("groceries");
    const tag = await dbs.tags.get(id);
    expect(tag?.name).toBe("groceries");
    expect(tag?.color).toMatch(/^lch\(\d+ \d+ \d+\)$/);
  });

  it("should update a tag", async () => {
    const dbs = await db();
    const resp = await dbs.tags.put({
      id: uuid(),
      name: "old",
      color: "lch(50 30 0)",
    });
    await Tag.update(resp.id, { name: "new" });
    const tag = await dbs.tags.get(resp.id);
    expect(tag?.name).toBe("new");
  });

  it("should remove a tag", async () => {
    const dbs = await db();
    const resp = await dbs.tags.put({
      id: uuid(),
      name: "temp",
      color: "lch(50 30 0)",
    });
    await Tag.remove(resp.id);
    const tag = await dbs.tags.get(resp.id).catch(() => undefined);
    expect(tag).toBeUndefined();
  });

  it("should find a tag by name (case-insensitive)", async () => {
    const dbs = await db();
    await dbs.tags.put({ id: uuid(), name: "Food", color: "lch(50 30 0)" });
    const tag = await Tag.byName("food");
    expect(tag?.name).toBe("Food");
  });

  it("should return undefined for unknown name", async () => {
    const tag = await Tag.byName("nonexistent");
    expect(tag).toBeUndefined();
  });

  it("should cascade-remove tagId from transaction tagIds when removing", async () => {
    const dbs = await db();
    const tagId = uuid();
    await dbs.tags.put({ id: tagId, name: "CascadeTag", color: "lch(50 30 0)" });
    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2024-01-01",
      amount: -10,
      description: "Test",
      tagIds: [tagId, "other-tag"],
    });
    await Tag.remove(tagId);
    const tx = await dbs.transactions.get(txId);
    expect(tx.tagIds).toEqual(["other-tag"]);
  });
});
