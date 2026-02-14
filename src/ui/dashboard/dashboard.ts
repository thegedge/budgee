import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import Sortable from "sortablejs";
import { db } from "../../database/db";
import { aggregateByPeriod } from "../../database/aggregations";
import type { DashboardChart, Merchant, Tag, Transaction } from "../../database/types";
import type { ChartData } from "chart.js";
import "../charts/chartWrapper";
import "../charts/chartConfigurator";
import "./dashboardChartCard";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-dashboard": Dashboard;
  }
}

interface TagTotal {
  tag: Tag;
  total: number;
}

function computeTotals(transactions: Transaction[], tags: Tag[]): TagTotal[] {
  const totals = new Map<number, number>();
  for (const tx of transactions) {
    for (const tagId of tx.tagIds) {
      totals.set(tagId, (totals.get(tagId) ?? 0) + tx.amount);
    }
  }

  return tags
    .filter((t) => totals.has(t.id!))
    .map((tag) => ({ tag, total: totals.get(tag.id!)! }))
    .sort((a, b) => a.total - b.total);
}

@customElement("budgee-dashboard")
export class Dashboard extends LitElement {
  @state()
  private _transactions: Transaction[] = [];

  @state()
  private _tags: Tag[] = [];

  @state()
  private _merchants: Merchant[] = [];

  @state()
  private _charts: DashboardChart[] = [];

  @state()
  private _showConfigurator = false;

  private _sortable?: Sortable;

  static styles = css`
    :host {
      display: block;
    }
    .card {
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface, #fff);
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
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
    }
    tbody tr:nth-child(even) {
      background-color: var(--budgee-bg, #fafafa);
    }
    .amount-negative {
      color: var(--budgee-negative, #d09090);
    }
    .amount-positive {
      color: var(--budgee-positive, #7ec8a0);
    }
    .total-row {
      font-weight: bold;
    }
    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
      border: none;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    button:hover {
      background-color: var(--budgee-primary-hover, #5a9cbf);
    }
  `;

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
    this._transactions = await db.transactions.toArray();
    this._tags = await db.tags.toArray();
    this._merchants = await db.merchants.toArray();
    this._charts = (await db.dashboardCharts.toArray()).sort((a, b) => a.position - b.position);
  }

  #initSortable() {
    const grid = this.shadowRoot?.querySelector(".chart-grid") as HTMLElement | null;
    if (!grid || this._sortable) return;

    this._sortable = Sortable.create(grid, {
      animation: 150,
      onEnd: () => this.#persistOrder(),
    });
  }

  async #persistOrder() {
    const grid = this.shadowRoot?.querySelector(".chart-grid");
    if (!grid) return;

    const cards = grid.querySelectorAll("dashboard-chart-card");
    const updates: Promise<number>[] = [];
    cards.forEach((card, i) => {
      const id = Number(card.getAttribute("data-chart-id"));
      if (id) {
        updates.push(db.dashboardCharts.update(id, { position: i }));
      }
    });
    await Promise.all(updates);
    await this.#refresh();
  }

  async #onChartSaved(e: CustomEvent) {
    const detail = e.detail;
    await db.dashboardCharts.add({
      ...detail,
      position: this._charts.length,
    });
    this._showConfigurator = false;
    await this.#refresh();
  }

  async #onChartDeleted(e: CustomEvent) {
    await db.dashboardCharts.delete(e.detail.id);
    await this.#refresh();
  }

  get #monthlyChartData(): ChartData {
    const aggregated = aggregateByPeriod(this._transactions, "month");
    const entries = [...aggregated.entries()].sort(([a], [b]) => a.localeCompare(b));
    return {
      labels: entries.map(([key]) => key),
      datasets: [
        {
          label: "Monthly Spending",
          data: entries.map(([, val]) => val),
          backgroundColor: entries.map(([, val]) =>
            val < 0 ? "rgba(208, 144, 144, 0.5)" : "rgba(126, 200, 160, 0.5)",
          ),
          borderColor: entries.map(([, val]) => (val < 0 ? "#d09090" : "#7ec8a0")),
          borderWidth: 1,
        },
      ],
    };
  }

  render() {
    if (this._transactions.length === 0) {
      return html`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `;
    }

    const tagTotals = computeTotals(this._transactions, this._tags);
    const grandTotal = this._transactions.reduce((sum, t) => sum + t.amount, 0);
    const recentTransactions = [...this._transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 10);

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
                  .config=${chart}
                  .transactions=${this._transactions}
                  @chart-deleted=${this.#onChartDeleted}
                ></dashboard-chart-card>
              `,
              )}
            </div>
          `
          : nothing
      }

      <button @click=${() => {
        this._showConfigurator = !this._showConfigurator;
      }}>
        ${this._showConfigurator ? "Cancel" : "Add Chart"}
      </button>

      ${
        this._showConfigurator
          ? html`
            <chart-configurator
              .transactions=${this._transactions}
              .tags=${this._tags}
              .merchants=${this._merchants}
              @chart-saved=${this.#onChartSaved}
            ></chart-configurator>
          `
          : nothing
      }

      <div class="card">
        <h3>Spending by Tag</h3>
        <table>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${tagTotals.map(
              ({ tag, total }) => html`
              <tr>
                <td>${tag.name}</td>
                <td class=${total < 0 ? "amount-negative" : "amount-positive"}>
                  ${total.toFixed(2)}
                </td>
              </tr>
            `,
            )}
            <tr class="total-row">
              <td>Total</td>
              <td class=${grandTotal < 0 ? "amount-negative" : "amount-positive"}>
                ${grandTotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${
        recentTransactions.length > 0
          ? html`
            <div class="card">
              <h3>Recent Transactions</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentTransactions.map(
                    (t) => html`
                    <tr>
                      <td>${t.date}</td>
                      <td>${t.originalDescription}</td>
                      <td class=${t.amount < 0 ? "amount-negative" : "amount-positive"}>
                        ${t.amount.toFixed(2)}
                      </td>
                    </tr>
                  `,
                  )}
                </tbody>
              </table>
            </div>
          `
          : nothing
      }
    `;
  }
}
