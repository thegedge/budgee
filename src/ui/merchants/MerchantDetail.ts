import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Merchants } from "../../data/Merchants";
import { Transactions } from "../../data/Transactions";
import type { Merchant, Transaction } from "../../database/types";
import { debounce } from "../../debounce";
import { barChartData } from "../charts/barChartData";
import "../charts/ChartWrapper";
import "../shared/PaginatedTable";
import type { PageChangeDetail } from "../shared/PaginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "merchant-detail": MerchantDetail;
  }
}

type TimeRange = 6 | 12 | 24 | 0;

@customElement("merchant-detail")
export class MerchantDetail extends LitElement {
  @property({ type: String })
  merchantId = "";

  @state()
  private _merchant?: Merchant;

  @state()
  private _transactions: Transaction[] = [];

  @state()
  private _timeRange: TimeRange = 0;

  @state()
  private _editingName = false;

  @state()
  private _draftName = "";

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
      select {
        padding: 2px 6px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        font-size: 0.875rem;
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

  get #allMonthlySpend(): [string, number][] {
    const byMonth = new Map<string, number>();
    for (const tx of this._transactions) {
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }
    return [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b));
  }

  get #monthlySpend(): [string, number][] {
    const byMonth = new Map<string, number>();
    for (const tx of this.#filteredTransactions) {
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }
    return [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b));
  }

  #onTimeRangeChange(e: Event) {
    this._timeRange = Number((e.target as HTMLSelectElement).value) as TimeRange;
    this._currentPage = 1;
  }

  #onPageChange(e: CustomEvent<PageChangeDetail>) {
    this._currentPage = e.detail.page;
    this._pageSize = e.detail.pageSize;
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
        Merchants.update(this._merchant.id, { name: trimmed });
      }
      this._editingName = false;
    } else if (e.key === "Escape") {
      this._editingName = false;
    }
  }

  #navigateBack() {
    window.history.pushState({}, "", "/Merchants");
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
          <select @change=${this.#onTimeRangeChange}>
            <option value="6" ?selected=${this._timeRange === 6}>6 months</option>
            <option value="12" ?selected=${this._timeRange === 12}>12 months</option>
            <option value="24" ?selected=${this._timeRange === 24}>24 months</option>
            <option value="0" ?selected=${this._timeRange === 0}>All time</option>
          </select>
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
