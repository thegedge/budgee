<script lang="ts">
  import type { ChartData, ChartOptions } from "chart.js";
  import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
  import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
  import {
    type PeriodGranularity,
    aggregateBy,
    aggregateByPeriod,
    mapKeys,
  } from "../../charting/aggregateBy";
  import { type FilterOptions, filterTransactions } from "../../charting/filterTransactions";
  import type { ChartFilterCondition } from "../../database/types";
  import type { DashboardChart } from "../../models/DashboardChart";
  import type { Merchant } from "../../models/Merchant";
  import type { Tag } from "../../models/Tag";
  import type { Transaction } from "../../models/Transaction";
  import { barChartData } from "../charts/barChartData";
  import ChartWrapper from "../charts/ChartWrapper.svelte";
  import { cssVar } from "../cssVar";
  import { resizable } from "../../lib/resizable";
  import "../styles/icon-button.css";

  const SHORT_MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  function formatPeriodLabel(key: string): string {
    if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
      const [year, month, day] = key.split("-");
      return `${SHORT_MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
    }
    if (/^\d{4}-\d{2}$/.test(key)) {
      const [year, month] = key.split("-");
      return `${SHORT_MONTHS[Number(month) - 1]} ${year}`;
    }
    return key;
  }

  function chartFiltersToFilterOptions(filters: ChartFilterCondition[]): FilterOptions {
    const options: FilterOptions = {};
    for (const f of filters) {
      switch (f.field) {
        case "tag":
          if (f.operator === "is") options.tagId = f.value;
          if (f.operator === "isNot") options.excludedTagId = f.value;
          break;
        case "merchant":
          if (f.operator === "is") options.merchantId = f.value;
          if (f.operator === "isNot") options.excludedMerchantId = f.value;
          break;
        case "amount":
          options.amountFilter = {
            operator: f.operator as "lt" | "gt" | "lte" | "gte",
            value: Number(f.value),
          };
          break;
        case "description":
          options.descriptionFilter = f.value;
          options.descriptionFilterMode = f.operator === "contains" ? "include" : "exclude";
          break;
      }
    }
    return options;
  }

  let {
    config,
    transactions = [],
    tags = [],
    merchants = [],
    maxColumns = 12,
    maxRows = 4,
    onChartEdit,
    onChartResized,
    onChartDeleted,
  }: {
    config: DashboardChart;
    transactions?: Transaction[] | null;
    tags?: Tag[];
    merchants?: Merchant[];
    maxColumns?: number;
    maxRows?: number;
    onChartEdit?: (chart: DashboardChart) => void;
    onChartResized?: (id: string, update: { colSpan?: number; rowSpan?: number }) => void;
    onChartDeleted?: (id: string) => void;
  } = $props();

  let liveColSpan = $state<number | undefined>(undefined);

  function excludedIds(field: "tag" | "merchant"): string[] {
    return (config.filters ?? [])
      .filter((f) => f.field === field && f.operator === "isNot")
      .map((f) => f.value);
  }

  function excludeEntities(
    entities: { id: string; name: string }[],
    excludedEntityIds: string[],
  ) {
    if (excludedEntityIds.length === 0) return entities;
    const excluded = new Set(excludedEntityIds);
    return entities.filter((e) => !excluded.has(e.id));
  }

  function groupSmallSlices(entries: [string, number][]): [string, number][] {
    const total = entries.reduce((sum, [, val]) => sum + Math.abs(val), 0);
    if (total === 0) return entries;

    const threshold = total * 0.01;
    const kept: [string, number][] = [];
    let otherTotal = 0;

    for (const [label, val] of entries) {
      if (Math.abs(val) < threshold) {
        otherTotal += val;
      } else {
        kept.push([label, val]);
      }
    }

    if (otherTotal !== 0) kept.push(["other", otherTotal]);
    return kept;
  }

  function generateColor(seed: string): string {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) | 0;
    }
    const hue = ((hash % 360) + 360) % 360;
    return `lch(55% 50 ${hue})`;
  }

  function pieColors(entries: [string, number][]): string[] {
    if (config.granularity === "byTag") {
      const tagByName = new Map(tags.map((t) => [t.name, t]));
      return entries.map(([name]) => tagByName.get(name)?.color ?? generateColor(name));
    }
    return entries.map(([name]) => generateColor(name));
  }

  let chartData = $derived.by((): ChartData => {
    const txList = transactions ?? [];
    const filterOptions = chartFiltersToFilterOptions(config.filters ?? []);
    const filtered = filterTransactions(txList, filterOptions);

    const { granularity } = config;
    const excludedTagIds = excludedIds("tag");
    const excludedMerchantIds = excludedIds("merchant");
    const aggregated =
      granularity === "byTag"
        ? mapKeys(
            aggregateBy(filtered, (tx) => tx.tagIds),
            excludeEntities(tags, excludedTagIds),
          )
        : granularity === "byMerchant"
          ? mapKeys(
              aggregateBy(filtered, (tx) => (tx.merchantId ? [tx.merchantId] : [])),
              excludeEntities(merchants, excludedMerchantIds),
            )
          : aggregateByPeriod(filtered, granularity);

    const isByDimension = granularity === "byTag" || granularity === "byMerchant";
    const isPie = config.chartType === "pie" || config.chartType === "doughnut";
    let entries = [...aggregated.entries()].sort(([a], [b]) => a.localeCompare(b));

    if (isPie) {
      entries = groupSmallSlices(entries);
      entries.sort(([, a], [, b]) => Math.abs(b) - Math.abs(a));
    }

    if (!isByDimension && config.chartType === "bar") {
      const allAggregated = aggregateByPeriod(filtered, granularity as PeriodGranularity);
      const allEntries = [...allAggregated.entries()].sort(([a], [b]) => a.localeCompare(b));
      return barChartData({
        allEntries,
        displayEntries: entries,
        label: config.title,
        formatLabel: formatPeriodLabel,
      });
    }

    const isBar = config.chartType === "bar";
    const rawValues = entries.map(([, val]) => val);
    const values = isPie || isBar ? rawValues.map(Math.abs) : rawValues;
    const bgColors = isPie
      ? pieColors(entries)
      : isBar
        ? rawValues.map((v) =>
            v < 0 ? cssVar("--budgee-negative", 0.5) : cssVar("--budgee-positive", 0.5),
          )
        : cssVar("--budgee-primary", 0.5);
    const borderColors = isPie
      ? cssVar("--budgee-surface")
      : isBar
        ? rawValues.map((v) => (v < 0 ? cssVar("--budgee-negative") : cssVar("--budgee-positive")))
        : cssVar("--budgee-primary");
    const hoverBgColors = isBar
      ? rawValues.map((v) =>
          v < 0 ? cssVar("--budgee-negative", 0.75) : cssVar("--budgee-positive", 0.75),
        )
      : undefined;

    return {
      labels: entries.map(([key]) => formatPeriodLabel(key)),
      datasets: [
        {
          label: config.title,
          data: values,
          backgroundColor: bgColors,
          hoverBackgroundColor: hoverBgColors,
          borderColor: borderColors,
          borderWidth: 1,
          maxBarThickness: 50,
        },
      ],
    };
  });

  let chartOptions = $derived.by((): ChartOptions => {
    const isPie = config.chartType === "pie" || config.chartType === "doughnut";
    const pos = config.legendPosition ?? "top";
    const legend = pos === "hidden" ? { display: false as const } : { position: pos };
    const colSpan = liveColSpan ?? config.colSpan ?? 1;
    const maxTicksLimit = Math.max(2, Math.round((colSpan / maxColumns) * 12));
    return {
      ...(isPie && { interaction: { mode: "nearest" as const, intersect: true } }),
      ...(!isPie && {
        scales: {
          x: { ticks: { autoSkip: true, maxTicksLimit } },
        },
      }),
      plugins: { legend },
    };
  });
</script>

<div
  class="dashboard-chart-card"
  use:resizable={{
    colSpan: config.colSpan,
    rowSpan: config.rowSpan,
    maxColumns,
    maxRows,
    onResized: (update) => onChartResized?.(config.id, update),
    onLiveColSpan: (span) => { liveColSpan = span; },
  }}
>
  <div data-resize-handle="horizontal"></div>
  <div data-resize-handle="vertical"></div>
  <div data-resize-handle="corner"></div>
  <div class="header">
    <h4>{config.title}</h4>
    <div class="actions">
      <button
        class="icon-btn"
        title="Edit"
        aria-label="Edit"
        onclick={() => onChartEdit?.(config)}
      >{@html wrenchIcon}</button>
      <button
        class="icon-btn icon-btn--danger"
        title="Delete"
        aria-label="Delete"
        onclick={() => onChartDeleted?.(config.id)}
      >{@html trash2Icon}</button>
    </div>
  </div>
  <ChartWrapper chartType={config.chartType} data={chartData} options={chartOptions} />
</div>

<style>
  .dashboard-chart-card {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    height: 100%;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  h4 {
    margin: 0;
  }

  .actions {
    display: flex;
    gap: 0.25rem;
  }

  :global(.chart-wrapper) {
    flex: 1;
    min-height: 0;
  }

  [data-resize-handle="horizontal"] {
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    transition: background 0.15s;

    &:hover,
    :global([data-resizing]) & {
      background: var(--budgee-primary);
    }
  }

  [data-resize-handle="vertical"] {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    cursor: row-resize;
    background: transparent;
    transition: background 0.15s;

    &:hover,
    :global([data-resizing-vertical]) & {
      background: var(--budgee-primary);
    }
  }

  [data-resize-handle="corner"] {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    cursor: nwse-resize;
    background: transparent;
    z-index: 1;

    &:hover,
    :global([data-resizing-corner]) & {
      background: var(--budgee-primary);
    }
  }
</style>
