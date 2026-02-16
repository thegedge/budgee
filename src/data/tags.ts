import { db } from "../database/db";
import { allDocs } from "../database/pouchHelpers";
import type { Tag } from "../database/types";
import { randomTagColor } from "./tagColor";

export class Tags {
  private constructor() {}

  static async all(): Promise<Tag[]> {
    return allDocs(db.tags);
  }

  static async create(name: string, options?: Partial<Tag>): Promise<string> {
    const id = crypto.randomUUID();
    await db.tags.put({ _id: id, name, color: randomTagColor(), ...options });
    return id;
  }

  static async update(id: string, changes: Partial<Tag>): Promise<void> {
    const doc = await db.tags.get(id);
    await db.tags.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const doc = await db.tags.get(id);
    await db.tags.remove(doc);
  }

  static async byName(name: string): Promise<Tag | undefined> {
    const all = await allDocs(db.tags);
    return all.find((t) => t.name.toLowerCase() === name.toLowerCase());
  }
}
