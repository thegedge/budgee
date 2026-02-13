import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Tag, Transaction } from "../../database/types";

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
  @property({ type: Array })
  transactions: Transaction[] = [];

  @property({ type: Array })
  tags: Tag[] = [];

  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
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
    .bar-cell {
      position: relative;
    }
    .bar {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.2;
    }
    .bar-negative {
      background-color: #c0392b;
    }
    .bar-positive {
      background-color: #27ae60;
    }
    .amount-negative {
      color: #c0392b;
    }
    .amount-positive {
      color: #27ae60;
    }
    .total-row {
      font-weight: bold;
    }
  `;

  render() {
    const tagTotals = computeTotals(this.transactions, this.tags);
    const grandTotal = this.transactions.reduce((sum, t) => sum + t.amount, 0);

    if (this.transactions.length === 0) {
      return html`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `;
    }

    const maxAbs = Math.max(...tagTotals.map((t) => Math.abs(t.total)), 1);

    return html`
      <h3>Dashboard</h3>
      <p>Spending breakdown by tag</p>
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Total</th>
            <th></th>
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
              <td class="bar-cell">
                <div
                  class="bar ${total < 0 ? "bar-negative" : "bar-positive"}"
                  style="width: ${((Math.abs(total) / maxAbs) * 100).toFixed(1)}%"
                ></div>
              </td>
            </tr>
          `,
          )}
          <tr class="total-row">
            <td>Total</td>
            <td class=${grandTotal < 0 ? "amount-negative" : "amount-positive"}>
              ${grandTotal.toFixed(2)}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    `;
  }
}
