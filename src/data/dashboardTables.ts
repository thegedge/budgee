import { db } from "../database/db";
import { allDocs } from "../database/pouchHelpers";
import type { DashboardTable } from "../database/types";
import { uuid } from "../uuid";

export class DashboardTables {
  private constructor() {}

  static async all(): Promise<DashboardTable[]> {
    return (await allDocs(db.dashboardTables)).sort((a, b) => a.position - b.position);
  }

  static async create(table: Omit<DashboardTable, "_id" | "_rev">): Promise<string> {
    const id = uuid();
    await db.dashboardTables.put({ ...table, _id: id });
    return id;
  }

  static async update(id: string, changes: Partial<DashboardTable>): Promise<void> {
    const doc = await db.dashboardTables.get(id);
    await db.dashboardTables.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const doc = await db.dashboardTables.get(id);
    await db.dashboardTables.remove(doc);
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
