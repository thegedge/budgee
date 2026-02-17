import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import type {
  ChartFilterCondition,
  ChartFilterField,
  ChartFilterOperator,
  Merchant,
  Tag,
} from "../../database/types";
import { iconButtonStyles } from "../iconButtonStyles";

declare global {
  interface HTMLElementTagNameMap {
    "chart-filter-row": ChartFilterRow;
  }
}

const FIELDS: { value: ChartFilterField; label: string }[] = [
  { value: "tag", label: "Tag" },
  { value: "merchant", label: "Merchant" },
  { value: "amount", label: "Amount" },
  { value: "description", label: "Description" },
];

const OPERATORS_BY_FIELD: Record<
  ChartFilterField,
  { value: ChartFilterOperator; label: string }[]
> = {
  tag: [
    { value: "is", label: "is" },
    { value: "isNot", label: "is not" },
  ],
  merchant: [
    { value: "is", label: "is" },
    { value: "isNot", label: "is not" },
  ],
  amount: [
    { value: "lt", label: "<" },
    { value: "gt", label: ">" },
    { value: "lte", label: "<=" },
    { value: "gte", label: ">=" },
  ],
  description: [
    { value: "contains", label: "contains" },
    { value: "excludes", label: "excludes" },
  ],
};

@customElement("chart-filter-row")
export class ChartFilterRow extends LitElement {
  @property({ type: Object })
  condition: ChartFilterCondition = { field: "tag", operator: "is", value: "" };

  @property({ type: Number })
  index = 0;

  @property({ type: Array })
  tags: Tag[] = [];

  @property({ type: Array })
  merchants: Merchant[] = [];

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

  #emit(condition: ChartFilterCondition) {
    this.dispatchEvent(
      new CustomEvent("filter-changed", {
        detail: { index: this.index, condition },
      }),
    );
  }

  #onFieldChange(e: Event) {
    const field = (e.target as HTMLSelectElement).value as ChartFilterField;
    const operators = OPERATORS_BY_FIELD[field];
    this.#emit({ field, operator: operators[0].value, value: "" });
  }

  #onOperatorChange(e: Event) {
    const operator = (e.target as HTMLSelectElement).value as ChartFilterOperator;
    this.#emit({ ...this.condition, operator });
  }

  #onValueChange(e: Event) {
    const value = (e.target as HTMLSelectElement | HTMLInputElement).value;
    this.#emit({ ...this.condition, value });
  }

  #onRemove() {
    this.dispatchEvent(new CustomEvent("filter-removed", { detail: { index: this.index } }));
  }

  #renderValueInput() {
    const { field } = this.condition;
    if (field === "tag") {
      return html`
        <select @change=${this.#onValueChange}>
          <option value="">--</option>
          ${this.tags.map(
            (t) =>
              html`<option value=${t.id} ?selected=${this.condition.value === t.id}>${t.name}</option>`,
          )}
        </select>
      `;
    }
    if (field === "merchant") {
      return html`
        <select @change=${this.#onValueChange}>
          <option value="">--</option>
          ${this.merchants.map(
            (m) =>
              html`<option value=${m.id} ?selected=${this.condition.value === m.id}>${m.name}</option>`,
          )}
        </select>
      `;
    }
    if (field === "amount") {
      return html`
        <input
          type="number"
          placeholder="e.g. 0"
          .value=${this.condition.value}
          @input=${this.#onValueChange}
        />
      `;
    }
    return html`
      <input
        type="text"
        placeholder="value"
        .value=${this.condition.value}
        @input=${this.#onValueChange}
      />
    `;
  }

  render() {
    const operators = OPERATORS_BY_FIELD[this.condition.field];
    return html`
      <select @change=${this.#onFieldChange}>
        ${FIELDS.map(
          (f) =>
            html`<option value=${f.value} ?selected=${this.condition.field === f.value}>${f.label}</option>`,
        )}
      </select>
      <select @change=${this.#onOperatorChange}>
        ${operators.map(
          (op) =>
            html`<option value=${op.value} ?selected=${this.condition.operator === op.value}>${op.label}</option>`,
        )}
      </select>
      ${this.#renderValueInput()}
      <button class="icon-btn icon-btn--danger" aria-label="Remove filter" @click=${this.#onRemove}>${unsafeSVG(trash2Icon)}</button>
    `;
  }
}
