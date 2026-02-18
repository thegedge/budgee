import type { ChartData } from "chart.js";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Merchants } from "../../data/merchants";
import { movingMedian } from "../../data/movingAverage";
import { movingWindowSize } from "../../data/movingWindowSize";
import { Transactions } from "../../data/transactions";
import type { Merchant, Transaction } from "../../database/types";
import { debounce } from "../../debounce";
import "../charts/chartWrapper";
import { cssVar } from "../cssVar";
import "../shared/paginatedTable";
import type { PageChangeDetail } from "../shared/paginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "merchant-detail": MerchantDetail;
  }
}

type TimeRange = 6 | 12 | 24 | 0;

interface MonthlySpend {
  month: string;
  total: number;
}

@customElement("merchant-detail")
export class MerchantDetail extends LitElement {
  @property({ type: String })
  merchantId = "";

  @state()
  private _merchant?: Merchant;

  @state()
  private _transactions: Transaction[] = [];

  @state()
  private _timeRange: TimeRange = 12;

  @state()
  private _currentPage = 1;

  @state()
  private _pageSize = 25;

  static styles = [
    tableStyles,
    css`
      :host {
        display: block;
      }
      .back-link {
        color: var(--budgee-primary);
        cursor: pointer;
        text-decoration: underline;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: inline-block;
      }
      .header {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .header h2 {
        margin-top: 0;
        margin-bottom: 0.25rem;
      }
      .meta {
        color: var(--budgee-text-muted);
        font-size: 0.9rem;
      }
      .top-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
      }
      .section h3 {
        margin-top: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .section-transactions {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        margin-bottom: 1rem;
      }
      .section-transactions h3 {
        margin-top: 0;
      }
      select {
        padding: 2px 6px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        font-size: 0.875rem;
      }
      tr {
        cursor: pointer;
      }
      tr:hover {
        background-color: var(--budgee-bg);
      }
    `,
  ];

  #subscriptions: { unsubscribe: () => void }[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.#load();
    const debouncedLoad = debounce(() => this.#load(), 300);
    Promise.all([Merchants.subscribe(debouncedLoad), Transactions.subscribe(debouncedLoad)]).then(
      (subs) => {
        this.#subscriptions = subs;
      },
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const sub of this.#subscriptions) sub.unsubscribe();
    this.#subscriptions = [];
  }

  async #load() {
    if (!this.merchantId) return;
    const [merchant, transactions] = await Promise.all([
      Merchants.get(this.merchantId),
      Transactions.forMerchant(this.merchantId),
    ]);
    this._merchant = merchant;
    this._transactions = transactions;
  }

  get #filteredTransactions(): Transaction[] {
    if (this._timeRange === 0) return this._transactions;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - this._timeRange);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    return this._transactions.filter((t) => t.date >= cutoffStr);
  }

  get #allMonthlySpend(): MonthlySpend[] {
    const byMonth = new Map<string, number>();
    for (const tx of this._transactions) {
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }
    return [...byMonth.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total }));
  }

  get #monthlySpend(): MonthlySpend[] {
    const byMonth = new Map<string, number>();
    for (const tx of this.#filteredTransactions) {
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }
    return [...byMonth.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total }));
  }

  get #chartData(): ChartData {
    const allEntries = this.#allMonthlySpend;
    const allValues = allEntries.map((e) => e.total);
    const window = movingWindowSize(allValues.length);
    const allMedian = movingMedian(allValues, window);

    const displayEntries = this.#monthlySpend;
    const firstDisplayMonth = displayEntries[0]?.month;
    const sliceIndex = firstDisplayMonth
      ? allEntries.findIndex((e) => e.month === firstDisplayMonth)
      : 0;
    const displayValues = displayEntries.map((e) => e.total);
    const displayMedian = allMedian.slice(sliceIndex, sliceIndex + displayEntries.length);

    return {
      labels: displayEntries.map((e) => e.month),
      datasets: [
        {
          label: this._merchant?.name ?? "Merchant",
          data: displayValues,
          backgroundColor: cssVar("--budgee-primary", 0.5),
          borderColor: cssVar("--budgee-primary"),
          borderWidth: 1,
        },
        ...(displayValues.length >= 2
          ? [
              {
                type: "line" as const,
                label: `Moving Avg (${window}-mo)`,
                data: displayMedian,
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

  #onTimeRangeChange(e: Event) {
    this._timeRange = Number((e.target as HTMLSelectElement).value) as TimeRange;
    this._currentPage = 1;
  }

  #onPageChange(e: CustomEvent<PageChangeDetail>) {
    this._currentPage = e.detail.page;
    this._pageSize = e.detail.pageSize;
  }

  #navigateBack() {
    window.history.pushState({}, "", "/merchants");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  #navigateToTransaction(id: string) {
    window.history.pushState({}, "", `/transactions/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  render() {
    if (!this._merchant) {
      return html`
        <p>Loading…</p>
      `;
    }

    const filtered = this.#filteredTransactions;
    const start = (this._currentPage - 1) * this._pageSize;
    const pageTransactions = filtered.slice(start, start + this._pageSize);
    const totalSpend = filtered.reduce((sum, t) => sum + t.amount, 0);

    return html`
      <span class="back-link" @click=${this.#navigateBack}>&larr; Back to merchants</span>

      <div class="header">
        <h2>${this._merchant.name}</h2>
        <div class="meta">
          ${filtered.length} transactions &middot;
          <span class=${totalSpend < 0 ? "amount-negative" : "amount-positive"}>
            ${totalSpend.toFixed(2)} total
          </span>
        </div>
      </div>

      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Spend
            <select @change=${this.#onTimeRangeChange}>
              <option value="6" ?selected=${this._timeRange === 6}>6 months</option>
              <option value="12" ?selected=${this._timeRange === 12}>12 months</option>
              <option value="24" ?selected=${this._timeRange === 24}>24 months</option>
              <option value="0" ?selected=${this._timeRange === 0}>All time</option>
            </select>
          </h3>
          ${
            this.#monthlySpend.length > 0
              ? html`<chart-wrapper chartType="bar" .data=${this.#chartData}></chart-wrapper>`
              : html`
                  <p>No transactions in this period.</p>
                `
          }
        </div>

        <div class="section">
          <h3>Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${this.#monthlySpend.map(
                ({ month, total }) => html`
                <tr>
                  <td>${month}</td>
                  <td class=${total < 0 ? "amount-negative" : "amount-positive"}>
                    ${total.toFixed(2)}
                  </td>
                </tr>
              `,
              )}
              ${
                this.#monthlySpend.length === 0
                  ? html`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `
                  : nothing
              }
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-transactions">
        <h3>Transactions</h3>
        <paginated-table
          .totalItems=${filtered.length}
          .defaultPageSize=${25}
          storageKey="merchant-transactions"
          @page-change=${this.#onPageChange}
        >
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${pageTransactions.map(
                (t) => html`
                <tr @click=${() => this.#navigateToTransaction(t.id)}>
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
        </paginated-table>
      </div>
    `;
  }
}
