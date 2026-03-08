import type { Databases } from "./Db";
import { type DatabaseExport, clearAndImport, exportCurrentData, saveBackup } from "./importDb";

type Migration = (data: DatabaseExport) => DatabaseExport;

const MIGRATIONS: Migration[] = [];

export const LATEST_VERSION = MIGRATIONS.length;

export function migrateExport(data: DatabaseExport): DatabaseExport {
  let version = data.version ?? LATEST_VERSION;
  let result = data;

  while (version < LATEST_VERSION) {
    result = MIGRATIONS[version](result);
    version = result.version ?? version + 1;
  }

  return result;
}

async function currentVersion(dbs: Databases): Promise<number | null> {
  try {
    const doc = await dbs.meta.get("schema_version");
    return doc.value;
  } catch {
    return null;
  }
}

async function setVersion(dbs: Databases, version: number) {
  await dbs.meta.put({ id: "schema_version", value: version });
}

export async function migrateDatabase(dbs: Databases) {
  const version = await currentVersion(dbs);

  if (version != null && version >= LATEST_VERSION) {
    return;
  }

  const data = await exportCurrentData(dbs);
  data.version = version ?? LATEST_VERSION;
  console.log(`[migrate] Current data at version ${data.version}`);

  if ((data.version ?? LATEST_VERSION) < LATEST_VERSION) {
    await saveBackup(dbs, data);
    console.log("[migrate] Backup saved");

    const migrated = migrateExport(data);
    console.log(`[migrate] Migrated to version ${migrated.version}`);

    await clearAndImport(dbs, migrated);
  }

  await setVersion(dbs, LATEST_VERSION);
  console.log("[migrate] Migration complete");
}
