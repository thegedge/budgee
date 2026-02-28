import type { ChartData } from "chart.js";
import { movingMedian } from "../../data/movingAverage";
import { movingWindowSize } from "../../data/movingWindowSize";
import { cssVar } from "../cssVar";

export function barChartData(options: {
  allEntries: [string, number][];
  displayEntries: [string, number][];
  label: string;
  formatLabel?: (key: string) => string;
}): ChartData {
  const { allEntries, displayEntries, label, formatLabel } = options;

  const allValues = allEntries.map(([, v]) => v);
  const windowSize = movingWindowSize(allValues.length);
  const allMedian = movingMedian(allValues, windowSize);

  const firstDisplayKey = displayEntries[0]?.[0];
  const sliceIndex = firstDisplayKey ? allEntries.findIndex(([key]) => key === firstDisplayKey) : 0;

  const rawValues = displayEntries.map(([, v]) => v);
  const displayValues = rawValues.map(Math.abs);
  const displayMedian = allMedian
    .slice(sliceIndex, sliceIndex + displayEntries.length)
    .map(Math.abs);

  const labels = formatLabel
    ? displayEntries.map(([key]) => formatLabel(key))
    : displayEntries.map(([key]) => key);

  const datasets: ChartData["datasets"] = [
    {
      label,
      data: displayValues,
      backgroundColor: rawValues.map((v) =>
        v < 0 ? cssVar("--budgee-negative", 0.5) : cssVar("--budgee-positive", 0.5),
      ),
      borderColor: rawValues.map((v) =>
        v < 0 ? cssVar("--budgee-negative") : cssVar("--budgee-positive"),
      ),
      borderWidth: 1,
      maxBarThickness: 50,
    },
  ];

  if (displayValues.length >= 2) {
    datasets.push({
      type: "line",
      label: `${label} (${windowSize}-pt median)`,
      data: displayMedian,
      borderColor: cssVar("--budgee-text-muted", 0.5),
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
      tension: 0.3,
    } as ChartData["datasets"][number]);
  }

  return { labels, datasets };
}
