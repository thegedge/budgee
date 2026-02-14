import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Merchant, Tag, Transaction } from "../../database/types";
import type { ChartData } from "chart.js";
import "../tags/tagAutocomplete";
import "../charts/chartWrapper";

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
export class TransactionDetail extends LitElement {
  @property({ type: Number })
  transactionId = 0;

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

  static styles = css`
    :host {
      display: block;
    }
    .header {
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface, #fff);
    }
    .header h2 {
      margin-top: 0;
    }
    .amount {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .amount-negative {
      color: var(--budgee-negative, #d09090);
    }
    .amount-positive {
      color: var(--budgee-positive, #7ec8a0);
    }
    .meta {
      color: var(--budgee-text-muted, #888);
      font-size: 0.9rem;
    }
    .section {
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface, #fff);
    }
    .section h3 {
      margin-top: 0;
    }
    .tag-badge {
      display: inline-block;
      background: var(--budgee-primary, #7eb8da);
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
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 4px;
      font-family: inherit;
      font-size: 0.9rem;
      resize: vertical;
      box-sizing: border-box;
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
      background-color: var(--budgee-bg, #fafafa);
    }
    .back-link {
      color: var(--budgee-primary, #7eb8da);
      cursor: pointer;
      text-decoration: underline;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      display: inline-block;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.#load();
  }

  async #load() {
    if (!this.transactionId) return;

    this._transaction = await db.transactions.get(this.transactionId);
    this._tags = await db.tags.toArray();

    if (this._transaction?.merchantId) {
      this._merchant = await db.merchants.get(this._transaction.merchantId);
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

    const all = await db.transactions
      .where("merchantId")
      .equals(this._transaction.merchantId)
      .reverse()
      .sortBy("date");

    this._relatedTransactions = all.filter((t) => t.id !== this._transaction!.id).slice(0, 10);
  }

  async #loadMonthlySpend() {
    if (!this._transaction?.merchantId) {
      this._monthlySpend = [];
      return;
    }

    const all = await db.transactions
      .where("merchantId")
      .equals(this._transaction.merchantId)
      .toArray();

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
    if (this._transaction.tagIds.includes(tag.id!)) return;
    const updatedTagIds = [...this._transaction.tagIds, tag.id!];
    await db.transactions.update(this._transaction.id!, { tagIds: updatedTagIds });
    this._transaction = { ...this._transaction, tagIds: updatedTagIds };
  }

  async #onTagCreated(e: CustomEvent) {
    if (!this._transaction) return;
    const name = e.detail.name as string;
    const tagId = await db.tags.add({ name });
    const updatedTagIds = [...this._transaction.tagIds, tagId];
    await db.transactions.update(this._transaction.id!, { tagIds: updatedTagIds });
    this._transaction = { ...this._transaction, tagIds: updatedTagIds };
    this._tags = await db.tags.toArray();
  }

  async #removeTag(tagId: number) {
    if (!this._transaction) return;
    const updatedTagIds = this._transaction.tagIds.filter((id) => id !== tagId);
    await db.transactions.update(this._transaction.id!, { tagIds: updatedTagIds });
    this._transaction = { ...this._transaction, tagIds: updatedTagIds };
  }

  async #onMemoBlur(e: Event) {
    if (!this._transaction) return;
    const memo = (e.target as HTMLTextAreaElement).value;
    await db.transactions.update(this._transaction.id!, { memo });
    this._transaction = { ...this._transaction, memo };
  }

  get #merchantChartData(): ChartData {
    const entries = [...this._monthlySpend].reverse();
    return {
      labels: entries.map((e) => e.month),
      datasets: [
        {
          label: this._merchant?.name ?? "Merchant",
          data: entries.map((e) => e.total),
          backgroundColor: "rgba(126, 184, 218, 0.5)",
          borderColor: "#7eb8da",
          borderWidth: 1,
        },
      ],
    };
  }

  #tagName(tagId: number): string {
    return this._tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
  }

  #navigateBack() {
    window.history.pushState({}, "", "/transactions");
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
        <div class="tags-row">
          ${tx.tagIds.map(
            (tagId) => html`
            <span class="tag-badge" @click=${() => this.#removeTag(tagId)}>
              ${this.#tagName(tagId)} &times;
            </span>
          `,
          )}
          <tag-autocomplete
            .tags=${this._tags}
            .excludeIds=${tx.tagIds}
            @tag-selected=${this.#onTagSelected}
            @tag-created=${this.#onTagCreated}
          ></tag-autocomplete>
        </div>
      </div>

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
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._relatedTransactions.map(
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
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._monthlySpend.map(
                    ({ month, total }) => html`
                    <tr>
                      <td>${month}</td>
                      <td class=${total < 0 ? "amount-negative" : "amount-positive"}>
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
