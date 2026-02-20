import { uuid } from "../uuid";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { clearDb } from "../database/clearDb";
import { Tags } from "./Tags";

beforeEach(async () => {
  await clearDb(db.tags);
});

describe("Tags", () => {
  it("should return all tags", async () => {
    await db.tags.bulkDocs([
      { id: uuid(), name: "food", color: "lch(50 30 0)" },
      { id: uuid(), name: "transport", color: "lch(50 30 120)" },
    ]);
    const all = await Tags.all();
    expect(all).toHaveLength(2);
  });

  it("should create a tag with auto-generated color", async () => {
    const id = await Tags.create("groceries");
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
    await Tags.update(resp.id, { name: "new" });
    const tag = await db.tags.get(resp.id);
    expect(tag?.name).toBe("new");
  });

  it("should remove a tag", async () => {
    const resp = await db.tags.put({
      id: uuid(),
      name: "temp",
      color: "lch(50 30 0)",
    });
    await Tags.remove(resp.id);
    const tag = await db.tags.get(resp.id).catch(() => undefined);
    expect(tag).toBeUndefined();
  });

  it("should find a tag by name (case-insensitive)", async () => {
    await db.tags.put({ id: uuid(), name: "Food", color: "lch(50 30 0)" });
    const tag = await Tags.byName("food");
    expect(tag?.name).toBe("Food");
  });

  it("should return undefined for unknown name", async () => {
    const tag = await Tags.byName("nonexistent");
    expect(tag).toBeUndefined();
  });
});
