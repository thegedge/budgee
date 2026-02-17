import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import { MerchantRules } from "../../data/merchantRules";
import { iconButtonStyles } from "../iconButtonStyles";
import { Merchants } from "../../data/merchants";
import { Tags } from "../../data/tags";
import { Transactions } from "../../data/transactions";
import type { Merchant, MerchantRule, Tag, Transaction } from "../../database/types";
import { BusyMixin, busyStyles } from "../shared/busyMixin";
import "../shared/modal";
import "../shared/paginatedTable";
import type { FilterChangeDetail, PageChangeDetail } from "../shared/paginatedTable";
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
export class RuleManager extends BusyMixin(LitElement) {
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
    busyStyles,
    tableStyles,
    iconButtonStyles,
    css`
      :host {
        display: block;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .section h3 {
        margin-top: 0;
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
      .secondary-btn {
        background-color: var(--budgee-danger);
      }
      .secondary-btn:hover {
        background-color: var(--budgee-danger-hover);
      }
      .confirm-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
      }
      .condition-summary {
        font-size: 0.85rem;
        color: var(--budgee-text-muted);
      }
      .actions {
        white-space: nowrap;
      }
      .sections-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      @media (min-width: 1600px) {
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
    this._rules = await MerchantRules.all();
    this._tags = await Tags.all();
    this._merchants = await Merchants.all();
    const allTx = await Transactions.all();
    this._unmerchanted = allTx.filter((t) => t.merchantId === undefined);
    this._overlapRefresh++;
  }

  async #onRuleSaved(e: CustomEvent) {
    await this.withBusy(async () => {
      const { id, logic, conditions, tagIds, newTagNames, merchantName } = e.detail;

      const allTagIds = [...(tagIds as string[])];
      if (newTagNames?.length) {
        for (const name of newTagNames as string[]) {
          const existing = await Tags.byName(name);
          const tagId = existing?.id ?? (await Tags.create(name));
          allTagIds.push(tagId);
        }
      }

      let merchantId: string | undefined;
      if (merchantName) {
        const existing = await Merchants.byName(merchantName);
        merchantId = existing?.id ?? (await Merchants.create(merchantName));
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
          await MerchantRules.put(merged);
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
        await MerchantRules.put(rule);
        this._showEditor = false;
        this._editingRule = null;
        this._editingMerchantName = "";
        this._prefillDescription = "";
        this._pendingRerunRule = rule;
      } else {
        rule.id = await MerchantRules.create(rule);
        await MerchantRules.applyToTransactions(rule);
        this._showEditor = false;
        this._editingRule = null;
        this._editingMerchantName = "";
        this._prefillDescription = "";
      }

      await this.#refresh();
    });
  }

  async #deleteRule(id: string) {
    await this.withBusy(async () => {
      await MerchantRules.remove(id);
      await this.#refresh();
    });
  }

  async #editRule(rule: MerchantRule) {
    let merchantName = "";
    if (rule.merchantId) {
      const merchant = await Merchants.get(rule.merchantId);
      merchantName = merchant?.name ?? "";
    }
    this._editingRule = rule;
    this._editingMerchantName = merchantName;
    this._showEditor = true;
  }

  #tagLabel(tagId: string): string {
    const tag = this._tags.find((t) => t.id === tagId);
    if (!tag) return `#${tagId}`;
    return tag.icon ? `${tag.icon} ${tag.name}` : tag.name;
  }

  #tagName(tagId: string): string {
    return this._tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
  }

  #merchantName(merchantId: string | undefined): string {
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
                                <td class="actions">
                                  <button class="icon-btn" aria-label="Edit rule" @click=${() => this.#editRule(rule)}>${unsafeSVG(wrenchIcon)}</button>
                                  <button class="icon-btn icon-btn--danger" aria-label="Delete rule" @click=${() => this.#deleteRule(rule.id)}>${unsafeSVG(trash2Icon)}</button>
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
                  await MerchantRules.applyToTransactions(this._pendingRerunRule!);
                  this._pendingRerunRule = null;
                  await this.#refresh();
                }}>Apply</button>
                <button class="secondary-btn" @click=${() => {
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
