import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../database/db";
import type { Tag, Transaction } from "../database/types";

import "./import/importer";
import "./tags/tagManager";
import "./transactions/transactionList";

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
  private _tags: Tag[] = [];

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
          <button @click=${() => (this._showImporter = !this._showImporter)}>
            ${this._showImporter ? "Close Importer" : "Import Transactions"}
          </button>
          <button @click=${this.#seedDatabase}>Seed Database</button>
        </div>
        
        ${
          this._showImporter
            ? html`
                <trans-importer @imported=${this.#onImported}></trans-importer>
              `
            : ""
        }

        <tag-manager></tag-manager>

        <h2>Transactions (${this._transactions.length})</h2>
        <transaction-list
          .transactions=${this._transactions}
          .tags=${this._tags}
          @tags-changed=${this.#refreshTransactions}
        ></transaction-list>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
  }

  async #refresh() {
    this._transactions = await db.transactions.toArray();
    this._tags = await db.tags.toArray();
  }

  async #refreshTransactions() {
    this._transactions = await db.transactions.toArray();
  }

  async #onImported() {
    this._showImporter = false;
    await this.#refresh();
  }

  async #seedDatabase() {
    const { seed } = await import("../../scripts/seed");
    await seed();
    await this.#refresh();
  }
}
