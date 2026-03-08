import { Repository } from "../database/Repository";
import type {
  DashboardTableColumn,
  DashboardTableModel,
  DashboardTableRecord,
} from "../database/types";

export class DashboardTable {
  readonly id!: string;
  readonly title!: string;
  readonly model!: DashboardTableModel;
  readonly columns!: DashboardTableColumn[];
  readonly position!: number;
  readonly colSpan?: number;
  readonly rowSpan?: number;

  constructor(data: DashboardTableRecord) {
    Object.assign(this, data);
  }

  static async subscribe(callback: () => void) {
    return dashboardTables.subscribe(callback);
  }

  static async all(): Promise<DashboardTable[]> {
    const docs = await dashboardTables.all();
    return docs.sort((a, b) => a.position - b.position).map((d) => new DashboardTable(d));
  }

  static async create(table: Omit<DashboardTableRecord, "id">): Promise<DashboardTable> {
    const doc = await dashboardTables.create(table);
    return new DashboardTable(doc);
  }

  static async update(id: string, changes: Partial<DashboardTableRecord>): Promise<void> {
    await dashboardTables.update(id, changes);
  }

  static async remove(id: string): Promise<void> {
    await dashboardTables.remove(id);
  }

  static async reorder(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map(async (id, i) => {
        await dashboardTables.update(id, { position: i } as Partial<DashboardTableRecord>);
      }),
    );
  }
}

export const dashboardTables = new Repository<DashboardTableRecord>({
  collection: (dbs) => dbs.dashboardTables,
});
