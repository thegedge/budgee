import type { Collection } from "./db";

export async function allDocs<T extends { id: string }>(collection: Collection<T>): Promise<T[]> {
  return collection.all();
}

export async function clearDb<T extends { id: string }>(collection: Collection<T>) {
  await collection.clear();
}
