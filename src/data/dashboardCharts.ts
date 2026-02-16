import { db } from "../database/db";
import type { DashboardChart } from "../database/types";

export class DashboardCharts {
  private constructor() {}

  static async all(): Promise<DashboardChart[]> {
    return (await db.dashboardCharts.toArray()).sort((a, b) => a.position - b.position);
  }

  static create(chart: Omit<DashboardChart, "id">): Promise<number> {
    return db.dashboardCharts.add(chart) as Promise<number>;
  }

  static update(id: number, changes: Partial<DashboardChart>): Promise<number> {
    return db.dashboardCharts.update(id, changes);
  }

  static remove(id: number): Promise<void> {
    return db.dashboardCharts.delete(id);
  }

  static async reorder(ids: number[]): Promise<void> {
    await Promise.all(ids.map((id, i) => db.dashboardCharts.update(id, { position: i })));
  }
}
