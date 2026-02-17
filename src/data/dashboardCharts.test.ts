import { uuid } from "../uuid";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { clearDb } from "../database/pouchHelpers";
import { DashboardCharts } from "./dashboardCharts";

beforeEach(async () => {
  await clearDb(db.dashboardCharts);
});

describe("DashboardCharts", () => {
  it("should return all charts sorted by position", async () => {
    await db.dashboardCharts.bulkDocs([
      { id: uuid(), title: "B", chartType: "bar", granularity: "month", position: 1 },
      {
        id: uuid(),
        title: "A",
        chartType: "line",
        granularity: "month",
        position: 0,
      },
    ]);
    const all = await DashboardCharts.all();
    expect(all).toHaveLength(2);
    expect(all[0].title).toBe("A");
    expect(all[1].title).toBe("B");
  });

  it("should create a chart", async () => {
    const id = await DashboardCharts.create({
      title: "Test",
      chartType: "bar",
      granularity: "month",
      position: 0,
    });
    const chart = await db.dashboardCharts.get(id);
    expect(chart?.title).toBe("Test");
  });

  it("should remove a chart", async () => {
    const resp = await db.dashboardCharts.put({
      id: uuid(),
      title: "X",
      chartType: "pie",
      granularity: "byTag",
      position: 0,
    });
    await DashboardCharts.remove(resp.id);
    expect(await db.dashboardCharts.get(resp.id).catch(() => undefined)).toBeUndefined();
  });

  it("should reorder charts", async () => {
    const resp1 = await db.dashboardCharts.put({
      id: uuid(),
      title: "A",
      chartType: "bar",
      granularity: "month",
      position: 0,
    });
    const resp2 = await db.dashboardCharts.put({
      id: uuid(),
      title: "B",
      chartType: "line",
      granularity: "month",
      position: 1,
    });

    await DashboardCharts.reorder([resp2.id, resp1.id]);

    const a = await db.dashboardCharts.get(resp1.id);
    const b = await db.dashboardCharts.get(resp2.id);
    expect(b?.position).toBe(0);
    expect(a?.position).toBe(1);
  });
});
