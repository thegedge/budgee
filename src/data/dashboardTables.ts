import { db } from "../database/db";
import type { DashboardTable } from "../database/types";

export class DashboardTables {
  private constructor() {}

  static async all(): Promise<DashboardTable[]> {
    return (await db.dashboardTables.toArray()).sort((a, b) => a.position - b.position);
  }

  static create(table: Omit<DashboardTable, "id">): Promise<number> {
    return db.dashboardTables.add(table) as Promise<number>;
  }

  static update(id: number, changes: Partial<DashboardTable>): Promise<number> {
    return db.dashboardTables.update(id, changes);
  }

  static remove(id: number): Promise<void> {
    return db.dashboardTables.delete(id);
  }

  static async reorder(ids: number[]): Promise<void> {
    await Promise.all(ids.map((id, i) => db.dashboardTables.update(id, { position: i })));
  }
}
