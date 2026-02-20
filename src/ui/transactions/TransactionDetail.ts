import type { ChartData } from "chart.js";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Merchants } from "../../data/Merchants";
import { movingMedian } from "../../data/movingAverage";
import { movingWindowSize } from "../../data/movingWindowSize";
import { Tags } from "../../data/Tags";
import { Transactions } from "../../data/Transactions";
import type { Merchant, Tag, Transaction } from "../../database/types";
import { debounce } from "../../debounce";
import "../charts/ChartWrapper";
import { cssVar } from "../cssVar";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import { tableStyles } from "../tableStyles";
import "../tags/TagAutocomplete";

declare global {
  interface HTMLElementTagNameMap {
    "transaction-detail": TransactionDetail;
  }
}

interface MonthlySpend {
  month: string;
  total: number;
}

@customElement("transaction-detail")
export class TransactionDetail extends BusyMixin(LitElement) {
  @property({ type: String })
  transactionId = "";

  @state()
  private _transaction?: Transaction;

  @state()
  private _tags: Tag[] = [];

  @state()
  private _merchant?: Merchant;

  @state()
  private _relatedTransactions: Transaction[] = [];

  @state()
  private _monthlySpend: MonthlySpend[] = [];

  static styles = [
    busyStyles,
    tableStyles,
    css`
      :host {
        display: block;
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
      }
      .amount {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .meta {
        color: var(--budgee-text-muted);
        font-size: 0.9rem;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .section h3 {
        margin-top: 0;
      }
      .tag-badge {
        display: inline-block;
        background: var(--budgee-primary);
        color: white;
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 0.8rem;
        margin-right: 4px;
        cursor: pointer;
      }
      .tags-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      textarea {
        width: 100%;
        min-height: 60px;
        padding: 8px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        font-family: inherit;
        font-size: 0.9rem;
        resize: vertical;
        box-sizing: border-box;
      }
      .create-rule {
        display: inline-block;
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
        text-decoration: none;
        font-size: 0.9rem;
      }
      .create-rule:hover {
        background-color: var(--budgee-primary-hover);
      }
      .back-link {
        color: var(--budgee-primary);
        cursor: pointer;
        text-decoration: underline;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: inline-block;
      }
    `,
  ];

  #subscriptions: { unsubscribe: () => void }[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.#load();
    const debouncedLoad = debounce(() => this.#load(), 300);
    Promise.all([
      Transactions.subscribe(debouncedLoad),
      Tags.subscribe(debouncedLoad),
      Merchants.subscribe(debouncedLoad),
    ]).then((subs) => {
      this.#subscriptions = subs;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const sub of this.#subscriptions) sub.unsubscribe();
    this.#subscriptions = [];
  }

  async #load() {
    if (!this.transactionId) return;

    this._transaction = await Transactions.get(this.transactionId);
    this._tags = await Tags.all();

    if (this._transaction?.merchantId) {
      this._merchant = await Merchants.get(this._transaction.merchantId);
    }

    if (this._transaction) {
      await this.#loadRelated();
      await this.#loadMonthlySpend();
    }
  }

  async #loadRelated() {
    if (!this._transaction?.merchantId) {
      this._relatedTransactions = [];
      return;
    }

    const all = await Transactions.forMerchant(this._transaction.merchantId);
    this._relatedTransactions = all.filter((t) => t.id !== this._transaction!.id).slice(0, 10);
  }

  async #loadMonthlySpend() {
    if (!this._transaction?.merchantId) {
      this._monthlySpend = [];
      return;
    }

    const all = await Transactions.forMerchant(this._transaction.merchantId);

    const byMonth = new Map<string, number>();
    for (const tx of all) {
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }

    this._monthlySpend = [...byMonth.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([month, total]) => ({ month, total }));
  }

  async #onTagSelected(e: CustomEvent) {
    if (!this._transaction) return;
    const tag = e.detail.tag as Tag;
    if (this._transaction.tagIds.includes(tag.id)) return;
    await this.withBusy(async () => {
      const updatedTagIds = [...this._transaction!.tagIds, tag.id];
      await Transactions.update(this._transaction!.id, { tagIds: updatedTagIds });
      this._transaction = { ...this._transaction!, tagIds: updatedTagIds };
    });
  }

  async #onTagCreated(e: CustomEvent) {
    if (!this._transaction) return;
    await this.withBusy(async () => {
      const name = e.detail.name as string;
      const tagId = await Tags.create(name);
      const updatedTagIds = [...this._transaction!.tagIds, tagId];
      await Transactions.update(this._transaction!.id, { tagIds: updatedTagIds });
      this._transaction = { ...this._transaction!, tagIds: updatedTagIds };
      this._tags = await Tags.all();
    });
  }

  async #removeTag(tagId: string) {
    if (!this._transaction) return;
    await this.withBusy(async () => {
      const updatedTagIds = this._transaction!.tagIds.filter((id) => id !== tagId);
      await Transactions.update(this._transaction!.id, { tagIds: updatedTagIds });
      this._transaction = { ...this._transaction!, tagIds: updatedTagIds };
    });
  }

  async #onMemoBlur(e: Event) {
    if (!this._transaction) return;
    await this.withBusy(async () => {
      const memo = (e.target as HTMLTextAreaElement).value;
      await Transactions.update(this._transaction!.id, { memo });
      this._transaction = { ...this._transaction!, memo };
    });
  }

  get #merchantChartData(): ChartData {
    const entries = [...this._monthlySpend].reverse();
    const values = entries.map((e) => e.total);
    const window = movingWindowSize(values.length);
    return {
      labels: entries.map((e) => e.month),
      datasets: [
        {
          label: this._merchant?.name ?? "Merchant",
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
                data: movingMedian(values, window),
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

  #createRule(tx: Transaction) {
    const params = new URLSearchParams({ description: tx.originalDescription });
    window.history.pushState({}, "", `/rules?${params}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  #navigateBack() {
    window.history.pushState({}, "", "/Transactions");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  render() {
    if (!this._transaction) {
      return html`
        <p>Loading...</p>
      `;
    }

    const tx = this._transaction;

    return html`
      <span class="back-link" @click=${this.#navigateBack}>&larr; Back to transactions</span>

      <div class="header">
        <h2>${tx.originalDescription}</h2>
        <div class="amount ${tx.amount < 0 ? "amount-negative" : "amount-positive"}">
          ${tx.amount.toFixed(2)}
        </div>
        <div class="meta">
          ${tx.date}${this._merchant ? html` &middot; ${this._merchant.name}` : nothing}
        </div>
      </div>

      <div class="section">
        <h3>Tags</h3>
        <tag-autocomplete
          .tags=${this._tags}
          .selectedTagIds=${tx.tagIds}
          @tag-selected=${this.#onTagSelected}
          @tag-created=${this.#onTagCreated}
          @tag-removed=${(e: CustomEvent) => this.#removeTag(e.detail.tagId)}
        ></tag-autocomplete>
      </div>

      ${
        !tx.merchantId
          ? html`
            <button class="create-rule" @click=${() => this.#createRule(tx)}>
              Create Merchant Rule
            </button>
          `
          : nothing
      }

      <div class="section">
        <h3>Notes</h3>
        <textarea
          .value=${tx.memo ?? ""}
          @blur=${this.#onMemoBlur}
          placeholder="Add notes..."
        ></textarea>
      </div>

      ${
        this._relatedTransactions.length > 0
          ? html`
            <div class="section">
              <h3>Related Transactions</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th class="col-amount">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._relatedTransactions.map(
                    (t) => html`
                    <tr>
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
            </div>
          `
          : nothing
      }

      ${
        this._monthlySpend.length > 0
          ? html`
            <div class="section">
              <h3>Monthly Merchant Spend</h3>
              <chart-wrapper
                chartType="bar"
                .data=${this.#merchantChartData}
              ></chart-wrapper>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th class="col-amount">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._monthlySpend.map(
                    ({ month, total }) => html`
                    <tr>
                      <td>${month}</td>
                      <td class="col-amount ${total < 0 ? "amount-negative" : "amount-positive"}">
                        ${total.toFixed(2)}
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
