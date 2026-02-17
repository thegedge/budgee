import { db } from "../database/db";
import type { DashboardChart } from "../database/types";
import { uuid } from "../uuid";

export class DashboardCharts {
  private constructor() {}

  static async all(): Promise<DashboardChart[]> {
    const docs = await db.dashboardCharts.all();
    return docs.sort((a, b) => a.position - b.position);
  }

  static async create(chart: Omit<DashboardChart, "id">): Promise<string> {
    const id = uuid();
    await db.dashboardCharts.put({ ...chart, id });
    return id;
  }

  static async update(id: string, changes: Partial<DashboardChart>): Promise<void> {
    const doc = await db.dashboardCharts.get(id);
    await db.dashboardCharts.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    await db.dashboardCharts.remove(id);
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
