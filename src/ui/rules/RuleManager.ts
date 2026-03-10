import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import alertTriangleIcon from "lucide-static/icons/triangle-alert.svg?raw";
import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
import { formatAmount } from "../../formatAmount";
import { Account } from "../../models/Account";
import { Merchant } from "../../models/Merchant";
import { MerchantRule, prepareTransaction } from "../../models/MerchantRule";
import { Tag } from "../../models/Tag";
import { Transaction } from "../../models/Transaction";
import { buttonStyles } from "../buttonStyles";
import { showToast } from "../shared/toast";
import { iconButtonStyles } from "../iconButtonStyles";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import { DataSubscriptionController } from "../DataSubscriptionController";
import "../shared/Badge";
import "../shared/EmptyState";
import "../shared/Modal";
import "../shared/PaginatedTable";
import "../shared/SkeletonLoader";
import "../tags/TagPills";
import "./RuleEditor";
import "./RuleOverlap";
import type { OverlapPair } from "./RuleOverlap";

declare global {
  interface HTMLElementTagNameMap {
    "rule-manager": RuleManager;
  }
}

@customElement("rule-manager")
export class RuleManager extends BusyMixin(LitElement) {
  @state()
  private _rules: MerchantRule[] | null = null;

  @state()
  private _tags: Tag[] = [];

  @state()
  private _merchants: Merchant[] = [];

  @state()
  private _unmerchanted: Transaction[] = [];

  @state()
  private _accounts: Account[] = [];

  @state()
  private _prefillDescription = "";

  @state()
  private _showEditor = false;

  @state()
  private _editingRule: MerchantRule | null = null;

  @state()
  private _editingMerchantName = "";

  @state()
  private _unmatchedRuleIds = new Set<string>();

  @state()
  private _overlapData: OverlapPair[] = [];

  static styles = [
    buttonStyles,
    busyStyles,
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

  constructor() {
    super();
    new DataSubscriptionController(
      this,
      [MerchantRule.subscribe, Tag.subscribe, Merchant.subscribe, Transaction.subscribe],
      () => this.#refresh(),
    );
  }

  async #refresh() {
    const rules = await MerchantRule.all();
    const tags = await Tag.all();
    const merchants = await Merchant.all();
    const accounts = await Account.all();
    const accountMap = Account.toLookup(accounts);
    const allTx = await Transaction.all();
    const unmerchanted = allTx.filter((t) => t.merchantId === undefined);

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

    this._rules = rules;
    this._tags = tags;
    this._merchants = merchants;
    this._accounts = accounts;
    this._unmerchanted = unmerchanted;
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

      if (apply) {
        await MerchantRule.applyToTransactions(savedRule);
      }

      showToast({ message: id ? "Rule updated" : "Rule created", type: "success" });
      await this.#refresh();
    });
  }

  async #onRuleMerge(e: CustomEvent) {
    await this.withBusy(async () => {
      const { existingRuleId, conditions, apply } = e.detail;
      const existingRule = this._rules!.find((r) => r.id === existingRuleId);
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

      if (apply) {
        await MerchantRule.applyToTransactions(mergedData);
      }

      showToast({ message: "Rules merged", type: "success" });
      await this.#refresh();
    });
  }

  async #deleteRule(id: string) {
    await this.withBusy(async () => {
      await MerchantRule.remove(id);
      showToast({ message: "Rule deleted", type: "success" });
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

  #selectTransaction(tx: Transaction) {
    this._prefillDescription = tx.description;
    this._showEditor = true;
  }

  #renderRuleRow(rule: MerchantRule) {
    return html`
      <tr>
        <td class="condition-summary">
          ${this.#formatConditions(rule)}
          ${this._unmatchedRuleIds.has(rule.id) ? html`<ui-badge variant="warning" title="This rule matches no transactions">${unsafeSVG(alertTriangleIcon)} No matches</ui-badge>` : nothing}
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
      <paginated-table
        .items=${rules}
        .columns=${["Conditions", "Merchant", "Tags", {}]}
        .renderRow=${(rule: MerchantRule) => this.#renderRuleRow(rule)}
      ></paginated-table>
    `;
  }

  #renderExistingRules() {
    if (this._rules!.length === 0)
      return html`
        <budgee-empty-state
          heading="No rules yet"
          description="Create a rule to automatically assign merchants and tags to transactions."
        >
          <button @click=${() => {
            this._showEditor = true;
          }}>Create Rule</button>
        </budgee-empty-state>
      `;

    return html`
      <div class="section">
        <h3>Existing Rules</h3>
        <paginated-table
          .items=${this._rules!}
          .defaultPageSize=${10}
          storageKey="rules"
          .columns=${[
            { label: "Conditions", sortKey: "conditions" },
            { label: "Merchant", sortKey: "merchant" },
            { label: "Tags", sortKey: "tags" },
            {},
          ]}
          .comparators=${{
            conditions: (a: MerchantRule, b: MerchantRule) => {
              const aVal = a.conditions[0]?.value ?? "";
              const bVal = b.conditions[0]?.value ?? "";
              return aVal.localeCompare(bVal);
            },
            merchant: (a: MerchantRule, b: MerchantRule) =>
              this.#merchantName(a.merchantId).localeCompare(this.#merchantName(b.merchantId)),
            tags: (a: MerchantRule, b: MerchantRule) => {
              const aNames = a.tagIds.map((id) => this.#tagName(id)).join(",");
              const bNames = b.tagIds.map((id) => this.#tagName(id)).join(",");
              return aNames.localeCompare(bNames);
            },
          }}
          .filterFn=${(rule: MerchantRule, filter: string) => {
            const lower = filter.toLowerCase();
            if (rule.conditions.some((c) => c.value.toLowerCase().includes(lower))) return true;
            if (rule.merchantId) {
              const merchant = this._merchants.find((m) => m.id === rule.merchantId);
              if (merchant?.name.toLowerCase().includes(lower)) return true;
            }
            if (rule.tagIds.some((id) => this.#tagName(id).toLowerCase().includes(lower)))
              return true;
            return false;
          }}
          defaultSortCol="conditions"
          defaultSortDir="asc"
          .renderRow=${(rule: MerchantRule) => this.#renderRuleRow(rule)}
        ></paginated-table>
      </div>
    `;
  }

  #renderUnmatchedRules() {
    const unmatchedRules = this._rules!.filter((r) => this._unmatchedRuleIds.has(r.id));
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

    return html`
      <div class="section">
        <h3>Unmerchanted Transactions</h3>
        <paginated-table
          .items=${this._unmerchanted}
          .defaultPageSize=${20}
          storageKey="unmerchanted"
          .columns=${["Date", "Description", "Amount"]}
          .filterFn=${(tx: Transaction, filter: string) =>
            tx.description.toLowerCase().includes(filter.toLowerCase())}
          .renderRow=${(tx: Transaction) => html`
            <tr class="clickable-row" @click=${() => this.#selectTransaction(tx)}>
              <td>${tx.date}</td>
              <td>${tx.description}</td>
              <td class=${tx.amount < 0 ? "amount-negative" : "amount-positive"}>${formatAmount(tx.amount)}</td>
            </tr>
          `}
        ></paginated-table>
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
        }}
      >
        <rule-editor
          .tags=${this._tags}
          .merchants=${this._merchants}
          .rules=${this._rules}
          .prefillDescription=${this._prefillDescription}
          .accounts=${this._accounts}
          .editingRule=${this._editingRule}
          .editingMerchantName=${this._editingMerchantName}
          @rule-saved=${this.#onRuleSaved}
          @rule-merge=${this.#onRuleMerge}
        ></rule-editor>
      </budgee-modal>
    `;
  }

  render() {
    if (this._rules === null) {
      return html`
        <div class="sections-grid">
          ${[0, 1, 2, 3].map(
            () => html`
              <div class="section">
                <budgee-skeleton variant="table" rows="3"></budgee-skeleton>
              </div>
            `,
          )}
        </div>
      `;
    }

    const merchantLookup = new Map(this._merchants.map((m) => [m.id, m.name]));

    return html`
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
