import { db } from "../database/db";
import type { Tag } from "../database/types";
import { randomTagColor } from "./tagColor";

export class Tags {
  private constructor() {}

  static all(): Promise<Tag[]> {
    return db.tags.toArray();
  }

  static create(name: string, options?: Partial<Tag>): Promise<number> {
    return db.tags.add({ name, color: randomTagColor(), ...options }) as Promise<number>;
  }

  static update(id: number, changes: Partial<Tag>): Promise<number> {
    return db.tags.update(id, changes);
  }

  static remove(id: number): Promise<void> {
    return db.tags.delete(id);
  }

  static byName(name: string): Promise<Tag | undefined> {
    return db.tags.where("name").equalsIgnoreCase(name).first();
  }
}
