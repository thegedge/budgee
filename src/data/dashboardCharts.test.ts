import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../database/db";
import { DashboardCharts } from "./dashboardCharts";

beforeEach(async () => {
  await db.dashboardCharts.clear();
});

describe("DashboardCharts", () => {
  it("should return all charts sorted by position", async () => {
    await db.dashboardCharts.bulkAdd([
      { title: "B", chartType: "bar", granularity: "month", position: 1 },
      { title: "A", chartType: "line", granularity: "month", position: 0 },
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
    const id = (await db.dashboardCharts.add({
      title: "X",
      chartType: "pie",
      granularity: "byTag",
      position: 0,
    })) as number;
    await DashboardCharts.remove(id);
    expect(await db.dashboardCharts.get(id)).toBeUndefined();
  });

  it("should reorder charts", async () => {
    const id1 = (await db.dashboardCharts.add({
      title: "A",
      chartType: "bar",
      granularity: "month",
      position: 0,
    })) as number;
    const id2 = (await db.dashboardCharts.add({
      title: "B",
      chartType: "line",
      granularity: "month",
      position: 1,
    })) as number;

    await DashboardCharts.reorder([id2, id1]);

    const a = await db.dashboardCharts.get(id1);
    const b = await db.dashboardCharts.get(id2);
    expect(b?.position).toBe(0);
    expect(a?.position).toBe(1);
  });
});
