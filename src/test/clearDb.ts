import type { Collection } from "../database/Db";

export async function clearDb<T extends { id: string }>(collection: Collection<T>) {
  await collection.clear();
}
