import { Repository } from "../database/Repository";
import type { ChartFilterCondition, DashboardChartRecord } from "../database/types";

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
    return dashboardCharts.subscribe(callback);
  }

  static async all(): Promise<DashboardChart[]> {
    const docs = await dashboardCharts.all();
    return docs.sort((a, b) => a.position - b.position).map((d) => new DashboardChart(d));
  }

  static async create(chart: Omit<DashboardChartRecord, "id">): Promise<DashboardChart> {
    const doc = await dashboardCharts.create(chart);
    return new DashboardChart(doc);
  }

  static async update(id: string, changes: Partial<DashboardChartRecord>): Promise<void> {
    await dashboardCharts.update(id, changes);
  }

  static async remove(id: string): Promise<void> {
    await dashboardCharts.remove(id);
  }

  static async reorder(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map(async (id, i) => {
        await dashboardCharts.update(id, { position: i } as Partial<DashboardChartRecord>);
      }),
    );
  }
}

export const dashboardCharts = new Repository<DashboardChartRecord>({
  collection: (dbs) => dbs.dashboardCharts,
});
