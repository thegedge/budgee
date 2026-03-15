import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import type { RuleCondition, RuleOperator } from "../../database/types";
import type { Account } from "../../models/Account";
import "../shared/AutocompleteInput";

type RuleField = RuleCondition["field"];

const FIELDS: { value: RuleField; label: string }[] = [
  { value: "description", label: "description" },
  { value: "account", label: "account" },
];
import { iconButtonStyles } from "../iconButtonStyles";
import { inputStyles } from "../inputStyles";

declare global {
  interface HTMLElementTagNameMap {
    "condition-row": ConditionRow;
  }
}

const OPERATORS: { value: RuleOperator; label: string }[] = [
  { value: "contains", label: "contains" },
  { value: "startsWith", label: "starts with" },
  { value: "equals", label: "equals" },
  { value: "oneOf", label: "one of" },
  { value: "regex", label: "regex" },
];

@customElement("condition-row")
export class ConditionRow extends LitElement {
  @property({ type: Object })
  condition: RuleCondition = { field: "description", operator: "equals", value: "" };

  @property({ type: Number })
  index = 0;

  @property({ type: Array })
  accounts: Account[] = [];

  static styles = [
    iconButtonStyles,
    inputStyles,
    css`
      :host {
        display: contents;
      }
      select,
      input {
        padding: 4px 8px;
      }
      autocomplete-input {
        max-width: 220px;
      }
      .multi-select {
        position: relative;
        display: inline-block;
        max-width: 220px;
        font-family: -apple-system, system-ui, sans-serif;
      }
      .multi-select-toggle {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        cursor: pointer;
        font-family: inherit;
        color: inherit;
        -webkit-font-smoothing: antialiased;
        width: 100%;
        box-sizing: border-box;
      }
      .multi-select-toggle .chevron {
        margin-left: auto;
        display: flex;
        align-items: center;
        color: var(--budgee-text-muted, currentColor);
      }
      .multi-select-toggle .chevron svg {
        width: 12px;
        height: 12px;
        stroke: currentColor;
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .multi-select-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--budgee-surface);
        border: 1px solid var(--budgee-border);
        border-radius: 0 0 4px 4px;
        max-height: 150px;
        overflow-y: auto;
        z-index: 10;
        min-width: 180px;
      }
      .multi-select-option {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 6px;
        cursor: pointer;
        font-size: 0.85rem;
      }
      .multi-select-option:hover {
        background: var(--budgee-bg);
      }
    `,
  ];

  #onFieldChange(e: Event) {
    const field = (e.target as HTMLSelectElement).value as RuleField;
    this.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: { index: this.index, condition: { ...this.condition, field } },
      }),
    );
  }

  #onOperatorChange(e: Event) {
    const operator = (e.target as HTMLSelectElement).value as RuleOperator;
    this.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: { index: this.index, condition: { ...this.condition, operator } },
      }),
    );
  }

  #onValueInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: { index: this.index, condition: { ...this.condition, value } },
      }),
    );
  }

  #onAutocompleteValueChanged(e: CustomEvent) {
    const value = e.detail.value as string;
    this.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: { index: this.index, condition: { ...this.condition, value } },
      }),
    );
  }

  @state()
  private _multiSelectOpen = false;

  override updated(changed: Map<PropertyKey, unknown>) {
    if (changed.has("_multiSelectOpen")) {
      if (this._multiSelectOpen) {
        document.addEventListener("click", this.#onDocumentClick);
      } else {
        document.removeEventListener("click", this.#onDocumentClick);
      }
    }
  }

  get #useAccountAutocomplete(): boolean {
    return this.condition.field === "account" && this.condition.operator === "equals";
  }

  get #useAccountMultiSelect(): boolean {
    return this.condition.field === "account" && this.condition.operator === "oneOf";
  }

  get #accountNames(): string[] {
    return this.accounts.map((a) => a.name);
  }

  get #selectedAccounts(): Set<string> {
    return new Set(
      this.condition.value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
    );
  }

  #toggleAccount(name: string) {
    const selected = this.#selectedAccounts;
    if (selected.has(name)) {
      selected.delete(name);
    } else {
      selected.add(name);
    }
    const value = [...selected].join(", ");
    this.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: { index: this.index, condition: { ...this.condition, value } },
      }),
    );
  }

  #onDocumentClick = (e: MouseEvent) => {
    if (!e.composedPath().includes(this)) {
      this._multiSelectOpen = false;
    }
  };

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.#onDocumentClick);
  }

  #renderAccountMultiSelect() {
    const selected = this.#selectedAccounts;
    const label =
      selected.size === 0
        ? "select accounts"
        : `${selected.size} account${selected.size === 1 ? "" : "s"}`;

    return html`
      <div class="multi-select">
        <button
          type="button"
          class="multi-select-toggle"
          @click=${() => (this._multiSelectOpen = !this._multiSelectOpen)}
        >
          ${label}
          <span class="chevron"
            ><svg viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9"></polyline></svg
          ></span>
        </button>
        ${
          this._multiSelectOpen
            ? html`
            <div class="multi-select-dropdown">
              ${this.#accountNames.map(
                (name) => html`
                <label class="multi-select-option">
                  <input
                    type="checkbox"
                    .checked=${selected.has(name)}
                    @change=${() => this.#toggleAccount(name)}
                  />
                  ${name}
                </label>
              `,
              )}
            </div>
          `
            : nothing
        }
      </div>
    `;
  }

  #onRemove() {
    this.dispatchEvent(new CustomEvent("condition-removed", { detail: { index: this.index } }));
  }

  render() {
    return html`
      <select @change=${this.#onFieldChange}>
        ${FIELDS.map(
          (f) => html`
          <option value=${f.value} ?selected=${this.condition.field === f.value}>
            ${f.label}
          </option>
        `,
        )}
      </select>
      <select @change=${this.#onOperatorChange}>
        ${OPERATORS.map(
          (op) => html`
          <option value=${op.value} ?selected=${this.condition.operator === op.value}>
            ${op.label}
          </option>
        `,
        )}
      </select>
      ${
        this.#useAccountMultiSelect
          ? this.#renderAccountMultiSelect()
          : this.#useAccountAutocomplete
            ? html`<autocomplete-input
              .items=${this.#accountNames}
              .value=${this.condition.value}
              placeholder="account name"
              ?dropdown=${true}
              @value-changed=${this.#onAutocompleteValueChanged}
            ></autocomplete-input>`
            : html`<input
              type="text"
              placeholder=${this.condition.operator === "oneOf" ? "value1, value2, ..." : "value"}
              .value=${this.condition.value}
              @input=${this.#onValueInput}
            />`
      }
      <button class="icon-btn icon-btn--danger" title="Remove condition" aria-label="Remove condition" @click=${this.#onRemove}>${unsafeSVG(trash2Icon)}</button>
    `;
  }
}
