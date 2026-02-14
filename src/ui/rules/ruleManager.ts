import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { MerchantRule, Tag, Transaction } from "../../database/types";
import "../modal";
import "./ruleEditor";

declare global {
  interface HTMLElementTagNameMap {
    "rule-manager": RuleManager;
  }
}

@customElement("rule-manager")
export class RuleManager extends LitElement {
  @state()
  private _rules: MerchantRule[] = [];

  @state()
  private _tags: Tag[] = [];

  @state()
  private _unmerchanted: Transaction[] = [];

  @state()
  private _prefillDescription = "";

  @state()
  private _showEditor = false;

  static styles = css`
    :host {
      display: block;
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
    button {
      padding: 4px 12px;
      cursor: pointer;
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: var(--budgee-primary-hover, #5a9cbf);
    }
    .delete-btn {
      background-color: var(--budgee-danger, #e8a0a0);
      font-size: 0.8rem;
      padding: 2px 8px;
    }
    .delete-btn:hover {
      background-color: var(--budgee-danger-hover, #d07070);
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
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
    }
    tbody tr:nth-child(even) {
      background-color: var(--budgee-bg, #fafafa);
    }
    .clickable-row {
      cursor: pointer;
    }
    .clickable-row:hover {
      background-color: var(--budgee-bg, #fafafa);
    }
    .condition-summary {
      font-size: 0.85rem;
      color: var(--budgee-text-muted, #888);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);
    const description = params.get("description");
    if (description) {
      this._prefillDescription = description;
      this._showEditor = true;
    }
    this.#refresh();
  }

  async #refresh() {
    this._rules = await db.merchantRules.toArray();
    this._tags = await db.tags.toArray();
    const allTx = await db.transactions.toArray();
    this._unmerchanted = allTx.filter((t) => t.merchantId === undefined);
  }

  async #onRuleSaved(e: CustomEvent) {
    const { logic, conditions, tagIds, merchantName } = e.detail;

    let merchantId: number | undefined;
    if (merchantName) {
      const existing = await db.merchants.where("name").equalsIgnoreCase(merchantName).first();
      merchantId = existing?.id ?? (await db.merchants.add({ name: merchantName }));
    }

    await db.merchantRules.add({ logic, conditions, merchantId, tagIds });
    this._showEditor = false;
    this._prefillDescription = "";
    await this.#refresh();
  }

  async #deleteRule(id: number) {
    await db.merchantRules.delete(id);
    await this.#refresh();
  }

  #tagName(tagId: number): string {
    return this._tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
  }

  #formatConditions(rule: MerchantRule): string {
    return rule.conditions
      .map((c) => `${c.operator} "${c.value}"`)
      .join(rule.logic === "and" ? " AND " : " OR ");
  }

  #selectTransaction(tx: Transaction) {
    this._prefillDescription = tx.originalDescription;
    this._showEditor = true;
  }

  render() {
    return html`
      <h2>Merchant Rules</h2>

      ${
        this._unmerchanted.length > 0
          ? html`
            <div class="section">
              <h3>Unmerchanted Transactions</h3>
              <p>Click a transaction to pre-fill a rule.</p>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._unmerchanted.slice(0, 20).map(
                    (tx) => html`
                    <tr class="clickable-row" @click=${() => this.#selectTransaction(tx)}>
                      <td>${tx.date}</td>
                      <td>${tx.originalDescription}</td>
                      <td>${tx.amount.toFixed(2)}</td>
                    </tr>
                  `,
                  )}
                </tbody>
              </table>
            </div>
          `
          : nothing
      }

      <button @click=${() => {
        this._showEditor = true;
      }}>Create Rule</button>

      ${
        this._showEditor
          ? html`
            <budgee-modal
              heading="Create Rule"
              @modal-close=${() => {
                this._showEditor = false;
                this._prefillDescription = "";
              }}
            >
              <rule-editor
                .tags=${this._tags}
                .prefillDescription=${this._prefillDescription}
                @rule-saved=${this.#onRuleSaved}
              ></rule-editor>
            </budgee-modal>
          `
          : nothing
      }

      ${
        this._rules.length > 0
          ? html`
            <div class="section">
              <h3>Existing Rules</h3>
              <table>
                <thead>
                  <tr>
                    <th>Conditions</th>
                    <th>Tags</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${this._rules.map(
                    (rule) => html`
                    <tr>
                      <td class="condition-summary">${this.#formatConditions(rule)}</td>
                      <td>${rule.tagIds.map((id) => this.#tagName(id)).join(", ") || "None"}</td>
                      <td>
                        <button class="delete-btn" @click=${() => this.#deleteRule(rule.id!)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  `,
                  )}
                </tbody>
              </table>
            </div>
          `
          : html`
              <p>No rules defined.</p>
            `
      }
    `;
  }
}
