import type { Collection } from "./db";

export async function allDocs<T extends object>(
  collection: Collection<T>,
): Promise<(T & { _id: string; _rev: string })[]> {
  const result = await collection.allDocs({ include_docs: true });
  return result.rows
    .map((row) => row.doc)
    .filter(
      (doc): doc is T & { _id: string; _rev: string } =>
        doc !== undefined && !doc._id.startsWith("_design/"),
    );
}

export async function clearDb<T extends object>(collection: Collection<T>) {
  const docs = await allDocs(collection);
  await collection.bulkDocs(docs.map((doc) => ({ ...doc, _deleted: true }) as unknown as T));
}
