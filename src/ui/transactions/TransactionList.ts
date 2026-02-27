import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Merchants } from "../../data/Merchants";
import { Tags } from "../../data/Tags";
import { Transactions } from "../../data/Transactions";
import type { Merchant, Tag, Transaction } from "../../database/types";
import { debounce } from "../../debounce";
import { buttonStyles } from "../buttonStyles";
import "../merchants/MerchantAutocomplete";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import "../shared/Modal";
import "../shared/PaginatedTable";
import type { FilterChangeDetail, PageChangeDetail } from "../shared/PaginatedTable";
import { tableStyles } from "../tableStyles";
import "../tags/TagAutocomplete";
import "../tags/TagPills";
import "./TransactionImporter";

declare global {
  interface HTMLElementTagNameMap {
    "transaction-list": TransactionList;
  }
}

type SortColumn = "date" | "merchant" | "description" | "amount" | "tags";
type SortDir = "asc" | "desc";

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
  private _currentPage = 1;

  @state()
  private _pageSize = 50;

  @state()
  private _filter = "";

  @state()
  private _sortCol: SortColumn = "date";

  @state()
  private _sortDir: SortDir = "desc";

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

  static styles = [
    buttonStyles,
    busyStyles,
    tableStyles,
    css`
      tbody tr {
        cursor: pointer;
      }
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
    `,
  ];

  #subscriptions: { unsubscribe: () => void }[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
    document.addEventListener("budgee-import-csv", this.#onCsvDrop);
    const debouncedRefresh = debounce(() => this.#refresh(), 300);
    Promise.all([
      Transactions.subscribe(debouncedRefresh),
      Tags.subscribe(debouncedRefresh),
      Merchants.subscribe(debouncedRefresh),
    ]).then((subs) => {
      this.#subscriptions = subs;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("budgee-import-csv", this.#onCsvDrop);
    for (const sub of this.#subscriptions) sub.unsubscribe();
    this.#subscriptions = [];
  }

  #onCsvDrop = (e: Event) => {
    const file = (e as CustomEvent).detail.file as File;
    this._showImporter = true;
    this.updateComplete.then(() => {
      const importer = this.shadowRoot?.querySelector("transaction-importer");
      if (importer) {
        (importer as import("./TransactionImporter").TransactionImporter).loadFile(file);
      }
    });
  };

  async #onImported() {
    await this.withBusy(async () => {
      this._showImporter = false;
      await this.#refresh();
    });
  }

  async #refresh() {
    const [transactions, tags, merchants] = await Promise.all([
      Transactions.all(),
      Tags.all(),
      Merchants.all(),
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

  #onPageChange(e: CustomEvent<PageChangeDetail>) {
    this._currentPage = e.detail.page;
    this._pageSize = e.detail.pageSize;
  }

  #onFilterChange(e: CustomEvent<FilterChangeDetail>) {
    this._filter = e.detail.filter;
    this._currentPage = 1;
  }

  #matchesFilter(t: Transaction): boolean {
    if (this._noMerchant && t.merchantId) return false;
    if (t.tagIds.some((id) => this._excludeTagIds.has(id))) return false;

    if (!this._filter) return true;
    const lower = this._filter.toLowerCase();
    if (t.originalDescription.toLowerCase().includes(lower)) return true;
    if (t.tagIds.some((id) => this.#tagName(id).toLowerCase().includes(lower))) return true;
    if (t.merchantId && this._merchants.get(t.merchantId)?.toLowerCase().includes(lower))
      return true;
    if (t.date.includes(lower)) return true;
    if (t.amount.toFixed(2).includes(lower)) return true;
    return false;
  }

  #onSortClick(col: SortColumn) {
    if (this._sortCol === col) {
      this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
    } else {
      this._sortCol = col;
      this._sortDir = "asc";
    }
    this._currentPage = 1;
  }

  #sortIndicator(col: SortColumn): string {
    if (this._sortCol !== col) return "";
    return this._sortDir === "asc" ? " ▲" : " ▼";
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

  #sorted(transactions: Transaction[]): Transaction[] {
    const col = this._sortCol;
    const dir = this._sortDir === "asc" ? 1 : -1;
    return [...transactions].sort((a, b) => {
      let cmp = 0;
      if (col === "date") {
        cmp = a.date.localeCompare(b.date);
      } else if (col === "merchant") {
        cmp = this.#merchantName(a.merchantId).localeCompare(this.#merchantName(b.merchantId));
      } else if (col === "description") {
        cmp = a.originalDescription.localeCompare(b.originalDescription);
      } else if (col === "amount") {
        cmp = a.amount - b.amount;
      } else if (col === "tags") {
        const aNames = a.tagIds.map((id) => this.#tagName(id)).join(",");
        const bNames = b.tagIds.map((id) => this.#tagName(id)).join(",");
        cmp = aNames.localeCompare(bNames);
      }
      return cmp * dir;
    });
  }

  #navigateToMerchant(id: string) {
    window.history.pushState({}, "", `/merchants/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  #navigateToTransaction(id: string) {
    window.history.pushState({}, "", `/transactions/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
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
    const tagId = await Tags.create(name);
    await this.#applyTagToSelected(tagId);
  }

  async #applyTagToSelected(tagId: string) {
    if (!this._transactions) return;
    await this.withBusy(async () => {
      const toUpdate = this._transactions!.filter(
        (t) => this._selectedIds.has(t.id) && !t.tagIds.includes(tagId),
      ).map((t) => ({ ...t, tagIds: [...t.tagIds, tagId] }));
      if (toUpdate.length > 0) {
        await Transactions.bulkPut(toUpdate);
      }
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
        const id = await Merchants.create(name);
        merchant = { id, name };
      }

      const toUpdate = this._transactions!.filter((t) => this._selectedIds.has(t.id)).map((t) => ({
        ...t,
        merchantId: merchant!.id,
      }));
      if (toUpdate.length > 0) {
        await Transactions.bulkPut(toUpdate);
      }
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
    this._currentPage = 1;
  }

  #toggleNoMerchant() {
    this._noMerchant = !this._noMerchant;
    this._currentPage = 1;
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
        <button @click=${this.#clearSelection}>Clear selection</button>
      </div>
    `;
  }

  render() {
    if (this._transactions === null) {
      return html`
        <p>Loading…</p>
      `;
    }

    if (this._transactions.length === 0) {
      return html`
        <p>No transactions found.</p>
      `;
    }

    const filtered = this._transactions.filter((t) => this.#matchesFilter(t));
    const sorted = this.#sorted(filtered);
    const start = (this._currentPage - 1) * this._pageSize;
    const pageTransactions = sorted.slice(start, start + this._pageSize);
    const pageIds = pageTransactions.map((t) => t.id);
    const allPageSelected = pageIds.length > 0 && pageIds.every((id) => this._selectedIds.has(id));

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
            }}><transaction-importer @imported=${this.#onImported}></transaction-importer></budgee-modal>`
          : nothing
      }
      ${this.#renderFilterBar()}
      ${this.#renderBulkBar()}
      <paginated-table
        .totalItems=${filtered.length}
        .defaultPageSize=${50}
        storageKey="transactions"
        ?filterable=${true}
        @page-change=${this.#onPageChange}
        @filter-change=${this.#onFilterChange}
      >
        <table>
          <thead>
            <tr>
              <th class="col-checkbox">
                <input
                  type="checkbox"
                  .checked=${allPageSelected}
                  @change=${() => this.#toggleSelectAll(pageTransactions)}
                />
              </th>
              <th class="sortable col-date" @click=${() => this.#onSortClick("date")}>
                Date${this.#sortIndicator("date")}
              </th>
              <th class="sortable" @click=${() => this.#onSortClick("merchant")}>
                Merchant${this.#sortIndicator("merchant")}
              </th>
              <th class="sortable" @click=${() => this.#onSortClick("description")}>
                Description${this.#sortIndicator("description")}
              </th>
              <th class="sortable col-amount" @click=${() => this.#onSortClick("amount")}>
                Amount${this.#sortIndicator("amount")}
              </th>
              <th class="sortable col-tags" @click=${() => this.#onSortClick("tags")}>
                Tags${this.#sortIndicator("tags")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${pageTransactions.map(
              (t) => html`
              <tr @click=${() => this.#navigateToTransaction(t.id)}>
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
                <td>${t.originalDescription}</td>
                <td class="col-amount ${t.amount < 0 ? "amount-negative" : "amount-positive"}">
                  ${t.amount.toFixed(2)}
                </td>
                <td class="col-tags">
                  <tag-pills .tags=${this._tags} .tagIds=${t.tagIds}></tag-pills>
                </td>
              </tr>
            `,
            )}
          </tbody>
        </table>
      </paginated-table>
    `;
  }
}
