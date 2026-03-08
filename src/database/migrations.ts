import type { Databases } from "./Db";
import { type DatabaseExport, clearAndImport, exportCurrentData, saveBackup } from "./importDb";
import type { ChartFilterCondition, DashboardChartRecord } from "./types";

type Migration = (data: DatabaseExport) => DatabaseExport;

/**
 * Converts legacy individual filter fields on dashboard charts into
 * ChartFilterCondition entries in the `filters` array.
 */
function migrateLegacyChartFilters(data: DatabaseExport): DatabaseExport {
  const charts = data.dashboardCharts;
  if (!charts) return { ...data, version: 1 };

  const migrated: DashboardChartRecord[] = charts.map((chart) => {
    const legacy = chart as unknown as Record<string, unknown>;
    const filters: ChartFilterCondition[] = [...(chart.filters ?? [])];

    if (legacy.tagId)
      filters.push({ field: "tag", operator: "is", value: legacy.tagId as string });
    if (legacy.merchantId)
      filters.push({ field: "merchant", operator: "is", value: legacy.merchantId as string });
    if (legacy.direction === "debit")
      filters.push({ field: "amount", operator: "lt", value: "0" });
    else if (legacy.direction === "credit")
      filters.push({ field: "amount", operator: "gt", value: "0" });
    if (legacy.descriptionFilter) {
      filters.push({
        field: "description",
        operator: legacy.descriptionFilterMode === "include" ? "contains" : "excludes",
        value: legacy.descriptionFilter as string,
      });
    }
    for (const id of (legacy.excludedTagIds as string[]) ?? []) {
      filters.push({ field: "tag", operator: "isNot", value: id });
    }
    for (const id of (legacy.excludedMerchantIds as string[]) ?? []) {
      filters.push({ field: "merchant", operator: "isNot", value: id });
    }

    const {
      tagId: _t,
      merchantId: _m,
      direction: _d,
      descriptionFilter: _df,
      descriptionFilterMode: _dm,
      excludedTagIds: _et,
      excludedMerchantIds: _em,
      ...rest
    } = legacy as Record<string, unknown> & DashboardChartRecord;

    return {
      ...rest,
      id: chart.id,
      title: chart.title,
      chartType: chart.chartType,
      granularity: chart.granularity,
      position: chart.position,
      filters: filters.length > 0 ? filters : undefined,
    } as DashboardChartRecord;
  });

  return { ...data, dashboardCharts: migrated, version: 1 };
}

const MIGRATIONS: Migration[] = [migrateLegacyChartFilters];

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
