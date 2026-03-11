import { beforeAll, describe, expect, it } from "vitest";
import { barChartData } from "./barChartData";

beforeAll(() => {
  document.documentElement.style.setProperty("--budgee-negative", "lch(50% 50 30)");
  document.documentElement.style.setProperty("--budgee-positive", "lch(50% 50 140)");
  document.documentElement.style.setProperty("--budgee-text-muted", "lch(50% 0 0)");
});

describe("barChartData", () => {
  it("returns labels and a single dataset for one entry", () => {
    const result = barChartData({
      allEntries: [["2025-01", -50]],
      displayEntries: [["2025-01", -50]],
      label: "Test",
    });

    expect(result.labels).toEqual(["2025-01"]);
    expect(result.datasets).toHaveLength(1);
    expect(result.datasets[0].data).toEqual([50]);
    expect(result.datasets[0].label).toBe("Test");
  });

  it("applies Math.abs to values", () => {
    const result = barChartData({
      allEntries: [
        ["2025-01", -100],
        ["2025-02", 200],
      ],
      displayEntries: [
        ["2025-01", -100],
        ["2025-02", 200],
      ],
      label: "Test",
    });

    expect(result.datasets[0].data).toEqual([100, 200]);
  });

  it("uses red for negative, green for positive background colors", () => {
    const result = barChartData({
      allEntries: [
        ["2025-01", -100],
        ["2025-02", 200],
      ],
      displayEntries: [
        ["2025-01", -100],
        ["2025-02", 200],
      ],
      label: "Test",
    });

    const bg = result.datasets[0].backgroundColor as string[];
    expect(bg[0]).not.toBe(bg[1]);
  });

  it("adds a median trend line when >= 2 display entries", () => {
    const result = barChartData({
      allEntries: [
        ["2025-01", -100],
        ["2025-02", -200],
      ],
      displayEntries: [
        ["2025-01", -100],
        ["2025-02", -200],
      ],
      label: "Test",
    });

    expect(result.datasets).toHaveLength(2);
    expect(result.datasets[1].type).toBe("line");
  });

  it("omits median trend line for single entry", () => {
    const result = barChartData({
      allEntries: [["2025-01", -100]],
      displayEntries: [["2025-01", -100]],
      label: "Test",
    });

    expect(result.datasets).toHaveLength(1);
  });

  it("slices median to display range when allEntries is larger", () => {
    const allEntries: [string, number][] = [
      ["2025-01", -10],
      ["2025-02", -20],
      ["2025-03", -30],
      ["2025-04", -40],
    ];
    const displayEntries: [string, number][] = [
      ["2025-03", -30],
      ["2025-04", -40],
    ];

    const result = barChartData({ allEntries, displayEntries, label: "Test" });
    expect(result.datasets[1].data).toHaveLength(2);
  });

  it("applies formatLabel to keys", () => {
    const result = barChartData({
      allEntries: [["2025-01", -50]],
      displayEntries: [["2025-01", -50]],
      label: "Test",
      formatLabel: (key) => `formatted-${key}`,
    });

    expect(result.labels).toEqual(["formatted-2025-01"]);
  });
});
