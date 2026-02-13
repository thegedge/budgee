import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Tag, Transaction } from "../../database/types";

declare global {
  interface HTMLElementTagNameMap {
    "transaction-list": TransactionList;
  }
}

@customElement("transaction-list")
export class TransactionList extends LitElement {
  @property({ type: Array })
  transactions: Transaction[] = [];

  @property({ type: Array })
  tags: Tag[] = [];

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    .amount-negative {
      color: #c0392b;
    }
    .amount-positive {
      color: #27ae60;
    }
    .tag-select {
      padding: 2px 4px;
    }
    .tag-badge {
      display: inline-block;
      background: #007bff;
      color: white;
      padding: 1px 6px;
      border-radius: 8px;
      font-size: 0.75rem;
      margin-right: 2px;
    }
  `;

  async #onTagChange(transaction: Transaction, e: Event) {
    const select = e.target as HTMLSelectElement;
    const tagId = Number(select.value);
    if (!tagId || transaction.tagIds.includes(tagId)) {
      select.value = "";
      return;
    }

    const updatedTagIds = [...transaction.tagIds, tagId];
    await db.transactions.update(transaction.id!, { tagIds: updatedTagIds });
    select.value = "";
    this.dispatchEvent(new CustomEvent("tags-changed"));
  }

  async #removeTag(transaction: Transaction, tagId: number) {
    const updatedTagIds = transaction.tagIds.filter((id) => id !== tagId);
    await db.transactions.update(transaction.id!, { tagIds: updatedTagIds });
    this.dispatchEvent(new CustomEvent("tags-changed"));
  }

  #tagName(tagId: number): string {
    return this.tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
  }

  render() {
    if (this.transactions.length === 0) {
      return html`
        <p>No transactions found.</p>
      `;
    }

    return html`
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          ${this.transactions.map(
            (t) => html`
            <tr>
              <td>${t.date}</td>
              <td>${t.originalDescription}</td>
              <td class=${t.amount < 0 ? "amount-negative" : "amount-positive"}>
                ${t.amount.toFixed(2)}
              </td>
              <td>
                ${t.tagIds.map(
                  (tagId) => html`
                  <span class="tag-badge" @click=${() => this.#removeTag(t, tagId)}>
                    ${this.#tagName(tagId)} &times;
                  </span>
                `,
                )}
                <select class="tag-select" @change=${(e: Event) => this.#onTagChange(t, e)}>
                  <option value="">+</option>
                  ${this.tags
                    .filter((tag) => !t.tagIds.includes(tag.id!))
                    .map((tag) => html`<option value=${tag.id!}>${tag.name}</option>`)}
                </select>
              </td>
            </tr>
          `,
          )}
        </tbody>
      </table>
    `;
  }
}
