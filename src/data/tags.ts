import { db } from "../database/db";
import type { Tag } from "../database/types";
import { uuid } from "../uuid";
import { randomTagColor } from "./randomTagColor";

export class Tags {
  private constructor() {}

  static async all(): Promise<Tag[]> {
    return db.tags.all();
  }

  static async create(name: string, options?: Partial<Tag>): Promise<string> {
    const id = uuid();
    await db.tags.put({ id, name, color: randomTagColor(), ...options });
    return id;
  }

  static async update(id: string, changes: Partial<Tag>): Promise<void> {
    const doc = await db.tags.get(id);
    await db.tags.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    await db.tags.remove(id);
  }

  static async byName(name: string): Promise<Tag | undefined> {
    const all = await db.tags.all();
    return all.find((t) => t.name.toLowerCase() === name.toLowerCase());
  }
}
