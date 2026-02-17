import { db } from "../database/db";
import type { DashboardTable } from "../database/types";
import { uuid } from "../uuid";

export class DashboardTables {
  private constructor() {}

  static async all(): Promise<DashboardTable[]> {
    const docs = await db.dashboardTables.all();
    return docs.sort((a, b) => a.position - b.position);
  }

  static async create(table: Omit<DashboardTable, "id">): Promise<string> {
    const id = uuid();
    await db.dashboardTables.put({ ...table, id });
    return id;
  }

  static async update(id: string, changes: Partial<DashboardTable>): Promise<void> {
    const doc = await db.dashboardTables.get(id);
    await db.dashboardTables.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    await db.dashboardTables.remove(id);
  }

  static async reorder(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map(async (id, i) => {
        const doc = await db.dashboardTables.get(id);
        await db.dashboardTables.put({ ...doc, position: i });
      }),
    );
  }
}
