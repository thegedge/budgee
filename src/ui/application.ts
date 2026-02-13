import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../database/db";
import type { Transaction } from "../database/types";

import "./import/importer";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-app": Application;
  }
}

@customElement("budgee-app")
export class Application extends LitElement {
  @state()
  private _transactions: Transaction[] = [];

  @state()
  private _showImporter = false;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: var(--budgee-text-color, #000);
      font-family: sans-serif;
    }

    h1 {
      font-size: 1.5rem;
      margin-top: 0;
    }

    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      margin-right: 0.5rem;
    }

    button:hover {
      background-color: #0056b3;
    }

    pre {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      border: 1px solid #ddd;
      overflow-x: auto;
      white-space: pre-wrap;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .actions {
      margin-bottom: 1rem;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h1>Budgee</h1>
        <p>A simple transaction manager.</p>

        <div class="actions">
          <button @click=${() => this._showImporter = !this._showImporter}>
            ${this._showImporter ? "Close Importer" : "Import Transactions"}
          </button>
          <button @click=${this.#seedDatabase}>Seed Database</button>
        </div>
        
        ${this._showImporter ? html`<trans-importer></trans-importer>` : ""}

        <h2>Transactions (${this._transactions.length})</h2>
        ${
          this._transactions.length === 0
            ? html`
                <p>No transactions found. Click "Seed Database" to add some.</p>
              `
            : html`<pre>${JSON.stringify(this._transactions, null, 2)}</pre>`
        }
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#refreshTransactions();
  }

  async #refreshTransactions() {
    this._transactions = await db.transactions.toArray();
  }

  async #seedDatabase() {
    const { seed } = await import("../../scripts/seed");
    await seed();
    await this.#refreshTransactions();
  }
}
