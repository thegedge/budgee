import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
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

  get #useAccountAutocomplete(): boolean {
    return this.condition.field === "account" && this.condition.operator === "equals";
  }

  get #accountNames(): string[] {
    return this.accounts.map((a) => a.name);
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
        this.#useAccountAutocomplete
          ? html`<autocomplete-input
            .items=${this.#accountNames}
            .value=${this.condition.value}
            placeholder="account name"
            ?dropdown=${true}
            @value-changed=${this.#onAutocompleteValueChanged}
          ></autocomplete-input>`
          : html`<input
            type="text"
            placeholder="value"
            .value=${this.condition.value}
            @input=${this.#onValueInput}
          />`
      }
      <button class="icon-btn icon-btn--danger" title="Remove condition" aria-label="Remove condition" @click=${this.#onRemove}>${unsafeSVG(trash2Icon)}</button>
    `;
  }
}
