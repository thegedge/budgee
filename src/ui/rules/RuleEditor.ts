import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Merchant, MerchantRule, RuleCondition, Tag } from "../../database/types";
import { extractMerchant } from "../../import/extractMerchant";
import "../merchants/MerchantAutocomplete";
import "../tags/TagAutocomplete";
import "../tags/TagPills";
import "./ConditionRow";

declare global {
  interface HTMLElementTagNameMap {
    "rule-editor": RuleEditor;
  }
}

@customElement("rule-editor")
export class RuleEditor extends LitElement {
  @property({ type: Array })
  tags: Tag[] = [];

  @property({ type: Array })
  merchants: Merchant[] = [];

  @property({ type: Array })
  rules: MerchantRule[] = [];

  @property({ type: String })
  prefillDescription = "";

  @property({ attribute: false })
  editingRule: MerchantRule | null = null;

  @property({ type: String })
  editingMerchantName = "";

  @state()
  private _prefillPristine = false;

  @state()
  private _logic: "and" | "or" = "or";

  @state()
  private _conditions: RuleCondition[] = [{ field: "description", operator: "equals", value: "" }];

  @state()
  private _selectedTagIds: string[] = [];

  @state()
  private _merchantName = "";

  @state()
  private _pendingTagNames: string[] = [];

  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--budgee-border);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface);
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
      background-color: var(--budgee-primary);
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: var(--budgee-primary-hover);
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
      background: var(--budgee-primary);
      color: white;
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 0.8rem;
      cursor: pointer;
    }
    h4 {
      margin: 0 0 0.5rem;
    }
    .existing-rules {
      margin-top: 0.75rem;
      padding: 0.5rem;
      background: var(--budgee-background, #f5f5f5);
      border-radius: 4px;
      font-size: 0.85rem;
    }
    .existing-rules h5 {
      margin: 0 0 0.25rem;
    }
    .existing-rule-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0;
    }
    .existing-rule-conditions {
      color: var(--budgee-text-muted);
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has("editingRule") && this.editingRule) {
      this._conditions = [...this.editingRule.conditions];
      this._logic = this.editingRule.logic;
      this._selectedTagIds = [...this.editingRule.tagIds];
      this._merchantName = this.editingMerchantName;
      this._pendingTagNames = [];
    } else if (changed.has("prefillDescription") && this.prefillDescription) {
      this._conditions = [
        { field: "description", operator: "equals", value: this.prefillDescription },
      ];
      this._merchantName = extractMerchant(this.prefillDescription);
      this._prefillPristine = true;
      this._pendingTagNames = [];
    }
  }

  #onConditionChanged(e: CustomEvent) {
    const { index, condition } = e.detail as { index: number; condition: RuleCondition };
    let updated = condition;
    if (
      this._prefillPristine &&
      index === 0 &&
      condition.operator === "equals" &&
      condition.value !== this._conditions[0]?.value
    ) {
      updated = { ...condition, operator: "contains" };
      this._prefillPristine = false;
    }
    this._conditions = this._conditions.map((c, i) => (i === index ? updated : c));
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

  #onTagSelected(e: CustomEvent) {
    const tag = e.detail.tag as Tag;
    if (!this._selectedTagIds.includes(tag.id)) {
      this._selectedTagIds = [...this._selectedTagIds, tag.id];
    }
  }

  #onTagCreated(e: CustomEvent) {
    const name = e.detail.name as string;
    if (!this._pendingTagNames.includes(name)) {
      this._pendingTagNames = [...this._pendingTagNames, name];
    }
  }

  #removePendingTag(name: string) {
    this._pendingTagNames = this._pendingTagNames.filter((n) => n !== name);
  }

  #removeTag(tagId: string) {
    this._selectedTagIds = this._selectedTagIds.filter((id) => id !== tagId);
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
          newTagNames: this._pendingTagNames,
          merchantName: this._merchantName.trim() || undefined,
        },
      }),
    );

    this._conditions = [{ field: "description", operator: "equals", value: "" }];
    this._selectedTagIds = [];
    this._merchantName = "";
    this._pendingTagNames = [];
    this._logic = "or";
  }

  #existingRulesForMerchant() {
    if (!this._merchantName.trim()) return [];
    const merchant = this.merchants.find(
      (m) => m.name.toLowerCase() === this._merchantName.trim().toLowerCase(),
    );
    if (!merchant) return [];
    return this.rules.filter((r) => r.merchantId === merchant.id && r.id !== this.editingRule?.id);
  }

  #formatConditions(rule: MerchantRule): string {
    return rule.conditions
      .map((c) => `${c.operator} "${c.value}"`)
      .join(rule.logic === "and" ? " AND " : " OR ");
  }

  #renderExistingRules() {
    const existing = this.#existingRulesForMerchant();
    if (existing.length === 0) return nothing;
    return html`
      <div class="existing-rules">
        <h5>Existing rules for this merchant</h5>
        ${existing.map(
          (rule) => html`
            <div class="existing-rule-item">
              <span class="existing-rule-conditions">${this.#formatConditions(rule)}</span>
              ${rule.tagIds.length > 0 ? html`<tag-pills .tags=${this.tags} .tagIds=${rule.tagIds}></tag-pills>` : nothing}
            </div>
          `,
        )}
      </div>
    `;
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
        <merchant-autocomplete
          .merchants=${this.merchants}
          .value=${this._merchantName}
          @merchant-changed=${(e: CustomEvent) => {
            this._merchantName = e.detail.name;
          }}
        ></merchant-autocomplete>
      </div>
      <div class="form-row tags-row">
        <label>Tags:</label>
        ${this._pendingTagNames.map(
          (name) => html`
          <span class="tag-badge" @click=${() => this.#removePendingTag(name)}>
            ${name} &times;
          </span>
        `,
        )}
        <tag-autocomplete
          .tags=${this.tags}
          .selectedTagIds=${this._selectedTagIds}
          @tag-selected=${this.#onTagSelected}
          @tag-created=${this.#onTagCreated}
          @tag-removed=${(e: CustomEvent) => this.#removeTag(e.detail.tagId)}
        ></tag-autocomplete>
      </div>
      <button @click=${this.#onSave}>Save Rule</button>
      ${this.#renderExistingRules()}
    `;
  }
}
