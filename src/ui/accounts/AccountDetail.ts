import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { type PeriodGranularity, aggregateByPeriod } from "../../charting/aggregateBy";
import { ACCOUNT_TYPES, type AccountType, accountTypeLabel } from "../../database/types";
import { Account } from "../../models/Account";
import { formatAmount } from "../../formatAmount";
import { Transaction } from "../../models/Transaction";
import { navigate } from "../navigate";
import { DataSubscriptionController } from "../DataSubscriptionController";
import { barChartData } from "../charts/barChartData";
import "../charts/ChartWrapper";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import "../shared/AccountName";
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
      .section-chart {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }
      .section-chart h3 {
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
      chart-wrapper {
        max-height: 350px;
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

  get #displayName(): string {
    return this._account?.alias ?? this._account?.name ?? "Account";
  }

  get #filteredTransactions(): Transaction[] | null {
    if (!this._transactions) return null;
    if (this._timeRange === null) return this._transactions;
    const cutoffStr = Temporal.Now.plainDateISO().subtract(this._timeRange).toString();
    return this._transactions.filter((t) => t.date >= cutoffStr);
  }

  get #granularity(): PeriodGranularity {
    if (this._timeRange === null) return "month";
    const relativeTo = Temporal.Now.plainDateISO();
    const months = this._timeRange.total({ unit: "months", relativeTo });
    if (months <= 1) return "day";
    if (months <= 12) return "week";
    return "month";
  }

  get #allPeriodTotals(): [string, number][] {
    const debits = (this._transactions ?? []).filter((t) => t.amount < 0);
    return [...aggregateByPeriod(debits, this.#granularity).entries()].sort(([a], [b]) =>
      a.localeCompare(b),
    );
  }

  get #periodTotals(): [string, number][] {
    const debits = (this.#filteredTransactions ?? []).filter((t) => t.amount < 0);
    return [...aggregateByPeriod(debits, this.#granularity).entries()].sort(([a], [b]) =>
      a.localeCompare(b),
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

  async #startEditing() {
    this._editingName = true;
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLInputElement>(".edit-input")?.focus();
  }

  #onNameBlur() {
    if (this.busy) return;
    this._editingName = false;
  }

  async #saveName(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this._editingName = false;
      return;
    }
    if (e.key !== "Enter") return;
    const input = e.target as HTMLInputElement;
    const name = input.value.trim();
    if (!name) return;
    await this.withBusy(async () => {
      await Account.update(this.accountId, { alias: name });
      this._account = await Account.get(this.accountId);
      this._editingName = false;
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
      <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
      <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
    `;
  }

  #renderTransactionData(filtered: Transaction[]) {
    return html`
      <div class="section-chart">
          <h3>
            Activity
            <time-range-picker .value=${this._timeRange} @time-range-change=${this.#onTimeRangeChange}></time-range-picker>
          </h3>
          ${
            this.#periodTotals.length > 0
              ? html`<chart-wrapper chartType="bar" .data=${barChartData({ allEntries: this.#allPeriodTotals, displayEntries: this.#periodTotals, label: this.#displayName })} .options=${{ plugins: { legend: { display: false } } }}></chart-wrapper>`
              : html`
                  <p>No transactions in this period.</p>
                `
          }
        </div>

      <div class="section-transactions">
        <h3>Transactions</h3>
        <paginated-table
          .items=${filtered}
          .defaultPageSize=${25}
          storageKey="account-transactions"
          .columns=${["Date", "Description", "Amount"]}
          .renderRow=${(t: Transaction) => html`
            <tr @click=${() => this.#navigateToTransaction(t.id)}>
              <td>${t.date}</td>
              <td>${t.description}</td>
              <td class=${t.amount < 0 ? "amount-negative" : "amount-positive"}>
                ${formatAmount(t.amount)}
              </td>
            </tr>
          `}
        ></paginated-table>
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
                .value=${this.#displayName}
                @keydown=${this.#saveName}
                @blur=${this.#onNameBlur}
              />`
              : html`<span class="editable" @click=${this.#startEditing}><account-name .name=${this._account.name} .alias=${this._account.alias}></account-name></span>`
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
