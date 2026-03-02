import { waitForDb } from "../database/Db";
import type { DashboardTable } from "../database/types";
import { uuid } from "../uuid";

export class DashboardTables {
  private constructor() {}

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.dashboardTables.subscribe(callback);
  }

  static async all(): Promise<DashboardTable[]> {
    const db = await waitForDb();
    const docs = await db.dashboardTables.all();
    return docs.sort((a, b) => a.position - b.position);
  }

  static async create(table: Omit<DashboardTable, "id">): Promise<string> {
    const db = await waitForDb();
    const id = uuid();
    await db.dashboardTables.put({ ...table, id });
    return id;
  }

  static async update(id: string, changes: Partial<DashboardTable>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.dashboardTables.get(id);
    await db.dashboardTables.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const db = await waitForDb();
    await db.dashboardTables.remove(id);
  }

  static async reorder(ids: string[]): Promise<void> {
    const db = await waitForDb();
    await Promise.all(
      ids.map(async (id, i) => {
        const doc = await db.dashboardTables.get(id);
        await db.dashboardTables.put({ ...doc, position: i });
      }),
    );
  }
}
