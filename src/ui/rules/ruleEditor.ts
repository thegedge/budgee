import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { MerchantRule, RuleCondition, Tag } from "../../database/types";
import "./conditionRow";

declare global {
  interface HTMLElementTagNameMap {
    "rule-editor": RuleEditor;
  }
}

@customElement("rule-editor")
export class RuleEditor extends LitElement {
  @property({ type: Array })
  tags: Tag[] = [];

  @property({ type: String })
  prefillDescription = "";

  @property({ attribute: false })
  editingRule: MerchantRule | null = null;

  @property({ type: String })
  editingMerchantName = "";

  @state()
  private _logic: "and" | "or" = "and";

  @state()
  private _conditions: RuleCondition[] = [
    { field: "description", operator: "contains", value: "" },
  ];

  @state()
  private _selectedTagId = 0;

  @state()
  private _merchantName = "";

  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface, #fff);
    }
    .form-row {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .conditions {
      margin-bottom: 0.5rem;
    }
    select,
    input {
      padding: 4px 8px;
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
    .add-condition {
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    h4 {
      margin: 0 0 0.5rem;
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has("editingRule") && this.editingRule) {
      this._conditions = [...this.editingRule.conditions];
      this._logic = this.editingRule.logic;
      this._selectedTagId = this.editingRule.tagIds[0] ?? 0;
      this._merchantName = this.editingMerchantName;
    } else if (changed.has("prefillDescription") && this.prefillDescription) {
      this._conditions = [
        { field: "description", operator: "contains", value: this.prefillDescription },
      ];
    }
  }

  #onConditionChanged(e: CustomEvent) {
    const { index, condition } = e.detail;
    this._conditions = this._conditions.map((c, i) => (i === index ? condition : c));
  }

  #onConditionRemoved(e: CustomEvent) {
    const { index } = e.detail;
    this._conditions = this._conditions.filter((_, i) => i !== index);
  }

  #addCondition() {
    this._conditions = [
      ...this._conditions,
      { field: "description" as const, operator: "contains" as const, value: "" },
    ];
  }

  #onSave() {
    const validConditions = this._conditions.filter((c) => c.value.trim());
    if (validConditions.length === 0) return;

    this.dispatchEvent(
      new CustomEvent("rule-saved", {
        detail: {
          id: this.editingRule?.id,
          logic: this._logic,
          conditions: validConditions,
          tagIds: this._selectedTagId ? [this._selectedTagId] : [],
          merchantName: this._merchantName.trim() || undefined,
        },
      }),
    );

    this._conditions = [{ field: "description", operator: "contains", value: "" }];
    this._selectedTagId = 0;
    this._merchantName = "";
    this._logic = "and";
  }

  render() {
    return html`
      <h4>${this.editingRule ? "Edit Rule" : "Create Rule"}</h4>
      <div class="conditions">
        ${this._conditions.map(
          (condition, i) => html`
          <condition-row
            .condition=${condition}
            .index=${i}
            @condition-changed=${this.#onConditionChanged}
            @condition-removed=${this.#onConditionRemoved}
          ></condition-row>
        `,
        )}
      </div>
      ${
        this._conditions.length > 1
          ? html`
            <div class="form-row">
              <label>Logic:</label>
              <select @change=${(e: Event) => {
                this._logic = (e.target as HTMLSelectElement).value as "and" | "or";
              }}>
                <option value="and" ?selected=${this._logic === "and"}>All match (AND)</option>
                <option value="or" ?selected=${this._logic === "or"}>Any match (OR)</option>
              </select>
            </div>
          `
          : ""
      }
      <button class="add-condition" @click=${this.#addCondition}>+ Add Condition</button>
      <div class="form-row">
        <label>Merchant:</label>
        <input
          type="text"
          placeholder="Merchant name (optional)"
          .value=${this._merchantName}
          @input=${(e: Event) => {
            this._merchantName = (e.target as HTMLInputElement).value;
          }}
        />
      </div>
      <div class="form-row">
        <label>Tag:</label>
        <select @change=${(e: Event) => {
          this._selectedTagId = Number((e.target as HTMLSelectElement).value);
        }}>
          <option value="0">No tag</option>
          ${this.tags.map((t) => html`<option value=${t.id!}>${t.name}</option>`)}
        </select>
      </div>
      <button @click=${this.#onSave}>Save Rule</button>
    `;
  }
}
