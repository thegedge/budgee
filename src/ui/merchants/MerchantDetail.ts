import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { aggregateByPeriod } from "../../charting/aggregateBy";
import { Merchant } from "../../models/Merchant";
import { Transaction } from "../../models/Transaction";
import { navigate } from "../navigate";
import { DataSubscriptionController } from "../DataSubscriptionController";
import { barChartData } from "../charts/barChartData";
import "../charts/ChartWrapper";
import "../shared/PaginatedTable";
import "../shared/SkeletonLoader";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "merchant-detail": MerchantDetail;
  }
}

import { Temporal } from "@js-temporal/polyfill";
import "../shared/TimeRangePicker";
import { type TimeRange, type TimeRangeChangeEvent } from "../shared/TimeRangePicker";

@customElement("merchant-detail")
export class MerchantDetail extends LitElement {
  @property({ type: String })
  merchantId = "";

  @state()
  private _merchant?: Merchant;

  @state()
  private _transactions: Transaction[] = [];

  @state()
  private _timeRange: TimeRange = null;

  @state()
  private _editingName = false;

  @state()
  private _draftName = "";


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
        margin-bottom: 1rem;
      }
      .header h2 {
        margin-top: 0;
        margin-bottom: 0;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }
      .section chart-wrapper {
        flex: 1;
        min-height: 200px;
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
      .edit-name-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.75em;
        opacity: 0.5;
        padding: 0 0.25em;
      }
      .edit-name-btn:hover {
        opacity: 1;
      }
      .name-input {
        font: inherit;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        padding: 0 0.25em;
        width: 100%;
        box-sizing: border-box;
      }
      tr {
        cursor: pointer;
      }
      tr:hover {
        background-color: var(--budgee-bg);
      }
    `,
  ];

  constructor() {
    super();
    new DataSubscriptionController(
      this,
      [Merchant.subscribe, Transaction.subscribe],
      () => this.#load(),
    );
  }

  async #load() {
    if (!this.merchantId) return;
    const [merchant, transactions] = await Promise.all([
      Merchant.get(this.merchantId),
      Transaction.forMerchant(this.merchantId),
    ]);
    this._merchant = merchant;
    this._transactions = transactions;
  }

  get #filteredTransactions(): Transaction[] {
    if (this._timeRange === null) return this._transactions;
    const cutoffStr = Temporal.Now.plainDateISO().subtract(this._timeRange).toString();
    return this._transactions.filter((t) => t.date >= cutoffStr);
  }

  get #allMonthlySpend(): [string, number][] {
    const byMonth = new Map<string, number>();
    for (const tx of this._transactions) {
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }
    return [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b));
  }

  get #monthlySpend(): [string, number][] {
    return [...aggregateByPeriod(this.#filteredTransactions, "month").entries()].sort(([a], [b]) =>
      a.localeCompare(b),
    );
  }

  #onTimeRangeChange(e: TimeRangeChangeEvent) {
    this._timeRange = e.timeRange;
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("merchantId")) {
      this.#load();
    }
    if (changed.has("_editingName") && this._editingName) {
      const input = this.shadowRoot?.querySelector<HTMLInputElement>(".name-input");
      input?.focus();
      input?.select();
    }
  }

  #startEditingName() {
    this._editingName = true;
    this._draftName = this._merchant?.name ?? "";
  }

  #handleNameKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const trimmed = this._draftName.trim();
      if (trimmed && this._merchant) {
        Merchant.update(this._merchant.id, { name: trimmed });
      }
      this._editingName = false;
    } else if (e.key === "Escape") {
      this._editingName = false;
    }
  }

  #navigateBack() {
    navigate("/merchants");
  }

  #navigateToTransaction(id: string) {
    navigate(`/transactions/${id}`);
  }

  render() {
    if (!this._merchant) {
      return html`
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;
    }

    const filtered = this.#filteredTransactions;
    return html`
      <span class="back-link" @click=${this.#navigateBack}>&larr; Back to merchants</span>

      <div class="header">
        <h2>
          ${
            this._editingName
              ? html`<input
                class="name-input"
                .value=${this._draftName}
                @input=${(e: InputEvent) => {
                  this._draftName = (e.target as HTMLInputElement).value;
                }}
                @keydown=${this.#handleNameKeydown}
              />`
              : html`${this._merchant.name} <button class="edit-name-btn" @click=${this.#startEditingName}>✎</button>`
          }
        </h2>
      </div>

      <div class="section">
        <h3>
          Monthly Spend
          <time-range-picker .value=${this._timeRange} @time-range-change=${this.#onTimeRangeChange}></time-range-picker>
        </h3>
        ${
          this.#monthlySpend.length > 0
            ? html`<chart-wrapper chartType="bar" .data=${barChartData({ allEntries: this.#allMonthlySpend, displayEntries: this.#monthlySpend, label: this._merchant?.name ?? "Merchant" })}></chart-wrapper>`
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
          storageKey="merchant-transactions"
          .renderRow=${(t: Transaction) => html`
            <tr @click=${() => this.#navigateToTransaction(t.id)}>
              <td>${t.date}</td>
              <td>${t.description}</td>
              <td class=${t.amount < 0 ? "amount-negative" : "amount-positive"}>
                ${t.amount.toFixed(2)}
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
}
