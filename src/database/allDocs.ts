import type { Collection } from "./Db";

export async function allDocs<T extends { id: string }>(collection: Collection<T>): Promise<T[]> {
  return collection.all();
}
