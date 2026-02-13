import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { MerchantRule, Tag } from "../../database/types";

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
  private _pattern = "";

  @state()
  private _selectedTagId = 0;

  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    .rule-form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      align-items: center;
    }
    input {
      padding: 4px 8px;
    }
    select {
      padding: 4px 8px;
    }
    button {
      padding: 4px 12px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }
    .delete-btn {
      background-color: #dc3545;
      font-size: 0.8rem;
      padding: 2px 8px;
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
  `;

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
  }

  async #refresh() {
    this._rules = await db.merchantRules.toArray();
    this._tags = await db.tags.toArray();
  }

  async #addRule() {
    const pattern = this._pattern.trim();
    if (!pattern) return;

    const tagIds = this._selectedTagId ? [this._selectedTagId] : [];
    await db.merchantRules.add({ pattern, tagIds });
    this._pattern = "";
    this._selectedTagId = 0;
    await this.#refresh();
  }

  async #deleteRule(id: number) {
    await db.merchantRules.delete(id);
    await this.#refresh();
  }

  #tagName(tagId: number): string {
    return this._tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
  }

  render() {
    return html`
      <h3>Merchant Rules</h3>
      <div class="rule-form">
        <input
          type="text"
          placeholder="Description contains..."
          .value=${this._pattern}
          @input=${(e: Event) => {
            this._pattern = (e.target as HTMLInputElement).value;
          }}
        />
        <select
          @change=${(e: Event) => {
            this._selectedTagId = Number((e.target as HTMLSelectElement).value);
          }}
        >
          <option value="0">No tag</option>
          ${this._tags.map((t) => html`<option value=${t.id!}>${t.name}</option>`)}
        </select>
        <button @click=${this.#addRule}>Add Rule</button>
      </div>
      ${
        this._rules.length > 0
          ? this.#renderRulesTable()
          : html`
              <p>No rules defined.</p>
            `
      }
    `;
  }

  #renderRulesTable() {
    return html`
      <table>
        <thead>
          <tr>
            <th>Pattern</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this._rules.map(
            (rule) => html`
            <tr>
              <td>${rule.pattern}</td>
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
    `;
  }
}
