import { db } from "../database/db";
import { allDocs } from "../database/pouchHelpers";
import type { DashboardChart } from "../database/types";
import { uuid } from "../uuid";

export class DashboardCharts {
  private constructor() {}

  static async all(): Promise<DashboardChart[]> {
    return (await allDocs(db.dashboardCharts)).sort((a, b) => a.position - b.position);
  }

  static async create(chart: Omit<DashboardChart, "_id" | "_rev">): Promise<string> {
    const id = uuid();
    await db.dashboardCharts.put({ ...chart, _id: id });
    return id;
  }

  static async update(id: string, changes: Partial<DashboardChart>): Promise<void> {
    const doc = await db.dashboardCharts.get(id);
    await db.dashboardCharts.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const doc = await db.dashboardCharts.get(id);
    await db.dashboardCharts.remove(doc);
  }

  static async reorder(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map(async (id, i) => {
        const doc = await db.dashboardCharts.get(id);
        await db.dashboardCharts.put({ ...doc, position: i });
      }),
    );
  }
}
