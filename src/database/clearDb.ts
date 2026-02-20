import type { Collection } from "./Db";

export async function clearDb<T extends { id: string }>(collection: Collection<T>) {
  await collection.clear();
}
