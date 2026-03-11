import { waitForDb } from "../database/Db";
import type { TagRecord } from "../database/types";
import { uuid } from "../uuid";
import { randomTagColor } from "../color/randomTagColor";

export class Tag {
  readonly id: string;
  readonly name: string;
  readonly icon?: string;
  readonly color?: string;

  constructor(data: TagRecord) {
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.color = data.color;
  }

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.tags.subscribe(callback);
  }

  static async all(): Promise<Tag[]> {
    const db = await waitForDb();
    return (await db.tags.all()).map((d) => new Tag(d));
  }

  static async create(name: string, options?: Partial<TagRecord>): Promise<Tag> {
    const db = await waitForDb();
    const data = { id: uuid(), name, color: randomTagColor(), ...options };
    await db.tags.put(data);
    return new Tag(data);
  }

  static async update(id: string, changes: Partial<TagRecord>): Promise<void> {
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
    const found = all.find((t) => t.name.toLowerCase() === name.toLowerCase());
    return found ? new Tag(found) : undefined;
  }
}
