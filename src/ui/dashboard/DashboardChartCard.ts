import type { ChartData, ChartOptions } from "chart.js";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
import { parseRelativeDate } from "../../data/parseRelativeDate";
import { aggregateByMerchant } from "../../database/aggregateByMerchant";
import { type PeriodGranularity, aggregateByPeriod } from "../../database/aggregateByPeriod";
import { aggregateByTag } from "../../database/aggregateByTag";
import { type FilterOptions, filterTransactions } from "../../database/filterTransactions";
import type {
  ChartFilterCondition,
  DashboardChart,
  Merchant,
  Tag,
  Transaction,
} from "../../database/types";
import { barChartData } from "../charts/barChartData";
import "../charts/ChartWrapper";
import { cssVar } from "../cssVar";
import { iconButtonStyles } from "../iconButtonStyles";

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatPeriodLabel(key: string): string {
  // YYYY-MM-DD → "Jan 1, 2025"
  if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
    const [year, month, day] = key.split("-");
    return `${SHORT_MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
  }
  // YYYY-MM → "Jan 2025"
  if (/^\d{4}-\d{2}$/.test(key)) {
    const [year, month] = key.split("-");
    return `${SHORT_MONTHS[Number(month) - 1]} ${year}`;
  }
  return key;
}

type ColSpan = NonNullable<DashboardChart["colSpan"]>;
type RowSpan = NonNullable<DashboardChart["rowSpan"]>;

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

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-chart-card": DashboardChartCard;
  }
}

@customElement("dashboard-chart-card")
export class DashboardChartCard extends LitElement {
  @property({ type: Object })
  config!: DashboardChart;

  @property({ type: Array })
  transactions: Transaction[] = [];

  @property({ type: Array })
  tags: Tag[] = [];

  @property({ type: Array })
  merchants: Merchant[] = [];

  static styles = [
    iconButtonStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
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
      chart-wrapper {
        flex: 1;
        min-height: 0;
      }
      .resize-handle {
        position: absolute;
        right: 0;
        top: 0;
        width: 6px;
        height: 100%;
        cursor: col-resize;
        background: transparent;
        transition: background 0.15s;
      }
      .resize-handle:hover,
      :host([data-resizing]) .resize-handle {
        background: var(--budgee-primary);
      }
      .resize-handle-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        cursor: row-resize;
        background: transparent;
        transition: background 0.15s;
      }
      .resize-handle-bottom:hover,
      :host([data-resizing-vertical]) .resize-handle-bottom {
        background: var(--budgee-primary);
      }
      .resize-handle-corner {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        cursor: nwse-resize;
        background: transparent;
        z-index: 1;
      }
      .resize-handle-corner:hover,
      :host([data-resizing-corner]) .resize-handle-corner {
        background: var(--budgee-primary);
      }
    `,
  ];

  get #chartData(): ChartData {
    const startDate = this.config.startDate ? parseRelativeDate(this.config.startDate) : undefined;
    const filterOptions = this.config.filters
      ? chartFiltersToFilterOptions(this.config.filters)
      : {
          tagId: this.config.tagId,
          merchantId: this.config.merchantId,
          amountFilter:
            this.config.direction === "debit"
              ? { operator: "lt" as const, value: 0 }
              : this.config.direction === "credit"
                ? { operator: "gt" as const, value: 0 }
                : undefined,
          descriptionFilter: this.config.descriptionFilter,
          descriptionFilterMode: this.config.descriptionFilterMode,
        };
    const filtered = filterTransactions(this.transactions, { ...filterOptions, startDate });

    const { granularity } = this.config;
    const aggregated =
      granularity === "byTag"
        ? aggregateByTag(filtered, this.tags, this.config.excludedTagIds)
        : granularity === "byMerchant"
          ? aggregateByMerchant(filtered, this.merchants, this.config.excludedMerchantIds)
          : aggregateByPeriod(filtered, granularity);
    const isByDimension = granularity === "byTag" || granularity === "byMerchant";
    const isPie = this.config.chartType === "pie" || this.config.chartType === "doughnut";
    let entries = [...aggregated.entries()].sort(([a], [b]) => a.localeCompare(b));

    if (isPie) {
      entries = this.#groupSmallSlices(entries);
      entries.sort(([, a], [, b]) => Math.abs(b) - Math.abs(a));
    }

    if (!isByDimension && this.config.chartType === "bar") {
      const allFiltered = filterTransactions(this.transactions, filterOptions);
      const allAggregated = aggregateByPeriod(allFiltered, granularity as PeriodGranularity);
      const allEntries = [...allAggregated.entries()].sort(([a], [b]) => a.localeCompare(b));
      return barChartData({
        allEntries,
        displayEntries: entries,
        label: this.config.title,
        formatLabel: formatPeriodLabel,
      });
    }

    const isBar = this.config.chartType === "bar";
    const rawValues = entries.map(([, val]) => val);
    const values = isPie || isBar ? rawValues.map(Math.abs) : rawValues;
    const bgColors = isPie
      ? this.#pieColors(entries)
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

    return {
      labels: entries.map(([key]) => formatPeriodLabel(key)),
      datasets: [
        {
          label: this.config.title,
          data: values,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
          maxBarThickness: 50,
        },
      ],
    };
  }

  get #chartOptions(): ChartOptions {
    const pos = this.config.legendPosition ?? "top";
    if (pos === "hidden") {
      return { plugins: { legend: { display: false } } };
    }
    return { plugins: { legend: { position: pos } } };
  }

  #groupSmallSlices(entries: [string, number][]): [string, number][] {
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

    if (otherTotal !== 0) {
      kept.push(["other", otherTotal]);
    }

    return kept;
  }

  #pieColors(entries: [string, number][]): string[] {
    if (this.config.granularity === "byTag") {
      const tagByName = new Map(this.tags.map((t) => [t.name, t]));
      return entries.map(([name]) => tagByName.get(name)?.color ?? this.#generateColor(name));
    }
    return entries.map(([name]) => this.#generateColor(name));
  }

  #generateColor(seed: string): string {
    // Deterministic hash-based color from label
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) | 0;
    }
    const hue = ((hash % 360) + 360) % 360;
    return `lch(55% 50 ${hue})`;
  }

  #onEdit() {
    this.dispatchEvent(new CustomEvent("chart-edit", { detail: { chart: this.config } }));
  }

  #onDelete() {
    this.dispatchEvent(new CustomEvent("chart-deleted", { detail: { id: this.config.id } }));
  }

  #onResize(update: { colSpan?: ColSpan; rowSpan?: RowSpan }) {
    this.dispatchEvent(
      new CustomEvent("chart-resized", { detail: { id: this.config.id, ...update } }),
    );
  }

  #onResizeHandlePointerDown(e: PointerEvent) {
    this.#startResize(e, { horizontal: true });
  }

  #onVerticalResizePointerDown(e: PointerEvent) {
    this.#startResize(e, { vertical: true });
  }

  #onCornerResizePointerDown(e: PointerEvent) {
    this.#startResize(e, { horizontal: true, vertical: true });
  }

  #startResize(
    e: PointerEvent,
    { horizontal, vertical }: { horizontal?: boolean; vertical?: boolean },
  ) {
    e.preventDefault();
    e.stopPropagation();
    const handle = e.currentTarget as HTMLElement;
    handle.setPointerCapture(e.pointerId);

    const grid = this.closest(".chart-grid") ?? this.parentElement;
    if (!grid) return;

    const gridRect = grid.getBoundingClientRect();
    const gridStyle = getComputedStyle(grid);
    const gridColumns = horizontal ? gridStyle.gridTemplateColumns.split(" ").length : 0;
    const rowHeight = vertical ? parseFloat(gridStyle.gridTemplateRows.split(" ")[0]) || 200 : 0;
    const gap = vertical ? parseFloat(gridStyle.rowGap) || 0 : 0;

    let currentColSpan = this.config.colSpan ?? 1;
    let currentRowSpan: number = this.config.rowSpan ?? 1;

    const attr =
      horizontal && vertical
        ? "data-resizing-corner"
        : horizontal
          ? "data-resizing"
          : "data-resizing-vertical";
    this.setAttribute(attr, "");

    const onPointerMove = (ev: PointerEvent) => {
      if (horizontal) {
        const relativeX = ev.clientX - gridRect.left;
        const fractionAcrossGrid = relativeX / gridRect.width;
        const rawSpan = Math.round(fractionAcrossGrid * gridColumns);
        const hostLeft = this.getBoundingClientRect().left - gridRect.left;
        const startCol = Math.round((hostLeft / gridRect.width) * gridColumns);
        currentColSpan = Math.max(
          1,
          Math.min(gridColumns - startCol, rawSpan - startCol),
        ) as ColSpan;
        this.style.gridColumn = `span ${currentColSpan}`;
      }
      if (vertical) {
        const hostTop = this.getBoundingClientRect().top - gridRect.top;
        const bottomEdge = ev.clientY - gridRect.top;
        const spannedHeight = bottomEdge - hostTop;
        currentRowSpan = Math.max(1, Math.round((spannedHeight + gap) / (rowHeight + gap)));
        this.style.gridRow = `span ${currentRowSpan}`;
      }
    };

    const onPointerUp = () => {
      this.removeAttribute(attr);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);

      this.#onResize({
        ...(horizontal && { colSpan: Math.max(1, Math.min(6, currentColSpan)) as ColSpan }),
        ...(vertical && { rowSpan: Math.max(1, Math.min(4, currentRowSpan)) as RowSpan }),
      });
    };

    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
  }

  render() {
    return html`
      <div class="resize-handle" @pointerdown=${this.#onResizeHandlePointerDown}></div>
      <div class="resize-handle-bottom" @pointerdown=${this.#onVerticalResizePointerDown}></div>
      <div class="resize-handle-corner" @pointerdown=${this.#onCornerResizePointerDown}></div>
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${this.#onEdit}>${unsafeSVG(wrenchIcon)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${this.#onDelete}>${unsafeSVG(trash2Icon)}</button>
        </div>
      </div>
      <chart-wrapper
        .chartType=${this.config.chartType}
        .data=${this.#chartData}
        .options=${this.#chartOptions}
      ></chart-wrapper>
    `;
  }
}
