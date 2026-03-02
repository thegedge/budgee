import { waitForDb } from "../database/Db";
import type { Tag } from "../database/types";
import { uuid } from "../uuid";
import { randomTagColor } from "./randomTagColor";

export class Tags {
  private constructor() {}

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.tags.subscribe(callback);
  }

  static async all(): Promise<Tag[]> {
    const db = await waitForDb();
    return db.tags.all();
  }

  static async create(name: string, options?: Partial<Tag>): Promise<string> {
    const db = await waitForDb();
    const id = uuid();
    await db.tags.put({ id, name, color: randomTagColor(), ...options });
    return id;
  }

  static async update(id: string, changes: Partial<Tag>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.tags.get(id);
    await db.tags.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const db = await waitForDb();
    await db.tags.remove(id);
  }

  static async byName(name: string): Promise<Tag | undefined> {
    const db = await waitForDb();
    const all = await db.tags.all();
    return all.find((t) => t.name.toLowerCase() === name.toLowerCase());
  }
}
