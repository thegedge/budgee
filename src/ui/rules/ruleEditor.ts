import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { MerchantRule, RuleCondition, Tag } from "../../database/types";
import "../tags/tagAutocomplete";
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
  private _conditions: RuleCondition[] = [{ field: "description", operator: "equals", value: "" }];

  @state()
  private _selectedTagIds: number[] = [];

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
    .tags-row {
      flex-wrap: wrap;
    }
    .tag-badge {
      display: inline-block;
      background: var(--budgee-primary, #7eb8da);
      color: white;
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 0.8rem;
      cursor: pointer;
    }
    h4 {
      margin: 0 0 0.5rem;
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has("editingRule") && this.editingRule) {
      this._conditions = [...this.editingRule.conditions];
      this._logic = this.editingRule.logic;
      this._selectedTagIds = [...this.editingRule.tagIds];
      this._merchantName = this.editingMerchantName;
    } else if (changed.has("prefillDescription") && this.prefillDescription) {
      this._conditions = [
        { field: "description", operator: "equals", value: this.prefillDescription },
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
      { field: "description" as const, operator: "equals" as const, value: "" },
    ];
  }

  addTag(tagId: number) {
    if (!this._selectedTagIds.includes(tagId)) {
      this._selectedTagIds = [...this._selectedTagIds, tagId];
    }
  }

  #onTagSelected(e: CustomEvent) {
    const tag = e.detail.tag as Tag;
    if (!this._selectedTagIds.includes(tag.id!)) {
      this._selectedTagIds = [...this._selectedTagIds, tag.id!];
    }
  }

  #onTagCreated(e: CustomEvent) {
    const name = e.detail.name as string;
    this.dispatchEvent(
      new CustomEvent("tag-created", { detail: { name }, bubbles: true, composed: true }),
    );
  }

  #removeTag(tagId: number) {
    this._selectedTagIds = this._selectedTagIds.filter((id) => id !== tagId);
  }

  #tagName(tagId: number): string {
    return this.tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
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
          tagIds: this._selectedTagIds,
          merchantName: this._merchantName.trim() || undefined,
        },
      }),
    );

    this._conditions = [{ field: "description", operator: "equals", value: "" }];
    this._selectedTagIds = [];
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
      <div class="form-row tags-row">
        <label>Tags:</label>
        ${this._selectedTagIds.map(
          (tagId) => html`
          <span class="tag-badge" @click=${() => this.#removeTag(tagId)}>
            ${this.#tagName(tagId)} &times;
          </span>
        `,
        )}
        <tag-autocomplete
          .tags=${this.tags}
          .excludeIds=${this._selectedTagIds}
          @tag-selected=${this.#onTagSelected}
          @tag-created=${this.#onTagCreated}
        ></tag-autocomplete>
      </div>
      <button @click=${this.#onSave}>Save Rule</button>
    `;
  }
}
