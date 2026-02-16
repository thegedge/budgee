import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { aggregateByPeriod, aggregateByTag, filterTransactions } from "../../database/aggregations";
import type { DashboardChart, Tag, Transaction } from "../../database/types";
import type { ChartData } from "chart.js";
import { movingAverage, movingAverageWindow } from "../charts/movingAverage";
import "../charts/chartWrapper";

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

  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 1rem;
      border-radius: 4px;
      background: var(--budgee-surface, #fff);
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
      background-color: var(--budgee-primary, #7eb8da);
    }
    .edit-btn:hover {
      background-color: var(--budgee-primary-hover, #5a9cbf);
    }
    .delete-btn {
      background-color: var(--budgee-danger, #e8a0a0);
    }
    .delete-btn:hover {
      background-color: var(--budgee-danger-hover, #d07070);
    }
    .actions {
      display: flex;
      gap: 0.25rem;
    }
    .size-btn {
      background-color: var(--budgee-secondary, #aaa);
      font-size: 0.7rem;
    }
    .size-btn:hover {
      background-color: var(--budgee-secondary-hover, #888);
    }
    .size-btn[data-active] {
      background-color: var(--budgee-primary, #7eb8da);
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
    const isByTag = granularity === "byTag";
    const aggregated = isByTag
      ? aggregateByTag(filtered, this.tags)
      : aggregateByPeriod(filtered, granularity);
    const entries = [...aggregated.entries()].sort(([a], [b]) => a.localeCompare(b));
    const values = entries.map(([, val]) => val);

    const datasets: ChartData["datasets"] = [
      {
        label: this.config.title,
        data: values,
        backgroundColor: "rgba(126, 184, 218, 0.5)",
        borderColor: "#7eb8da",
        borderWidth: 1,
      },
    ];

    if (!isByTag && this.config.chartType === "bar" && values.length >= 2) {
      const window = movingAverageWindow(values.length);
      datasets.push({
        type: "line",
        label: `${this.config.title} (${window}-pt avg)`,
        data: movingAverage(values, window),
        borderColor: "rgba(80, 80, 80, 0.5)",
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

  render() {
    return html`
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          ${([1, 2, 3] as const).map(
            (s) => html`
              <button
                class="size-btn"
                ?data-active=${(this.config.colSpan ?? 1) === s}
                @click=${() => this.#onResize(s)}
              >${s}col</button>
            `,
          )}
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
