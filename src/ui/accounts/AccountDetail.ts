import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardNetworkFromPrefix } from "../../cardNetwork";
import { aggregateByPeriod } from "../../charting/aggregateBy";
import { ACCOUNT_TYPES, type AccountType, accountTypeLabel } from "../../database/types";
import { Account } from "../../models/Account";
import { formatAmount } from "../../formatAmount";
import { Transaction } from "../../models/Transaction";
import { navigate } from "../navigate";
import { DataSubscriptionController } from "../DataSubscriptionController";
import { barChartData } from "../charts/barChartData";
import "../charts/ChartWrapper";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import "../shared/PaginatedTable";
import "../shared/SkeletonLoader";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "account-detail": AccountDetail;
  }
}

import { Temporal } from "@js-temporal/polyfill";
import "../shared/TimeRangePicker";
import { type TimeRange, type TimeRangeChangeEvent } from "../shared/TimeRangePicker";

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
  private _timeRange: TimeRange = null;

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
        display: flex;
        flex-direction: column;
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
      time-range-picker {
        margin-left: 0.75rem;
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

  constructor() {
    super();
    new DataSubscriptionController(this, [Account.subscribe, Transaction.subscribe], () =>
      this.#load(),
    );
  }

  async #load() {
    if (!this.accountId) return;
    this._account = await Account.get(this.accountId);
    this.#loadTransactions();
  }

  async #loadTransactions() {
    this._transactions = await Transaction.forAccount(this.accountId);
  }

  get #filteredTransactions(): Transaction[] | null {
    if (!this._transactions) return null;
    if (this._timeRange === null) return this._transactions;
    const cutoffStr = Temporal.Now.plainDateISO().subtract(this._timeRange).toString();
    return this._transactions.filter((t) => t.date >= cutoffStr);
  }

  get #allMonthlyTotals(): [string, number][] {
    return [...aggregateByPeriod(this._transactions ?? [], "month").entries()].sort(([a], [b]) =>
      a.localeCompare(b),
    );
  }

  get #monthlyTotals(): [string, number][] {
    return [...aggregateByPeriod(this.#filteredTransactions ?? [], "month").entries()].sort(
      ([a], [b]) => a.localeCompare(b),
    );
  }

  #onTimeRangeChange(e: TimeRangeChangeEvent) {
    this._timeRange = e.timeRange;
  }

  #navigateBack() {
    navigate("/accounts");
  }

  #navigateToTransaction(id: string) {
    navigate(`/transactions/${id}`);
  }

  async #saveName(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    const input = e.target as HTMLInputElement;
    await this.withBusy(async () => {
      await Account.update(this.accountId, { name: input.value });
      this._editingName = false;
      await this.#load();
    });
  }

  async #onTypeChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    await this.withBusy(async () => {
      await Account.update(this.accountId, {
        type: (value || undefined) as AccountType | undefined,
      });
      await this.#load();
    });
  }

  #renderLoadingState() {
    return html`
      <div class="top-row">
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
      </div>
      <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
    `;
  }

  #renderTransactionData(filtered: Transaction[]) {
    return html`
      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Activity
            <time-range-picker .value=${this._timeRange} @time-range-change=${this.#onTimeRangeChange}></time-range-picker>
          </h3>
          ${
            this.#monthlyTotals.length > 0
              ? html`<chart-wrapper chartType="bar" .data=${barChartData({ allEntries: this.#allMonthlyTotals, displayEntries: this.#monthlyTotals, label: this._account?.name ?? "Account" })}></chart-wrapper>`
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
                ([month, total]) => html`
                <tr>
                  <td>${month}</td>
                  <td class=${total < 0 ? "amount-negative" : "amount-positive"}>
                    ${formatAmount(total)}
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
          .items=${filtered}
          .defaultPageSize=${25}
          storageKey="account-transactions"
          .renderRow=${(t: Transaction) => html`
            <tr @click=${() => this.#navigateToTransaction(t.id)}>
              <td>${t.date}</td>
              <td>${t.description}</td>
              <td class=${t.amount < 0 ? "amount-negative" : "amount-positive"}>
                ${formatAmount(t.amount)}
              </td>
            </tr>
          `}
        >
          <thead slot="header">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
        </paginated-table>
      </div>
    `;
  }

  render() {
    if (!this._account) {
      return html`
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
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
          ${cardNetworkFromPrefix(this._account.name) ? html` (${cardNetworkFromPrefix(this._account.name)})` : nothing}
        </div>
      </div>

      ${loading ? this.#renderLoadingState() : this.#renderTransactionData(filtered)}
    `;
  }
}
