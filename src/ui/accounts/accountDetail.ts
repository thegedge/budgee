import type { ChartData } from "chart.js";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Accounts } from "../../data/accounts";
import { movingAverage, movingAverageWindow } from "../../data/movingAverage";
import { Transactions } from "../../data/transactions";
import {
  ACCOUNT_TYPES,
  type Account,
  type AccountType,
  type Transaction,
  accountTypeLabel,
} from "../../database/types";
import "../charts/chartWrapper";
import { cssVar } from "../cssVar";
import { BusyMixin, busyStyles } from "../shared/busyMixin";
import "../shared/paginatedTable";
import type { PageChangeDetail } from "../shared/paginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "account-detail": AccountDetail;
  }
}

type TimeRange = 6 | 12 | 24 | 0;

interface MonthlyTotal {
  month: string;
  total: number;
}

@customElement("account-detail")
export class AccountDetail extends BusyMixin(LitElement) {
  @property({ type: String })
  accountId = "";

  @state()
  private _account?: Account;

  @state()
  private _transactions: Transaction[] | null = null;

  @state()
  private _editingName = false;

  @state()
  private _timeRange: TimeRange = 12;

  @state()
  private _currentPage = 1;

  @state()
  private _pageSize = 25;

  static styles = [
    busyStyles,
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
      .editable {
        cursor: pointer;
        border-bottom: 1px dashed var(--budgee-text-muted);
      }
      .editable:hover {
        color: var(--budgee-primary);
      }
      .edit-input {
        font-size: inherit;
        font-family: inherit;
        padding: 2px 4px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        color: var(--budgee-text);
      }
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .summary-card {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        text-align: center;
      }
      .summary-card .label {
        color: var(--budgee-text-muted);
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
      }
      .summary-card .value {
        font-size: 1.25rem;
        font-weight: bold;
        font-variant-numeric: tabular-nums;
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
      .loading {
        color: var(--budgee-text-muted);
        font-style: italic;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.#load();
  }

  async #load() {
    if (!this.accountId) return;
    this._account = await Accounts.get(this.accountId);
    this.#loadTransactions();
  }

  async #loadTransactions() {
    this._transactions = await Transactions.forAccount(this.accountId);
  }

  get #filteredTransactions(): Transaction[] | null {
    if (!this._transactions) return null;
    if (this._timeRange === 0) return this._transactions;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - this._timeRange);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    return this._transactions.filter((t) => t.date >= cutoffStr);
  }

  get #monthlyTotals(): MonthlyTotal[] {
    const byMonth = new Map<string, number>();
    for (const tx of this.#filteredTransactions ?? []) {
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }
    return [...byMonth.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total }));
  }

  get #chartData(): ChartData {
    const entries = this.#monthlyTotals;
    const values = entries.map((e) => e.total);
    const window = movingAverageWindow(values.length);
    return {
      labels: entries.map((e) => e.month),
      datasets: [
        {
          label: this._account?.name ?? "Account",
          data: values,
          backgroundColor: cssVar("--budgee-primary", 0.5),
          borderColor: cssVar("--budgee-primary"),
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

  #onTimeRangeChange(e: Event) {
    this._timeRange = Number((e.target as HTMLSelectElement).value) as TimeRange;
    this._currentPage = 1;
  }

  #onPageChange(e: CustomEvent<PageChangeDetail>) {
    this._currentPage = e.detail.page;
    this._pageSize = e.detail.pageSize;
  }

  #navigateBack() {
    window.history.pushState({}, "", "/accounts");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  #navigateToTransaction(id: string) {
    window.history.pushState({}, "", `/transactions/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  async #saveName(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    const input = e.target as HTMLInputElement;
    await this.withBusy(async () => {
      await Accounts.update(this.accountId, { name: input.value });
      this._editingName = false;
      await this.#load();
    });
  }

  async #onTypeChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    await this.withBusy(async () => {
      await Accounts.update(this.accountId, {
        type: (value || undefined) as AccountType | undefined,
      });
      await this.#load();
    });
  }

  #renderLoadingState() {
    return html`
      <div class="summary-grid">
        ${[0, 1, 2, 3].map(
          () => html`
            <div class="summary-card">
              <div class="label loading">Loading…</div>
            </div>
          `,
        )}
      </div>
      <div class="top-row">
        <div class="section"><p class="loading">Loading chart…</p></div>
        <div class="section"><p class="loading">Loading summary…</p></div>
      </div>
      <div class="section-transactions"><p class="loading">Loading transactions…</p></div>
    `;
  }

  #renderTransactionData(filtered: Transaction[]) {
    const start = (this._currentPage - 1) * this._pageSize;
    const pageTransactions = filtered.slice(start, start + this._pageSize);
    const balance = filtered.reduce((sum, t) => sum + t.amount, 0);
    const income = filtered.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = filtered.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);

    return html`
      <div class="summary-grid">
        <div class="summary-card">
          <div class="label">Balance</div>
          <div class="value ${balance < 0 ? "amount-negative" : "amount-positive"}">
            ${balance.toFixed(2)}
          </div>
        </div>
        <div class="summary-card">
          <div class="label">Transactions</div>
          <div class="value">${filtered.length}</div>
        </div>
        <div class="summary-card">
          <div class="label">Income</div>
          <div class="value amount-positive">${income.toFixed(2)}</div>
        </div>
        <div class="summary-card">
          <div class="label">Expenses</div>
          <div class="value amount-negative">${expenses.toFixed(2)}</div>
        </div>
      </div>

      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Activity
            <select @change=${this.#onTimeRangeChange}>
              <option value="6" ?selected=${this._timeRange === 6}>6 months</option>
              <option value="12" ?selected=${this._timeRange === 12}>12 months</option>
              <option value="24" ?selected=${this._timeRange === 24}>24 months</option>
              <option value="0" ?selected=${this._timeRange === 0}>All time</option>
            </select>
          </h3>
          ${
            this.#monthlyTotals.length > 0
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
              ${this.#monthlyTotals.map(
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
                this.#monthlyTotals.length === 0
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
          storageKey="account-transactions"
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
                <tr @click=${() => this.#navigateToTransaction(t._id!)}>
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

  render() {
    if (!this._account) {
      return html`
        <p>Loading…</p>
      `;
    }

    const filtered = this.#filteredTransactions;
    const loading = filtered === null;

    return html`
      <span class="back-link" @click=${this.#navigateBack}>&larr; Back to accounts</span>

      <div class="header">
        <h2>
          ${
            this._editingName
              ? html`<input
                class="edit-input"
                .value=${this._account.name}
                @keydown=${this.#saveName}
                @blur=${() => (this._editingName = false)}
              />`
              : html`<span class="editable" @click=${() => (this._editingName = true)}
                >${this._account.name}</span
              >`
          }
        </h2>
        <div class="meta">
          Type:
          <select @change=${this.#onTypeChange}>
            <option value="" ?selected=${!this._account.type}>Not set</option>
            ${ACCOUNT_TYPES.map(
              (t) =>
                html`<option value=${t} ?selected=${this._account!.type === t}>${accountTypeLabel(t)}</option>`,
            )}
          </select>
        </div>
      </div>

      ${loading ? this.#renderLoadingState() : this.#renderTransactionData(filtered)}
    `;
  }
}
