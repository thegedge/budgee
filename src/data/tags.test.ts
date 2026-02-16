import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { Tags } from "./tags";

beforeEach(async () => {
  await db.tags.clear();
});

describe("Tags", () => {
  it("should return all tags", async () => {
    await db.tags.bulkAdd([
      { name: "food", color: "lch(50 30 0)" },
      { name: "transport", color: "lch(50 30 120)" },
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
    const id = (await db.tags.add({ name: "old", color: "lch(50 30 0)" })) as number;
    await Tags.update(id, { name: "new" });
    const tag = await db.tags.get(id);
    expect(tag?.name).toBe("new");
  });

  it("should remove a tag", async () => {
    const id = (await db.tags.add({ name: "temp", color: "lch(50 30 0)" })) as number;
    await Tags.remove(id);
    const tag = await db.tags.get(id);
    expect(tag).toBeUndefined();
  });

  it("should find a tag by name (case-insensitive)", async () => {
    await db.tags.add({ name: "Food", color: "lch(50 30 0)" });
    const tag = await Tags.byName("food");
    expect(tag?.name).toBe("Food");
  });

  it("should return undefined for unknown name", async () => {
    const tag = await Tags.byName("nonexistent");
    expect(tag).toBeUndefined();
  });
});
