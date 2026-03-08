import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/Db";
import { uuid } from "../uuid";
import { DashboardChart } from "./DashboardChart";

beforeEach(async () => {
  const dbs = await db();
  await dbs.dashboardCharts.clear();
});

describe("DashboardChart", () => {
  it("should return all charts sorted by position", async () => {
    const dbs = await db();
    await dbs.dashboardCharts.bulkDocs([
      { id: uuid(), title: "B", chartType: "bar", granularity: "month", position: 1 },
      {
        id: uuid(),
        title: "A",
        chartType: "line",
        granularity: "month",
        position: 0,
      },
    ]);
    const all = await DashboardChart.all();
    expect(all).toHaveLength(2);
    expect(all[0].title).toBe("A");
    expect(all[1].title).toBe("B");
  });

  it("should create a chart", async () => {
    const dbs = await db();
    const created = await DashboardChart.create({
      title: "Test",
      chartType: "bar",
      granularity: "month",
      position: 0,
    });
    const chart = await dbs.dashboardCharts.get(created.id);
    expect(chart?.title).toBe("Test");
  });

  it("should remove a chart", async () => {
    const dbs = await db();
    const resp = await dbs.dashboardCharts.put({
      id: uuid(),
      title: "X",
      chartType: "pie",
      granularity: "byTag",
      position: 0,
    });
    await DashboardChart.remove(resp.id);
    expect(await dbs.dashboardCharts.get(resp.id).catch(() => undefined)).toBeUndefined();
  });

  it("should reorder charts", async () => {
    const dbs = await db();
    const resp1 = await dbs.dashboardCharts.put({
      id: uuid(),
      title: "A",
      chartType: "bar",
      granularity: "month",
      position: 0,
    });
    const resp2 = await dbs.dashboardCharts.put({
      id: uuid(),
      title: "B",
      chartType: "line",
      granularity: "month",
      position: 1,
    });

    await DashboardChart.reorder([resp2.id, resp1.id]);

    const a = await dbs.dashboardCharts.get(resp1.id);
    const b = await dbs.dashboardCharts.get(resp2.id);
    expect(b?.position).toBe(0);
    expect(a?.position).toBe(1);
  });
});
