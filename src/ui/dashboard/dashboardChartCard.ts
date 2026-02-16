import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  aggregateByMerchant,
  aggregateByPeriod,
  aggregateByTag,
  filterTransactions,
} from "../../database/aggregations";
import type { DashboardChart, Merchant, Tag, Transaction } from "../../database/types";
import type { ChartData } from "chart.js";
import { movingAverage, movingAverageWindow } from "../../data/movingAverage";
import "../charts/chartWrapper";
import { cssVar } from "../cssVar";

type ColSpan = NonNullable<DashboardChart["colSpan"]>;

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

  static styles = css`
    :host {
      display: block;
      position: relative;
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
    button {
      padding: 2px 8px;
      cursor: pointer;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    .edit-btn {
      background-color: var(--budgee-primary);
    }
    .edit-btn:hover {
      background-color: var(--budgee-primary-hover);
    }
    .delete-btn {
      background-color: var(--budgee-danger);
    }
    .delete-btn:hover {
      background-color: var(--budgee-danger-hover);
    }
    .actions {
      display: flex;
      gap: 0.25rem;
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
  `;

  get #chartData(): ChartData {
    const filtered = filterTransactions(this.transactions, {
      tagId: this.config.tagId,
      merchantId: this.config.merchantId,
      startDate: this.config.startDate,
      endDate: this.config.endDate,
    });

    const { granularity } = this.config;
    const aggregated =
      granularity === "byTag"
        ? aggregateByTag(filtered, this.tags)
        : granularity === "byMerchant"
          ? aggregateByMerchant(filtered, this.merchants)
          : aggregateByPeriod(filtered, granularity);
    const isByDimension = granularity === "byTag" || granularity === "byMerchant";
    const isPie = this.config.chartType === "pie" || this.config.chartType === "doughnut";
    let entries = [...aggregated.entries()].sort(([a], [b]) => a.localeCompare(b));

    if (isPie) {
      entries = this.#groupSmallSlices(entries);
      entries.sort(([, a], [, b]) => Math.abs(b) - Math.abs(a));
    }

    const values = entries.map(([, val]) => val);
    const isUnfilteredMonthlyBar =
      this.config.chartType === "bar" &&
      this.config.granularity === "month" &&
      !this.config.tagId &&
      !this.config.merchantId;
    const bgColors = isPie
      ? this.#pieColors(entries)
      : isUnfilteredMonthlyBar
        ? values.map((v) =>
            v < 0 ? cssVar("--budgee-negative", 0.5) : cssVar("--budgee-positive", 0.5),
          )
        : cssVar("--budgee-primary", 0.5);
    const borderColors = isPie
      ? cssVar("--budgee-surface")
      : isUnfilteredMonthlyBar
        ? values.map((v) => (v < 0 ? cssVar("--budgee-negative") : cssVar("--budgee-positive")))
        : cssVar("--budgee-primary");

    const datasets: ChartData["datasets"] = [
      {
        label: this.config.title,
        data: values,
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: isPie ? 2 : 1,
      },
    ];

    if (!isByDimension && this.config.chartType === "bar" && values.length >= 2) {
      const window = movingAverageWindow(values.length);
      datasets.push({
        type: "line",
        label: `${this.config.title} (${window}-pt avg)`,
        data: movingAverage(values, window),
        borderColor: cssVar("--budgee-text-muted", 0.5),
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        tension: 0.3,
      } as ChartData["datasets"][number]);
    }

    return {
      labels: entries.map(([key]) => key),
      datasets,
    };
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
      kept.push(["Other", otherTotal]);
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

  #onResize(colSpan: ColSpan) {
    this.dispatchEvent(
      new CustomEvent("chart-resized", { detail: { id: this.config.id, colSpan } }),
    );
  }

  #onResizeHandlePointerDown(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    const handle = e.currentTarget as HTMLElement;
    handle.setPointerCapture(e.pointerId);
    this.setAttribute("data-resizing", "");

    const grid = this.closest(".chart-grid") ?? this.parentElement;
    if (!grid) return;

    const gridRect = grid.getBoundingClientRect();
    const gridColumns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;

    const onPointerMove = (ev: PointerEvent) => {
      // Calculate which column boundary the pointer is nearest to
      const relativeX = ev.clientX - gridRect.left;
      const fractionAcrossGrid = relativeX / gridRect.width;
      const rawSpan = Math.round(fractionAcrossGrid * gridColumns);
      const hostLeft = this.getBoundingClientRect().left - gridRect.left;
      const startCol = Math.round((hostLeft / gridRect.width) * gridColumns);
      const newSpan = Math.max(1, Math.min(gridColumns - startCol, rawSpan - startCol)) as ColSpan;
      this.style.gridColumn = `span ${newSpan}`;
    };

    const onPointerUp = () => {
      this.removeAttribute("data-resizing");
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);

      const currentSpan = parseInt(getComputedStyle(this).gridColumnEnd.replace("span ", "")) || 1;
      const colSpan = Math.max(1, Math.min(3, currentSpan)) as ColSpan;
      this.#onResize(colSpan);
    };

    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
  }

  render() {
    return html`
      <div class="resize-handle" @pointerdown=${this.#onResizeHandlePointerDown}></div>
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="edit-btn" @click=${this.#onEdit}>Edit</button>
          <button class="delete-btn" @click=${this.#onDelete}>Delete</button>
        </div>
      </div>
      <chart-wrapper
        .chartType=${this.config.chartType}
        .data=${this.#chartData}
      ></chart-wrapper>
    `;
  }
}
