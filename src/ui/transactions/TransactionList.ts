import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Merchant } from "../../models/Merchant";
import { Tag } from "../../models/Tag";
import { formatAmount } from "../../formatAmount";
import { Transaction } from "../../models/Transaction";
import { buttonStyles } from "../buttonStyles";
import { inputStyles } from "../inputStyles";
import { importTransactions } from "../../import/importTransactions";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { hideLoadingOverlay, showLoadingOverlay } from "../shared/LoadingOverlay";
import { showToast } from "../shared/toast";
import { navigate } from "../navigate";
import "../merchants/MerchantAutocomplete";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import "../shared/Modal";
import "../shared/PaginatedTable";
import { PaginatedTable } from "../shared/PaginatedTable";
import { DataSubscriptionController } from "../DataSubscriptionController";
import "../shared/EmptyState";
import "../shared/SkeletonLoader";
import "../tags/TagAutocomplete";
import "../tags/TagPills";
import "./TransactionImporter";

declare global {
  interface HTMLElementTagNameMap {
    "transaction-list": TransactionList;
  }
}

@customElement("transaction-list")
export class TransactionList extends BusyMixin(LitElement) {
  @state()
  private _transactions: Transaction[] | null = null;

  @state()
  private _tags: Tag[] = [];

  private _tagMap = new Map<string, Tag>();

  @state()
  private _merchants = new Map<string, string>();

  @state()
  private _merchantList: Merchant[] = [];

  @state()
  private _selectedIds = new Set<string>();

  @state()
  private _excludeTagIds = new Set<string>();

  @state()
  private _noMerchant = false;

  @state()
  private _bulkMerchantName = "";

  @state()
  private _showImporter = false;

  @state()
  private _importFile?: File;

  static styles = [
    buttonStyles,
    busyStyles,
    inputStyles,
    css`
      .merchant-link {
        color: var(--budgee-primary);
        cursor: pointer;
        text-decoration: underline;
      }
      .col-amount {
        width: 8rem;
      }
      .col-date {
        white-space: nowrap;
      }
      .col-checkbox {
        width: min-content;
      }
      .bulk-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0.75rem;
        background: var(--budgee-bg);
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
      }
      .bulk-bar .selected-count {
        font-weight: 600;
        white-space: nowrap;
      }
      .bulk-bar label {
        font-size: 0.85rem;
        white-space: nowrap;
      }
      .bulk-bar .bulk-action {
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      .bulk-bar button {
        padding: 4px 10px;
        cursor: pointer;
      }
      .filter-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0.75rem;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
        font-size: 0.85rem;
      }
      .filter-group {
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      .filter-group select {
        padding: 2px 6px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        font-size: 0.85rem;
      }
      .active-filters {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .filter-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 2px 8px;
        border-radius: 12px;
        background: var(--budgee-bg);
        border: 1px solid var(--budgee-border);
        font-size: 0.8rem;
      }
      .chip-remove {
        all: unset;
        cursor: pointer;
        font-size: 0.9rem;
        line-height: 1;
        padding: 0 2px;
      }
      .import-toggle {
        padding: 0.4rem 0.8rem;
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
      }
      mark {
        background: lch(from var(--budgee-primary) l c h / 0.2);
        color: inherit;
        border-radius: 2px;
        padding: 0 1px;
      }
    `,
  ];

  constructor() {
    super();
    new DataSubscriptionController(
      this,
      [Transaction.subscribe, Tag.subscribe, Merchant.subscribe],
      () => this.#refresh(),
    );
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("budgee-import-csv", this.#onCsvDrop);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("budgee-import-csv", this.#onCsvDrop);
  }

  #onCsvDrop = (e: Event) => {
    const file = (e as CustomEvent).detail.file as File;
    this._importFile = file;
    this._showImporter = true;
  };

  async #onImportStart(e: CustomEvent) {
    const { data, mapping, accountId, importMode } = e.detail;
    this._showImporter = false;
    this._importFile = undefined;
    this._transactions = null;

    showLoadingOverlay("Importing transactions...");
    try {
      await importTransactions(data, mapping, { accountId, importMode });
      await this.#refresh();
      await this.updateComplete;
    } finally {
      hideLoadingOverlay();
    }
  }

  async #refresh() {
    const [transactions, tags, merchants] = await Promise.all([
      Transaction.all(),
      Tag.all(),
      Merchant.all(),
    ]);
    this._transactions = transactions;
    this._tags = tags;
    this._tagMap = new Map(tags.map((t) => [t.id, t]));
    this._merchants = new Map(merchants.map((m) => [m.id, m.name]));
    this._merchantList = merchants;
  }

  #tag(tagId: string): Tag | undefined {
    return this._tagMap.get(tagId);
  }

  #tagName(tagId: string): string {
    return this.#tag(tagId)?.name ?? `#${tagId}`;
  }

  #merchantName(merchantId: string | undefined): string {
    if (!merchantId) return "";
    return this._merchants.get(merchantId) ?? "";
  }

  #humanizeDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  #navigateToMerchant(id: string) {
    navigate(`/merchants/${id}`);
  }

  #navigateToTransaction(id: string) {
    navigate(`/transactions/${id}`);
  }

  #toggleSelection(id: string) {
    const next = new Set(this._selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this._selectedIds = next;
  }

  #toggleSelectAll(pageTransactions: Transaction[]) {
    const pageIds = pageTransactions.map((t) => t.id);
    const allSelected = pageIds.every((id) => this._selectedIds.has(id));
    if (allSelected) {
      const next = new Set(this._selectedIds);
      for (const id of pageIds) next.delete(id);
      this._selectedIds = next;
    } else {
      this._selectedIds = new Set([...this._selectedIds, ...pageIds]);
    }
  }

  #clearSelection() {
    this._selectedIds = new Set();
    this._bulkMerchantName = "";
  }

  async #bulkAddTag(e: CustomEvent) {
    const tag = e.detail.tag as Tag;
    const tagId = tag.id;
    await this.#applyTagToSelected(tagId);
  }

  async #bulkCreateTag(e: CustomEvent) {
    const name = e.detail.name as string;
    const tag = await Tag.create(name);
    await this.#applyTagToSelected(tag.id);
  }

  async #applyTagToSelected(tagId: string) {
    if (!this._transactions) return;
    await this.withBusy(async () => {
      const toUpdate = this._transactions!.filter(
        (t) => this._selectedIds.has(t.id) && !t.tagIds.includes(tagId),
      ).map((t) => ({ ...t, tagIds: [...t.tagIds, tagId] }));
      if (toUpdate.length > 0) {
        await Transaction.bulkPut(toUpdate);
      }
      showToast({ message: `Tag applied to ${toUpdate.length} transaction(s)`, type: "success" });
      this.#clearSelection();
      await this.#refresh();
    });
  }

  async #bulkSetMerchant() {
    const name = this._bulkMerchantName.trim();
    if (!name || !this._transactions) return;

    await this.withBusy(async () => {
      let merchant = this._merchantList.find((m) => m.name.toLowerCase() === name.toLowerCase());
      if (!merchant) {
        merchant = await Merchant.create(name);
      }

      const toUpdate = this._transactions!.filter((t) => this._selectedIds.has(t.id)).map((t) => ({
        ...t,
        merchantId: merchant!.id,
      }));
      if (toUpdate.length > 0) {
        await Transaction.bulkPut(toUpdate);
      }
      showToast({
        message: `Merchant assigned to ${toUpdate.length} transaction(s)`,
        type: "success",
      });
      this.#clearSelection();
      await this.#refresh();
    });
  }

  async #bulkDelete() {
    if (!this._transactions) return;
    const count = this._selectedIds.size;
    const confirmed = await ConfirmDialog.show({
      heading: "Delete Transactions",
      message: `Delete ${count} selected transaction${count === 1 ? "" : "s"}? This cannot be undone.`,
      confirmLabel: "Delete",
      danger: true,
    });
    if (!confirmed) return;

    await this.withBusy(async () => {
      const ids = [...this._selectedIds];
      await Transaction.bulkRemove(ids);
      showToast({ message: `${ids.length} transaction(s) deleted`, type: "success" });
      this.#clearSelection();
      await this.#refresh();
    });
  }

  #toggleExcludeTag(tagId: string) {
    const next = new Set(this._excludeTagIds);
    if (next.has(tagId)) {
      next.delete(tagId);
    } else {
      next.add(tagId);
    }
    this._excludeTagIds = next;
  }

  #toggleNoMerchant() {
    this._noMerchant = !this._noMerchant;
  }

  #renderFilterBar() {
    const hasActiveFilters = this._excludeTagIds.size > 0 || this._noMerchant;

    return html`
      <div class="filter-bar">
        <div class="filter-group">
          <label>Exclude tag:</label>
          <select @change=${(e: Event) => {
            const value = (e.target as HTMLSelectElement).value;
            if (value) this.#toggleExcludeTag(value);
            (e.target as HTMLSelectElement).value = "";
          }}>
            <option value="">Select…</option>
            ${this._tags
              .filter((t) => !this._excludeTagIds.has(t.id))
              .map((t) => html`<option value=${t.id}>${t.name}</option>`)}
          </select>
        </div>
        <div class="filter-group">
          <label>
            <input type="checkbox" .checked=${this._noMerchant} @change=${this.#toggleNoMerchant} />
            No merchant
          </label>
        </div>
        ${
          hasActiveFilters
            ? html`
            <div class="active-filters">
              ${[...this._excludeTagIds].map(
                (id) => html`
                  <span class="filter-chip">
                    Not: ${this.#tagName(id)}
                    <button class="chip-remove" @click=${() => this.#toggleExcludeTag(id)}>×</button>
                  </span>
                `,
              )}
              ${
                this._noMerchant
                  ? html`<span class="filter-chip">
                    No merchant
                    <button class="chip-remove" @click=${this.#toggleNoMerchant}>×</button>
                  </span>`
                  : nothing
              }
            </div>
          `
            : nothing
        }
      </div>
    `;
  }

  #renderBulkBar() {
    if (this._selectedIds.size === 0) return nothing;

    return html`
      <div class="bulk-bar">
        <span class="selected-count">${this._selectedIds.size} selected</span>
        <div class="bulk-action">
          <label>Tag:</label>
          <tag-autocomplete
            .tags=${this._tags}
            .selectedTagIds=${[]}
            .excludeIds=${[]}
            @tag-selected=${this.#bulkAddTag}
            @tag-created=${this.#bulkCreateTag}
          ></tag-autocomplete>
        </div>
        <div class="bulk-action">
          <label>Merchant:</label>
          <merchant-autocomplete
            .merchants=${this._merchantList}
            .value=${this._bulkMerchantName}
            @merchant-changed=${(e: CustomEvent) => {
              this._bulkMerchantName = e.detail.name as string;
            }}
          ></merchant-autocomplete>
          <button @click=${this.#bulkSetMerchant} ?disabled=${!this._bulkMerchantName.trim()}>
            Set
          </button>
        </div>
        <button class="danger" @click=${this.#bulkDelete}>Delete selected</button>
        <button @click=${this.#clearSelection}>Clear selection</button>
      </div>
    `;
  }

  render() {
    if (this._transactions === null) {
      return html`
        <budgee-skeleton variant="table" rows="8"></budgee-skeleton>
      `;
    }

    if (this._transactions.length === 0) {
      return html`
        <budgee-empty-state
          heading="No transactions yet"
          description="Import a CSV file to get started."
        >
          <button class="import-toggle" @click=${() => {
            this._showImporter = true;
          }}>Import CSV</button>
        </budgee-empty-state>
        ${
          this._showImporter
            ? html`<budgee-modal heading="Import Transactions" @modal-close=${() => {
                this._showImporter = false;
                this._importFile = undefined;
              }}><transaction-importer .file=${this._importFile} @import-start=${this.#onImportStart}></transaction-importer></budgee-modal>`
            : ""
        }
      `;
    }

    // Get current page items from the paginated-table element so the
    // "select all on page" checkbox reflects the actual visible rows.
    const tableEl = this.shadowRoot?.querySelector<PaginatedTable<Transaction>>("paginated-table");
    const pageTransactions = tableEl ? tableEl.currentItems : this._transactions.slice(0, 50);
    const pageIds = pageTransactions.map((t) => t.id);
    const allPageSelected = pageIds.length > 0 && pageIds.every((id) => this._selectedIds.has(id));

    const columns: Array<
      string | { label?: string; sortKey?: string; class?: string; header?: TemplateResult }
    > = [
      {
        header: html`<input
          type="checkbox"
          .checked=${allPageSelected}
          @change=${() => this.#toggleSelectAll(pageTransactions)}
        />`,
        class: "col-checkbox",
      },
      { label: "Date", sortKey: "date", class: "col-date" },
      { label: "Merchant", sortKey: "merchant" },
      { label: "Description", sortKey: "description" },
      { label: "Amount", sortKey: "amount", class: "col-amount" },
      { label: "Tags", sortKey: "tags", class: "col-tags" },
    ];

    return html`
      <button class="import-toggle" @click=${() => {
        this._showImporter = true;
      }}>
        Import CSV
      </button>
      ${
        this._showImporter
          ? html`<budgee-modal heading="Import Transactions" @modal-close=${() => {
              this._showImporter = false;
            }}><transaction-importer .file=${this._importFile} @import-start=${this.#onImportStart}></transaction-importer></budgee-modal>`
          : nothing
      }
      ${this.#renderFilterBar()}
      ${this.#renderBulkBar()}
      <paginated-table
        .items=${this._transactions}
        .defaultPageSize=${50}
        storageKey="transactions"
        .columns=${columns}
        .comparators=${{
          date: (a: Transaction, b: Transaction) => a.date.localeCompare(b.date),
          merchant: (a: Transaction, b: Transaction) =>
            this.#merchantName(a.merchantId).localeCompare(this.#merchantName(b.merchantId)),
          description: (a: Transaction, b: Transaction) =>
            a.description.localeCompare(b.description),
          amount: (a: Transaction, b: Transaction) => a.amount - b.amount,
          tags: (a: Transaction, b: Transaction) => {
            const aNames = a.tagIds.map((id) => this.#tagName(id)).join(",");
            const bNames = b.tagIds.map((id) => this.#tagName(id)).join(",");
            return aNames.localeCompare(bNames);
          },
        }}
        .filterFn=${(t: Transaction, filter: string) => {
          if (this._noMerchant && t.merchantId) return false;
          if (t.tagIds.some((id) => this._excludeTagIds.has(id))) return false;
          if (!filter) return true;
          const lower = filter.toLowerCase();
          if (t.description.toLowerCase().includes(lower)) return true;
          if (t.tagIds.some((id) => this.#tagName(id).toLowerCase().includes(lower))) return true;
          if (t.merchantId && this._merchants.get(t.merchantId)?.toLowerCase().includes(lower))
            return true;
          if (t.date.includes(lower)) return true;
          if (t.amount.toFixed(2).includes(lower)) return true;
          return false;
        }}
        defaultSortCol="date"
        defaultSortDir="desc"
        .renderRow=${(t: Transaction) => html`
          <tr class="clickable-row" @click=${() => this.#navigateToTransaction(t.id)}>
            <td class="col-checkbox" @click=${(e: Event) => e.stopPropagation()}>
              <input
                type="checkbox"
                .checked=${this._selectedIds.has(t.id)}
                @change=${() => this.#toggleSelection(t.id)}
              />
            </td>
            <td class="col-date">${this.#humanizeDate(t.date)}</td>
            <td>${
              t.merchantId && this._merchants.has(t.merchantId)
                ? html`<a class="merchant-link" @click=${(e: Event) => {
                    e.stopPropagation();
                    this.#navigateToMerchant(t.merchantId!);
                  }}>${this._merchants.get(t.merchantId!)}</a>`
                : ""
            }</td>
            <td>${t.description}</td>
            <td class="col-amount ${t.amount < 0 ? "amount-negative" : "amount-positive"}">
              ${formatAmount(t.amount)}
            </td>
            <td class="col-tags">
              <tag-pills .tags=${this._tags} .tagIds=${t.tagIds}></tag-pills>
            </td>
          </tr>
        `}
      ></paginated-table>
    `;
  }
}
