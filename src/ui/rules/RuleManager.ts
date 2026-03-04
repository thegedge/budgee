import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import alertTriangleIcon from "lucide-static/icons/triangle-alert.svg?raw";
import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
import { debounce } from "../../debounce";
import { Account } from "../../models/Account";
import { Merchant } from "../../models/Merchant";
import { MerchantRule, prepareTransaction } from "../../models/MerchantRule";
import { Tag } from "../../models/Tag";
import { Transaction } from "../../models/Transaction";
import { buttonStyles } from "../buttonStyles";
import { iconButtonStyles } from "../iconButtonStyles";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import "../shared/Modal";
import "../shared/PaginatedTable";
import type { FilterChangeDetail, PageChangeDetail } from "../shared/PaginatedTable";
import { tableStyles } from "../tableStyles";
import "../tags/TagPills";
import "./RuleEditor";
import "./RuleOverlap";
import type { OverlapPair } from "./RuleOverlap";

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
  private _prefillAccountId = "";

  @state()
  private _showEditor = false;

  @state()
  private _editingRule: MerchantRule | null = null;

  @state()
  private _editingMerchantName = "";

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
  private _unmatchedRuleIds = new Set<string>();

  @state()
  private _overlapData: OverlapPair[] = [];

  static styles = [
    buttonStyles,
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
      .condition-summary {
        font-size: 0.85rem;
        color: var(--budgee-text-muted);
      }
      .actions {
        white-space: nowrap;
      }
      .unmatched-warning {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--budgee-warning, #b5850a);
        font-size: 0.8rem;
      }
      .unmatched-warning svg {
        width: 14px;
        height: 14px;
      }
      .sections-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      @media (min-width: 1600px) {
        .section {
          margin-bottom: 0;
        }
        .sections-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ];

  #subscriptions: { unsubscribe: () => void }[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
    const debouncedRefresh = debounce(() => this.#refresh(), 300);
    Promise.all([
      MerchantRule.subscribe(debouncedRefresh),
      Tag.subscribe(debouncedRefresh),
      Merchant.subscribe(debouncedRefresh),
      Transaction.subscribe(debouncedRefresh),
    ]).then((subs) => {
      this.#subscriptions = subs;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const sub of this.#subscriptions) sub.unsubscribe();
    this.#subscriptions = [];
  }

  async #refresh() {
    this._rules = await MerchantRule.all();
    this._tags = await Tag.all();
    this._merchants = await Merchant.all();
    const accountMap = Account.toLookup(await Account.all());
    const allTx = await Transaction.all();
    this._unmerchanted = allTx.filter((t) => t.merchantId === undefined);

    // Single pass: compute unmatched rules + overlap pairs
    const rules = this._rules;
    const matchedRuleIds = new Set<string>();
    const pairCounts = new Map<string, OverlapPair>();
    const preparedTxs = allTx.map((t) => prepareTransaction(t, accountMap));

    for (let ti = 0; ti < allTx.length; ti++) {
      const tx = allTx[ti];
      const ptx = preparedTxs[ti];
      const matching: MerchantRule[] = [];
      for (const rule of rules) {
        if (rule.matches(ptx)) {
          matchedRuleIds.add(rule.id);
          matching.push(rule);
        }
      }
      if (matching.length >= 2) {
        for (let i = 0; i < matching.length; i++) {
          for (let j = i + 1; j < matching.length; j++) {
            const key = [matching[i].id, matching[j].id].sort().join("-");
            const existing = pairCounts.get(key);
            if (existing) {
              existing.count++;
              existing.samples.add(tx.description);
            } else {
              pairCounts.set(key, {
                ruleA: matching[i],
                ruleB: matching[j],
                count: 1,
                samples: new Set([tx.description]),
              });
            }
          }
        }
      }
    }

    this._unmatchedRuleIds = new Set(
      rules.filter((r) => !matchedRuleIds.has(r.id)).map((r) => r.id),
    );
    this._overlapData = [...pairCounts.values()].sort((a, b) => b.count - a.count);
  }

  async #onRuleSaved(e: CustomEvent) {
    await this.withBusy(async () => {
      const { id, logic, conditions, tagIds, newTagNames, merchantName, apply } = e.detail;

      const allTagIds = [...(tagIds as string[])];
      if (newTagNames?.length) {
        for (const name of newTagNames as string[]) {
          const existing = await Tag.byName(name);
          const tagId = existing?.id ?? (await Tag.create(name)).id;
          allTagIds.push(tagId);
        }
      }

      let merchantId: string | undefined;
      if (merchantName) {
        const existing = await Merchant.byName(merchantName);
        merchantId = existing?.id ?? (await Merchant.create(merchantName)).id;
      }

      const ruleData = { logic, conditions, merchantId, tagIds: allTagIds };

      let savedRule: MerchantRule;
      if (id) {
        await MerchantRule.put({ ...ruleData, id });
        savedRule = new MerchantRule({ ...ruleData, id });
      } else {
        savedRule = await MerchantRule.create(ruleData);
      }

      this._showEditor = false;
      this._editingRule = null;
      this._editingMerchantName = "";
      this._prefillDescription = "";
      this._prefillAccountId = "";

      if (apply) {
        await MerchantRule.applyToTransactions(savedRule);
      }

      await this.#refresh();
    });
  }

  async #onRuleMerge(e: CustomEvent) {
    await this.withBusy(async () => {
      const { existingRuleId, conditions, apply } = e.detail;
      const existingRule = this._rules.find((r) => r.id === existingRuleId);
      if (!existingRule) return;

      const mergedData = {
        id: existingRule.id,
        logic: "or" as const,
        conditions: [...existingRule.conditions, ...conditions],
        merchantId: existingRule.merchantId,
        accountId: existingRule.accountId,
        tagIds: existingRule.tagIds,
      };
      await MerchantRule.put(mergedData);

      this._showEditor = false;
      this._editingRule = null;
      this._editingMerchantName = "";
      this._prefillDescription = "";
      this._prefillAccountId = "";

      if (apply) {
        await MerchantRule.applyToTransactions(mergedData);
      }

      await this.#refresh();
    });
  }

  async #deleteRule(id: string) {
    await this.withBusy(async () => {
      await MerchantRule.remove(id);
      await this.#refresh();
    });
  }

  async #editRule(rule: MerchantRule) {
    let merchantName = "";
    if (rule.merchantId) {
      const merchant = await Merchant.get(rule.merchantId);
      merchantName = merchant?.name ?? "";
    }
    this._editingRule = rule;
    this._editingMerchantName = merchantName;
    this._showEditor = true;
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
    this._prefillDescription = tx.description;
    this._prefillAccountId = tx.accountId ?? "";
    this._showEditor = true;
  }

  #renderRuleRow(rule: MerchantRule) {
    return html`
      <tr>
        <td class="condition-summary">
          ${this.#formatConditions(rule)}
          ${this._unmatchedRuleIds.has(rule.id) ? html`<span class="unmatched-warning" title="This rule matches no transactions">${unsafeSVG(alertTriangleIcon)} No matches</span>` : nothing}
        </td>
        <td>${this.#merchantName(rule.merchantId)}</td>
        <td>
          ${rule.tagIds.length > 0 ? html`<tag-pills .tags=${this._tags} .tagIds=${rule.tagIds}></tag-pills>` : "None"}
        </td>
        <td class="actions">
          <button class="icon-btn" title="Edit rule" aria-label="Edit rule" @click=${() => this.#editRule(rule)}>${unsafeSVG(wrenchIcon)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete rule" aria-label="Delete rule" @click=${() => this.#deleteRule(rule.id)}>${unsafeSVG(trash2Icon)}</button>
        </td>
      </tr>
    `;
  }

  #renderRuleTable(rules: MerchantRule[]) {
    return html`
      <table>
        <thead>
          <tr>
            <th>Conditions</th>
            <th>Merchant</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rules.map((rule) => this.#renderRuleRow(rule))}
        </tbody>
      </table>
    `;
  }

  #renderExistingRules() {
    if (this._rules.length === 0)
      return html`
        <p>No rules defined.</p>
      `;

    const filteredRules = this._rules.filter((r) => this.#ruleMatchesFilter(r));
    const sortedRules = this.#sortedRules(filteredRules);
    const pageStart = (this._rulesPage - 1) * this._rulesPageSize;
    const pageRules = sortedRules.slice(pageStart, pageStart + this._rulesPageSize);

    return html`
      <div class="section">
        <h3>Existing Rules</h3>
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
              ${pageRules.map((rule) => this.#renderRuleRow(rule))}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `;
  }

  #renderUnmatchedRules() {
    const unmatchedRules = this._rules.filter((r) => this._unmatchedRuleIds.has(r.id));
    if (unmatchedRules.length === 0) return nothing;

    const count = unmatchedRules.length;
    return html`
      <div class="section">
        <h3>Unmatched Rules</h3>
        <p>${count} rule${count === 1 ? "" : "s"} matching no transactions.</p>
        ${this.#renderRuleTable(unmatchedRules)}
      </div>
    `;
  }

  #renderUnmerchanted() {
    if (this._unmerchanted.length === 0) return nothing;

    const lower = this._unmerchantedFilter.toLowerCase();
    const filtered = lower
      ? this._unmerchanted.filter((tx) => tx.description.toLowerCase().includes(lower))
      : this._unmerchanted;
    const pageStart = (this._unmerchantedPage - 1) * this._unmerchantedPageSize;
    const pageTxs = filtered.slice(pageStart, pageStart + this._unmerchantedPageSize);

    return html`
      <div class="section">
        <h3>Unmerchanted Transactions</h3>
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
              ${pageTxs.map(
                (tx) => html`
                  <tr class="clickable-row" @click=${() => this.#selectTransaction(tx)}>
                    <td>${tx.date}</td>
                    <td>${tx.description}</td>
                    <td class=${tx.amount < 0 ? "amount-negative" : "amount-positive"}>${tx.amount.toFixed(2)}</td>
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `;
  }

  #renderEditor() {
    if (!this._showEditor) return nothing;

    const heading = this._editingRule ? "Edit Rule" : "Create Rule";
    return html`
      <budgee-modal
        heading=${heading}
        @modal-close=${() => {
          this._showEditor = false;
          this._editingRule = null;
          this._editingMerchantName = "";
          this._prefillDescription = "";
          this._prefillAccountId = "";
        }}
      >
        <rule-editor
          .tags=${this._tags}
          .merchants=${this._merchants}
          .rules=${this._rules}
          .prefillDescription=${this._prefillDescription}
          .prefillAccountId=${this._prefillAccountId}
          .editingRule=${this._editingRule}
          .editingMerchantName=${this._editingMerchantName}
          @rule-saved=${this.#onRuleSaved}
          @rule-merge=${this.#onRuleMerge}
        ></rule-editor>
      </budgee-modal>
    `;
  }

  render() {
    const merchantLookup = new Map(this._merchants.map((m) => [m.id, m.name]));

    return html`
      <h2>Merchant Rules</h2>

      <div class="sections-grid">
        ${this.#renderUnmerchanted()}
        ${this.#renderUnmatchedRules()}
        <rule-overlap .overlaps=${this._overlapData} .merchants=${merchantLookup}></rule-overlap>
        ${this.#renderExistingRules()}
      </div>

      ${this.#renderEditor()}
    `;
  }
}
