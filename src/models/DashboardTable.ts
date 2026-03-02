import { waitForDb } from "../database/Db";
import type {
  DashboardTableColumn,
  DashboardTableModel,
  DashboardTableRecord,
} from "../database/types";
import { uuid } from "../uuid";

export class DashboardTable {
  readonly id: string;
  readonly title: string;
  readonly model: DashboardTableModel;
  readonly columns: DashboardTableColumn[];
  readonly position: number;
  readonly colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  readonly rowSpan?: 1 | 2 | 3 | 4;

  constructor(data: DashboardTableRecord) {
    this.id = data.id;
    this.title = data.title;
    this.model = data.model;
    this.columns = data.columns;
    this.position = data.position;
    this.colSpan = data.colSpan;
    this.rowSpan = data.rowSpan;
  }

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.dashboardTables.subscribe(callback);
  }

  static async all(): Promise<DashboardTable[]> {
    const db = await waitForDb();
    const docs = await db.dashboardTables.all();
    return docs.sort((a, b) => a.position - b.position).map((d) => new DashboardTable(d));
  }

  static async create(table: Omit<DashboardTableRecord, "id">): Promise<DashboardTable> {
    const db = await waitForDb();
    const data = { ...table, id: uuid() };
    await db.dashboardTables.put(data);
    return new DashboardTable(data);
  }

  static async update(id: string, changes: Partial<DashboardTableRecord>): Promise<void> {
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
