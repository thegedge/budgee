import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { aggregateByPeriod, filterTransactions } from "../../database/aggregations";
import type { DashboardChart, Transaction } from "../../database/types";
import type { ChartData } from "chart.js";
import "../charts/chartWrapper";

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
  `;

  get #chartData(): ChartData {
    const filtered = filterTransactions(this.transactions, {
      tagId: this.config.tagId,
      merchantId: this.config.merchantId,
      startDate: this.config.startDate,
      endDate: this.config.endDate,
    });

    const aggregated = aggregateByPeriod(filtered, this.config.granularity);
    const entries = [...aggregated.entries()].sort(([a], [b]) => a.localeCompare(b));

    return {
      labels: entries.map(([key]) => key),
      datasets: [
        {
          label: this.config.title,
          data: entries.map(([, val]) => val),
          backgroundColor: "rgba(126, 184, 218, 0.5)",
          borderColor: "#7eb8da",
          borderWidth: 1,
        },
      ],
    };
  }

  #onEdit() {
    this.dispatchEvent(new CustomEvent("chart-edit", { detail: { chart: this.config } }));
  }

  #onDelete() {
    this.dispatchEvent(new CustomEvent("chart-deleted", { detail: { id: this.config.id } }));
  }

  render() {
    return html`
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
