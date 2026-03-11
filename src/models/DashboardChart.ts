import { waitForDb } from "../database/Db";
import type { ChartFilterCondition, DashboardChartRecord } from "../database/types";
import { uuid } from "../uuid";

export class DashboardChart {
  readonly id!: string;
  readonly title!: string;
  readonly chartType!: "bar" | "line" | "pie" | "doughnut";
  readonly granularity!: "day" | "month" | "year" | "byTag" | "byMerchant";
  readonly startDate?: string;
  readonly endDate?: string;
  readonly tagId?: string;
  readonly merchantId?: string;
  readonly position!: number;
  readonly colSpan?: number;
  readonly rowSpan?: number;
  readonly excludedTagIds?: string[];
  readonly excludedMerchantIds?: string[];
  readonly direction?: "debit" | "credit";
  readonly descriptionFilter?: string;
  readonly descriptionFilterMode?: "include" | "exclude";
  readonly legendPosition?: "top" | "bottom" | "left" | "right" | "hidden";
  readonly filters?: ChartFilterCondition[];

  constructor(data: DashboardChartRecord) {
    Object.assign(this, data);
  }

  static async subscribe(callback: () => void) {
    const db = await waitForDb();
    return db.dashboardCharts.subscribe(callback);
  }

  static async all(): Promise<DashboardChart[]> {
    const db = await waitForDb();
    const docs = await db.dashboardCharts.all();
    return docs.sort((a, b) => a.position - b.position).map((d) => new DashboardChart(d));
  }

  static async create(chart: Omit<DashboardChartRecord, "id">): Promise<DashboardChart> {
    const db = await waitForDb();
    const data = { ...chart, id: uuid() };
    await db.dashboardCharts.put(data);
    return new DashboardChart(data);
  }

  static async update(id: string, changes: Partial<DashboardChartRecord>): Promise<void> {
    const db = await waitForDb();
    const doc = await db.dashboardCharts.get(id);
    await db.dashboardCharts.put({ ...doc, ...changes });
  }

  static async remove(id: string): Promise<void> {
    const db = await waitForDb();
    await db.dashboardCharts.remove(id);
  }

  static async reorder(ids: string[]): Promise<void> {
    const db = await waitForDb();
    await Promise.all(
      ids.map(async (id, i) => {
        const doc = await db.dashboardCharts.get(id);
        await db.dashboardCharts.put({ ...doc, position: i });
      }),
    );
  }
}
