import { Repository } from "../database/Repository";
import type { TagRecord } from "../database/types";
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
    return tags.subscribe(callback);
  }

  static async all(): Promise<Tag[]> {
    const docs = await tags.all();
    return docs.map((d) => new Tag(d));
  }

  static async create(name: string, options?: Partial<TagRecord>): Promise<Tag> {
    const doc = await tags.create({ name, color: randomTagColor(), ...options } as Omit<TagRecord, "id">);
    return new Tag(doc);
  }

  static async update(id: string, changes: Partial<TagRecord>): Promise<void> {
    await tags.update(id, changes);
  }

  static async remove(id: string): Promise<void> {
    await tags.remove(id);
  }

  static async byName(name: string): Promise<Tag | undefined> {
    const all = await tags.all();
    const found = all.find((t) => t.name.toLowerCase() === name.toLowerCase());
    return found ? new Tag(found) : undefined;
  }
}

export const tags = new Repository<TagRecord>({
  collection: (dbs) => dbs.tags,
  onRemove: async (id, dbs) => {
    const all = await dbs.transactions.all();
    const affected = all.filter((t) => t.tagIds.includes(id));
    if (affected.length > 0) {
      await dbs.transactions.bulkDocs(
        affected.map((t) => ({ ...t, tagIds: t.tagIds.filter((tid) => tid !== id) })),
      );
    }
  },
});
