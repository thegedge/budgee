import type { ChartData } from "chart.js";
import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import Sortable from "sortablejs";
import { DashboardCharts } from "../../data/dashboardCharts";
import { Merchants } from "../../data/merchants";
import { movingAverage, movingAverageWindow } from "../../data/movingAverage";
import { Tags } from "../../data/tags";
import { Transactions } from "../../data/transactions";
import { aggregateByPeriod } from "../../database/aggregations";
import type { DashboardChart, Merchant, Tag, Transaction } from "../../database/types";
import "../charts/chartConfigurator";
import "../charts/chartWrapper";
import { cssVar } from "../cssVar";
import "../shared/modal";
import "../shared/paginatedTable";
import type { PageChangeDetail } from "../shared/paginatedTable";
import { tableStyles } from "../tableStyles";
import "./dashboardChartCard";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-dashboard": Dashboard;
  }
}

@customElement("budgee-dashboard")
export class Dashboard extends LitElement {
  @state()
  private _transactions: Transaction[] | null = null;

  @state()
  private _tags: Tag[] = [];

  @state()
  private _merchants: Merchant[] = [];

  @state()
  private _charts: DashboardChart[] = [];

  @state()
  private _showConfigurator = false;

  @state()
  private _editingChart?: DashboardChart;

  @state()
  private _recentPage = 1;

  @state()
  private _recentPageSize = 10;

  private _sortable?: Sortable;

  static styles = [
    tableStyles,
    css`
      :host {
        display: block;
      }
      .card {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .card h3 {
        margin-top: 0;
      }
      .chart-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      @media (min-width: 700px) {
        .chart-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (min-width: 1200px) {
        .chart-grid {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._sortable?.destroy();
  }

  updated() {
    this.#initSortable();
  }

  async #refresh() {
    this._transactions = await Transactions.all();
    this._tags = await Tags.all();
    this._merchants = await Merchants.all();
    this._charts = await DashboardCharts.all();
  }

  #initSortable() {
    const grid = this.shadowRoot?.querySelector(".chart-grid") as HTMLElement | null;
    if (!grid) {
      this._sortable?.destroy();
      this._sortable = undefined;
      return;
    }

    if (this._sortable?.el === grid) return;

    this._sortable?.destroy();
    this._sortable = Sortable.create(grid, {
      animation: 150,
      onEnd: () => this.#persistOrder(),
    });
  }

  async #persistOrder() {
    const grid = this.shadowRoot?.querySelector(".chart-grid");
    if (!grid) return;

    const cards = grid.querySelectorAll("dashboard-chart-card");
    const ids: number[] = [];
    cards.forEach((card) => {
      const id = Number(card.getAttribute("data-chart-id"));
      if (id) ids.push(id);
    });
    await DashboardCharts.reorder(ids);
    await this.#refresh();
  }

  async #onChartSaved(e: CustomEvent) {
    const detail = e.detail;
    if (detail.id) {
      await DashboardCharts.update(detail.id, {
        title: detail.title,
        chartType: detail.chartType,
        granularity: detail.granularity,
        startDate: detail.startDate,
        endDate: detail.endDate,
        tagId: detail.tagId,
        merchantId: detail.merchantId,
        colSpan: detail.colSpan,
      });
    } else {
      await DashboardCharts.create({
        ...detail,
        position: this._charts.length,
      });
    }
    this._showConfigurator = false;
    this._editingChart = undefined;
    await this.#refresh();
  }

  #onChartEdit(e: CustomEvent) {
    this._editingChart = e.detail.chart;
    this._showConfigurator = true;
  }

  async #onChartResized(e: CustomEvent) {
    await DashboardCharts.update(e.detail.id, { colSpan: e.detail.colSpan });
    await this.#refresh();
  }

  async #onChartDeleted(e: CustomEvent) {
    await DashboardCharts.remove(e.detail.id);
    await this.#refresh();
  }

  #onRecentPageChange(e: CustomEvent<PageChangeDetail>) {
    this._recentPage = e.detail.page;
    this._recentPageSize = e.detail.pageSize;
  }

  #createRuleFrom(transaction: Transaction) {
    const params = new URLSearchParams({ description: transaction.originalDescription });
    window.history.pushState({}, "", `/rules?${params}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  get #monthlyChartData(): ChartData {
    const aggregated = aggregateByPeriod(this._transactions!, "month");
    const entries = [...aggregated.entries()].sort(([a], [b]) => a.localeCompare(b));
    const values = entries.map(([, val]) => val);
    const window = movingAverageWindow(values.length);
    return {
      labels: entries.map(([key]) => key),
      datasets: [
        {
          label: "Monthly Spending",
          data: values,
          backgroundColor: values.map((val) =>
            val < 0 ? cssVar("--budgee-negative", 0.5) : cssVar("--budgee-positive", 0.5),
          ),
          borderColor: values.map((val) =>
            val < 0 ? cssVar("--budgee-negative") : cssVar("--budgee-positive"),
          ),
          borderWidth: 1,
        },
        ...(values.length >= 2
          ? [
              {
                type: "line" as const,
                label: `Moving Avg (${window}-mo)`,
                data: movingAverage(values, window),
                borderColor: cssVar("--budgee-text-muted", 0.5),
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
                tension: 0.3,
              } as ChartData["datasets"][number],
            ]
          : []),
      ],
    };
  }

  render() {
    if (this._transactions === null) {
      return html`
        <h3>Dashboard</h3>
        <p>Loading…</p>
      `;
    }

    if (this._transactions.length === 0) {
      return html`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `;
    }

    const sortedTransactions = [...this._transactions].sort((a, b) => b.date.localeCompare(a.date));
    const recentStart = (this._recentPage - 1) * this._recentPageSize;
    const recentTransactions = sortedTransactions.slice(
      recentStart,
      recentStart + this._recentPageSize,
    );

    return html`
      <h3>Dashboard</h3>

      <div class="card">
        <h3>Monthly Overview</h3>
        <chart-wrapper
          chartType="bar"
          .data=${this.#monthlyChartData}
        ></chart-wrapper>
      </div>

      ${
        this._charts.length > 0
          ? html`
            <div class="chart-grid">
              ${this._charts.map(
                (chart) => html`
                <dashboard-chart-card
                  data-chart-id=${chart.id!}
                  style="grid-column: span ${chart.colSpan ?? 1}"
                  .config=${chart}
                  .transactions=${this._transactions}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  @chart-edit=${this.#onChartEdit}
                  @chart-resized=${this.#onChartResized}
                  @chart-deleted=${this.#onChartDeleted}
                ></dashboard-chart-card>
              `,
              )}
            </div>
          `
          : nothing
      }

      <button @click=${() => {
        this._showConfigurator = true;
        this._editingChart = undefined;
      }}>
        Add Chart
      </button>

      ${
        this._showConfigurator
          ? html`
            <budgee-modal
              heading=${this._editingChart ? "Edit Chart" : "Add Chart"}
              @modal-close=${() => {
                this._showConfigurator = false;
                this._editingChart = undefined;
              }}
            >
              <chart-configurator
                .transactions=${this._transactions}
                .tags=${this._tags}
                .merchants=${this._merchants}
                .editingChart=${this._editingChart}
                @chart-saved=${this.#onChartSaved}
              ></chart-configurator>
            </budgee-modal>
          `
          : nothing
      }

      ${
        sortedTransactions.length > 0
          ? html`
            <div class="card">
              <h3>Recent Transactions</h3>
              <paginated-table
                .totalItems=${sortedTransactions.length}
                .defaultPageSize=${10}
                storageKey="dashboard-recent"
                @page-change=${this.#onRecentPageChange}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th class="col-amount">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${recentTransactions.map(
                      (t) => html`
                      <tr class="clickable-row" @click=${() => this.#createRuleFrom(t)}>
                        <td>${t.date}</td>
                        <td>${t.originalDescription}</td>
                        <td class="col-amount ${t.amount < 0 ? "amount-negative" : "amount-positive"}">
                          ${t.amount.toFixed(2)}
                        </td>
                      </tr>
                    `,
                    )}
                  </tbody>
                </table>
              </paginated-table>
            </div>
          `
          : nothing
      }
    `;
  }
}
