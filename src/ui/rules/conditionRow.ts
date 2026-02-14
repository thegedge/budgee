import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { RuleCondition, RuleOperator } from "../../database/types";

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
  condition: RuleCondition = { field: "description", operator: "contains", value: "" };

  @property({ type: Number })
  index = 0;

  static styles = css`
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
    button {
      padding: 2px 8px;
      cursor: pointer;
      background-color: var(--budgee-danger, #e8a0a0);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    button:hover {
      background-color: var(--budgee-danger-hover, #d07070);
    }
  `;

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
      <button @click=${this.#onRemove}>Remove</button>
    `;
  }
}
