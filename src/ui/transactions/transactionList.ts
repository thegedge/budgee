import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Transaction } from "../../database/types";

declare global {
  interface HTMLElementTagNameMap {
    "transaction-list": TransactionList;
  }
}

@customElement("transaction-list")
export class TransactionList extends LitElement {
  @property({ type: Array })
  transactions: Transaction[] = [];

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
  `;

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
            </tr>
          `,
          )}
        </tbody>
      </table>
    `;
  }
}
