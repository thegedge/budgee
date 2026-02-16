import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Merchant, MerchantRule, Tag, Transaction } from "../../database/types";
import { matchesRule } from "../../import/applyRules";
import { randomTagColor } from "../tags/tagColor";
import "../modal";
import "../paginatedTable";
import type { FilterChangeDetail, PageChangeDetail } from "../paginatedTable";
import { tableStyles } from "../tableStyles";
import "./ruleEditor";
import "./ruleOverlap";

declare global {
  interface HTMLElementTagNameMap {
    "rule-manager": RuleManager;
  }
}

type RulesSortColumn = "conditions" | "merchant" | "tags";
type SortDir = "asc" | "desc";

@customElement("rule-manager")
export class RuleManager extends LitElement {
  @state()
  private _rules: MerchantRule[] = [];

  @state()
  private _tags: Tag[] = [];

  @state()
  private _merchants: Merchant[] = [];

  @state()
  private _unmerchanted: Transaction[] = [];

  @state()
  private _prefillDescription = "";

  @state()
  private _showEditor = false;

  @state()
  private _editingRule: MerchantRule | null = null;

  @state()
  private _editingMerchantName = "";

  @state()
  private _pendingRerunRule: MerchantRule | null = null;

  @state()
  private _rulesPage = 1;

  @state()
  private _rulesPageSize = 10;

  @state()
  private _rulesFilter = "";

  @state()
  private _rulesSortCol: RulesSortColumn = "conditions";

  @state()
  private _rulesSortDir: SortDir = "asc";

  @state()
  private _unmerchantedPage = 1;

  @state()
  private _unmerchantedPageSize = 20;

  @state()
  private _unmerchantedFilter = "";

  @state()
  private _overlapRefresh = 0;

  static styles = [
    tableStyles,
    css`
      :host {
        display: block;
      }
      .section {
        border: 1px solid var(--budgee-border, lch(89.2% 0 none));
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface, lch(100% 0 none));
      }
      .section h3 {
        margin-top: 0;
      }
      button {
        padding: 4px 12px;
        cursor: pointer;
        background-color: var(--budgee-primary, lch(72.1% 25.1 246.4));
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:hover {
        background-color: var(--budgee-primary-hover, lch(61.4% 26.9 245.6));
      }
      .delete-btn {
        background-color: var(--budgee-danger, lch(72.8% 28.9 22.1));
        font-size: 0.8rem;
        padding: 2px 8px;
      }
      .delete-btn:hover {
        background-color: var(--budgee-danger-hover, lch(58.2% 41.3 24.4));
      }
      .confirm-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
      }
      .condition-summary {
        font-size: 0.85rem;
        color: var(--budgee-text-muted, lch(56.7% 0 none));
      }
      .sections-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      @media (min-width: 1200px) {
        .sections-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
  }

  async #refresh() {
    this._rules = await db.merchantRules.toArray();
    this._tags = await db.tags.toArray();
    this._merchants = await db.merchants.toArray();
    const allTx = await db.transactions.toArray();
    this._unmerchanted = allTx.filter((t) => t.merchantId === undefined);
    this._overlapRefresh++;
  }

  async #onRuleSaved(e: CustomEvent) {
    const { id, logic, conditions, tagIds, newTagNames, merchantName } = e.detail;

    const allTagIds = [...(tagIds as number[])];
    if (newTagNames?.length) {
      for (const name of newTagNames as string[]) {
        const existing = await db.tags.where("name").equalsIgnoreCase(name).first();
        const tagId = existing?.id ?? (await db.tags.add({ name, color: randomTagColor() }));
        allTagIds.push(tagId);
      }
    }

    let merchantId: number | undefined;
    if (merchantName) {
      const existing = await db.merchants.where("name").equalsIgnoreCase(merchantName).first();
      merchantId = existing?.id ?? (await db.merchants.add({ name: merchantName }));
    }

    // Check for existing rule to merge with (only for new rules, not edits)
    if (!id && merchantId) {
      const existingRule = this._rules.find((r) => r.merchantId === merchantId);
      if (existingRule) {
        const mergedConditions = [...existingRule.conditions, ...conditions];
        const mergedTagIds = [...new Set([...existingRule.tagIds, ...allTagIds])];
        const mergedLogic = existingRule.conditions.length <= 1 ? "or" : existingRule.logic;
        const merged: MerchantRule = {
          ...existingRule,
          logic: mergedLogic,
          conditions: mergedConditions,
          tagIds: mergedTagIds,
        };
        await db.merchantRules.put(merged);
        this._showEditor = false;
        this._editingRule = null;
        this._editingMerchantName = "";
        this._prefillDescription = "";
        this._pendingRerunRule = merged;
        await this.#refresh();
        return;
      }
    }

    const rule: MerchantRule = id
      ? { id, logic, conditions, merchantId, tagIds: allTagIds }
      : ({ logic, conditions, merchantId, tagIds: allTagIds } as MerchantRule);

    if (id) {
      await db.merchantRules.put(rule);
      this._showEditor = false;
      this._editingRule = null;
      this._editingMerchantName = "";
      this._prefillDescription = "";
      this._pendingRerunRule = rule;
    } else {
      rule.id = await db.merchantRules.add(rule);
      await this.#applyRuleToExisting(rule);
      this._showEditor = false;
      this._editingRule = null;
      this._editingMerchantName = "";
      this._prefillDescription = "";
    }

    await this.#refresh();
  }

  async #applyRuleToExisting(rule: MerchantRule) {
    const allTx = await db.transactions.toArray();
    const updates: Transaction[] = [];
    for (const tx of allTx) {
      const description = tx.originalDescription.toLowerCase();
      if (matchesRule(description, rule)) {
        updates.push({
          ...tx,
          merchantId: rule.merchantId ?? tx.merchantId,
          tagIds: [...new Set([...tx.tagIds, ...rule.tagIds])],
        });
      }
    }
    if (updates.length > 0) {
      await db.transactions.bulkPut(updates);
    }
  }

  async #deleteRule(id: number) {
    await db.merchantRules.delete(id);
    await this.#refresh();
  }

  async #editRule(rule: MerchantRule) {
    let merchantName = "";
    if (rule.merchantId) {
      const merchant = await db.merchants.get(rule.merchantId);
      merchantName = merchant?.name ?? "";
    }
    this._editingRule = rule;
    this._editingMerchantName = merchantName;
    this._showEditor = true;
  }

  #tagLabel(tagId: number): string {
    const tag = this._tags.find((t) => t.id === tagId);
    if (!tag) return `#${tagId}`;
    return tag.icon ? `${tag.icon} ${tag.name}` : tag.name;
  }

  #tagName(tagId: number): string {
    return this._tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
  }

  #merchantName(merchantId: number | undefined): string {
    if (!merchantId) return "";
    return this._merchants.find((m) => m.id === merchantId)?.name ?? "";
  }

  #formatConditions(rule: MerchantRule): string {
    return rule.conditions
      .map((c) => `${c.operator} "${c.value}"`)
      .join(rule.logic === "and" ? " AND " : " OR ");
  }

  #onRulesPageChange(e: CustomEvent<PageChangeDetail>) {
    this._rulesPage = e.detail.page;
    this._rulesPageSize = e.detail.pageSize;
  }

  #onRulesFilterChange(e: CustomEvent<FilterChangeDetail>) {
    this._rulesFilter = e.detail.filter;
    this._rulesPage = 1;
  }

  #ruleMatchesFilter(rule: MerchantRule): boolean {
    if (!this._rulesFilter) return true;
    const lower = this._rulesFilter.toLowerCase();
    if (rule.conditions.some((c) => c.value.toLowerCase().includes(lower))) return true;
    if (rule.merchantId) {
      const merchant = this._merchants.find((m) => m.id === rule.merchantId);
      if (merchant?.name.toLowerCase().includes(lower)) return true;
    }
    if (rule.tagIds.some((id) => this.#tagName(id).toLowerCase().includes(lower))) return true;
    return false;
  }

  #onRulesSortClick(col: RulesSortColumn) {
    if (this._rulesSortCol === col) {
      this._rulesSortDir = this._rulesSortDir === "asc" ? "desc" : "asc";
    } else {
      this._rulesSortCol = col;
      this._rulesSortDir = "asc";
    }
    this._rulesPage = 1;
  }

  #rulesSortIndicator(col: RulesSortColumn): string {
    if (this._rulesSortCol !== col) return "";
    return this._rulesSortDir === "asc" ? " ▲" : " ▼";
  }

  #sortedRules(rules: MerchantRule[]): MerchantRule[] {
    const col = this._rulesSortCol;
    const dir = this._rulesSortDir === "asc" ? 1 : -1;
    return [...rules].sort((a, b) => {
      let cmp = 0;
      if (col === "conditions") {
        const aVal = a.conditions[0]?.value ?? "";
        const bVal = b.conditions[0]?.value ?? "";
        cmp = aVal.localeCompare(bVal);
      } else if (col === "merchant") {
        cmp = this.#merchantName(a.merchantId).localeCompare(this.#merchantName(b.merchantId));
      } else if (col === "tags") {
        const aNames = a.tagIds.map((id) => this.#tagName(id)).join(",");
        const bNames = b.tagIds.map((id) => this.#tagName(id)).join(",");
        cmp = aNames.localeCompare(bNames);
      }
      return cmp * dir;
    });
  }

  #onUnmerchantedPageChange(e: CustomEvent<PageChangeDetail>) {
    this._unmerchantedPage = e.detail.page;
    this._unmerchantedPageSize = e.detail.pageSize;
  }

  #onUnmerchantedFilterChange(e: CustomEvent<FilterChangeDetail>) {
    this._unmerchantedFilter = e.detail.filter;
    this._unmerchantedPage = 1;
  }

  #selectTransaction(tx: Transaction) {
    this._prefillDescription = tx.originalDescription;
    this._showEditor = true;
  }

  render() {
    return html`
      <h2>Merchant Rules</h2>

      <div class="sections-grid">
      ${
        this._rules.length > 0
          ? html`
            <div class="section">
              <h3>Existing Rules</h3>
              ${(() => {
                const filteredRules = this._rules.filter((r) => this.#ruleMatchesFilter(r));
                const sortedRules = this.#sortedRules(filteredRules);
                return html`
                  <paginated-table
                    .totalItems=${filteredRules.length}
                    .defaultPageSize=${10}
                    storageKey="rules"
                    ?filterable=${true}
                    @page-change=${this.#onRulesPageChange}
                    @filter-change=${this.#onRulesFilterChange}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th class="sortable" @click=${() => this.#onRulesSortClick("conditions")}>
                            Conditions${this.#rulesSortIndicator("conditions")}
                          </th>
                          <th class="sortable" @click=${() => this.#onRulesSortClick("merchant")}>
                            Merchant${this.#rulesSortIndicator("merchant")}
                          </th>
                          <th class="sortable" @click=${() => this.#onRulesSortClick("tags")}>
                            Tags${this.#rulesSortIndicator("tags")}
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        ${sortedRules
                          .slice(
                            (this._rulesPage - 1) * this._rulesPageSize,
                            this._rulesPage * this._rulesPageSize,
                          )
                          .map(
                            (rule) => html`
                              <tr>
                                <td class="condition-summary">${this.#formatConditions(rule)}</td>
                                <td>${this.#merchantName(rule.merchantId)}</td>
                                <td>
                                  ${rule.tagIds.map((id) => this.#tagLabel(id)).join(", ") || "None"}
                                </td>
                                <td>
                                  <button @click=${() => this.#editRule(rule)}>Edit</button>
                                  <button
                                    class="delete-btn"
                                    @click=${() => this.#deleteRule(rule.id!)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            `,
                          )}
                      </tbody>
                    </table>
                  </paginated-table>
                `;
              })()}
            </div>
          `
          : html`
              <p>No rules defined.</p>
            `
      }

      ${
        this._showEditor
          ? html`
            <budgee-modal
              heading=${this._editingRule ? "Edit Rule" : "Create Rule"}
              @modal-close=${() => {
                this._showEditor = false;
                this._editingRule = null;
                this._editingMerchantName = "";
                this._prefillDescription = "";
              }}
            >
              <rule-editor
                .tags=${this._tags}
                .merchants=${this._merchants}
                .prefillDescription=${this._prefillDescription}
                .editingRule=${this._editingRule}
                .editingMerchantName=${this._editingMerchantName}
                @rule-saved=${this.#onRuleSaved}
              ></rule-editor>
            </budgee-modal>
          `
          : nothing
      }

      ${
        this._pendingRerunRule
          ? html`
            <budgee-modal
              heading="Apply Rule"
              @modal-close=${() => {
                this._pendingRerunRule = null;
              }}
            >
              <p>Apply this rule to existing unmerchanted transactions?</p>
              <div class="confirm-actions">
                <button @click=${async () => {
                  await this.#applyRuleToExisting(this._pendingRerunRule!);
                  this._pendingRerunRule = null;
                  await this.#refresh();
                }}>Apply</button>
                <button class="delete-btn" @click=${() => {
                  this._pendingRerunRule = null;
                }}>Skip</button>
              </div>
            </budgee-modal>
          `
          : nothing
      }

      ${
        this._unmerchanted.length > 0
          ? html`
            <div class="section">
              <h3>Unmerchanted Transactions</h3>
              ${(() => {
                const lower = this._unmerchantedFilter.toLowerCase();
                const filtered = lower
                  ? this._unmerchanted.filter((tx) =>
                      tx.originalDescription.toLowerCase().includes(lower),
                    )
                  : this._unmerchanted;
                return html`
                  <paginated-table
                    .totalItems=${filtered.length}
                    .defaultPageSize=${20}
                    storageKey="unmerchanted"
                    ?filterable=${true}
                    @page-change=${this.#onUnmerchantedPageChange}
                    @filter-change=${this.#onUnmerchantedFilterChange}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${filtered
                          .slice(
                            (this._unmerchantedPage - 1) * this._unmerchantedPageSize,
                            this._unmerchantedPage * this._unmerchantedPageSize,
                          )
                          .map(
                            (tx) => html`
                          <tr class="clickable-row" @click=${() => this.#selectTransaction(tx)}>
                            <td>${tx.date}</td>
                            <td>${tx.originalDescription}</td>
                            <td class=${tx.amount < 0 ? "amount-negative" : "amount-positive"}>${tx.amount.toFixed(2)}</td>
                          </tr>
                        `,
                          )}
                      </tbody>
                    </table>
                  </paginated-table>
                `;
              })()}
            </div>
          `
          : nothing
      }

      <rule-overlap .refreshTrigger=${this._overlapRefresh}></rule-overlap>
      </div>
    `;
  }
}
