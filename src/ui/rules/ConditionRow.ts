import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import type { RuleCondition, RuleOperator } from "../../database/types";
import { iconButtonStyles } from "../iconButtonStyles";

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

  static styles = [
    iconButtonStyles,
    css`
      :host {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.25rem;
      }
      select,
      input {
        padding: 4px 8px;
      }
      input {
        flex: 1;
      }
    `,
  ];

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

  #onRemove() {
    this.dispatchEvent(new CustomEvent("condition-removed", { detail: { index: this.index } }));
  }

  render() {
    return html`
      <span>description</span>
      <select @change=${this.#onOperatorChange}>
        ${OPERATORS.map(
          (op) => html`
          <option value=${op.value} ?selected=${this.condition.operator === op.value}>
            ${op.label}
          </option>
        `,
        )}
      </select>
      <input
        type="text"
        placeholder="value"
        .value=${this.condition.value}
        @input=${this.#onValueInput}
      />
      <button class="icon-btn icon-btn--danger" title="Remove condition" aria-label="Remove condition" @click=${this.#onRemove}>${unsafeSVG(trash2Icon)}</button>
    `;
  }
}
