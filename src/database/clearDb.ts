import type { Collection } from "./db";

export async function clearDb<T extends { id: string }>(collection: Collection<T>) {
  await collection.clear();
}
