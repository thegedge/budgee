import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { clearDb } from "../test/clearDb";
import { uuid } from "../uuid";
import { Tag } from "./Tag";

beforeEach(async () => {
  await clearDb(db.tags);
});

describe("Tag", () => {
  it("should return all tags", async () => {
    await db.tags.bulkDocs([
      { id: uuid(), name: "food", color: "lch(50 30 0)" },
      { id: uuid(), name: "transport", color: "lch(50 30 120)" },
    ]);
    const all = await Tag.all();
    expect(all).toHaveLength(2);
  });

  it("should create a tag with auto-generated color", async () => {
    const { id } = await Tag.create("groceries");
    const tag = await db.tags.get(id);
    expect(tag?.name).toBe("groceries");
    expect(tag?.color).toMatch(/^lch\(\d+ \d+ \d+\)$/);
  });

  it("should update a tag", async () => {
    const resp = await db.tags.put({
      id: uuid(),
      name: "old",
      color: "lch(50 30 0)",
    });
    await Tag.update(resp.id, { name: "new" });
    const tag = await db.tags.get(resp.id);
    expect(tag?.name).toBe("new");
  });

  it("should remove a tag", async () => {
    const resp = await db.tags.put({
      id: uuid(),
      name: "temp",
      color: "lch(50 30 0)",
    });
    await Tag.remove(resp.id);
    const tag = await db.tags.get(resp.id).catch(() => undefined);
    expect(tag).toBeUndefined();
  });

  it("should find a tag by name (case-insensitive)", async () => {
    await db.tags.put({ id: uuid(), name: "Food", color: "lch(50 30 0)" });
    const tag = await Tag.byName("food");
    expect(tag?.name).toBe("Food");
  });

  it("should return undefined for unknown name", async () => {
    const tag = await Tag.byName("nonexistent");
    expect(tag).toBeUndefined();
  });
});
