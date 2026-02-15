import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Merchant, Tag, Transaction } from "../../database/types";
import "../merchants/merchantAutocomplete";
import "../paginatedTable";
import type { FilterChangeDetail, PageChangeDetail } from "../paginatedTable";
import "../tags/tagAutocomplete";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "transaction-list": TransactionList;
  }
}

type SortColumn = "date" | "merchant" | "description" | "amount" | "tags";
type SortDir = "asc" | "desc";

@customElement("transaction-list")
export class TransactionList extends LitElement {
  @state()
  private _transactions: Transaction[] | null = null;

  @state()
  private _tags: Tag[] = [];

  @state()
  private _merchants = new Map<number, string>();

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
  private _selectedIds = new Set<number>();

  @state()
  private _bulkMerchantName = "";

  static styles = [
    tableStyles,
    css`
      tr {
        cursor: pointer;
      }
      tr:hover {
        background-color: var(--budgee-bg, #fafafa);
      }
      .merchant-link {
        color: var(--budgee-primary, #7eb8da);
        cursor: pointer;
        text-decoration: underline;
      }
      .col-amount {
        width: 8rem;
        text-align: right;
      }
      td.col-amount {
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .col-date {
        white-space: nowrap;
      }
      .col-tags tag-autocomplete {
        display: block;
        width: 100%;
      }
      .col-checkbox {
        width: min-content;
      }
      .bulk-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0.75rem;
        background: var(--budgee-bg, #fafafa);
        border: 1px solid var(--budgee-border, #e0e0e0);
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
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
  }

  async #refresh() {
    this._transactions = await db.transactions.toArray();
    this._tags = await db.tags.toArray();
    const merchants = await db.merchants.toArray();
    this._merchants = new Map(merchants.map((m) => [m.id!, m.name]));
    this._merchantList = merchants;
  }

  async #onTagSelected(transaction: Transaction, e: CustomEvent) {
    const tag = e.detail.tag as Tag;
    if (transaction.tagIds.includes(tag.id!)) return;
    const updatedTagIds = [...transaction.tagIds, tag.id!];
    await db.transactions.update(transaction.id!, { tagIds: updatedTagIds });
    await this.#refresh();
  }

  async #onTagCreated(transaction: Transaction, e: CustomEvent) {
    const name = e.detail.name as string;
    const tagId = await db.tags.add({ name });
    const updatedTagIds = [...transaction.tagIds, tagId];
    await db.transactions.update(transaction.id!, { tagIds: updatedTagIds });
    await this.#refresh();
  }

  async #removeTag(transaction: Transaction, tagId: number, e: Event) {
    e.stopPropagation();
    const updatedTagIds = transaction.tagIds.filter((id) => id !== tagId);
    await db.transactions.update(transaction.id!, { tagIds: updatedTagIds });
    await this.#refresh();
  }

  #tag(tagId: number): Tag | undefined {
    return this._tags.find((t) => t.id === tagId);
  }

  #tagName(tagId: number): string {
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

  #merchantName(merchantId: number | undefined): string {
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

  #navigateToMerchant(id: number) {
    window.history.pushState({}, "", `/merchants/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  #navigateToTransaction(id: number) {
    window.history.pushState({}, "", `/transactions/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  #toggleSelection(id: number) {
    const next = new Set(this._selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this._selectedIds = next;
  }

  #toggleSelectAll(pageTransactions: Transaction[]) {
    const pageIds = pageTransactions.map((t) => t.id!);
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
    const tagId = tag.id!;
    await this.#applyTagToSelected(tagId);
  }

  async #bulkCreateTag(e: CustomEvent) {
    const name = e.detail.name as string;
    const tagId = await db.tags.add({ name });
    await this.#applyTagToSelected(tagId as number);
  }

  async #applyTagToSelected(tagId: number) {
    if (!this._transactions) return;
    const selected = this._transactions.filter((t) => this._selectedIds.has(t.id!));
    for (const t of selected) {
      if (t.tagIds.includes(tagId)) continue;
      await db.transactions.update(t.id!, { tagIds: [...t.tagIds, tagId] });
    }
    this.#clearSelection();
    await this.#refresh();
  }

  async #bulkSetMerchant() {
    const name = this._bulkMerchantName.trim();
    if (!name || !this._transactions) return;

    let merchant = this._merchantList.find((m) => m.name.toLowerCase() === name.toLowerCase());
    if (!merchant) {
      const id = await db.merchants.add({ name });
      merchant = { id: id as number, name };
    }

    for (const id of this._selectedIds) {
      await db.transactions.update(id, { merchantId: merchant.id });
    }
    this.#clearSelection();
    await this.#refresh();
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
    const pageIds = pageTransactions.map((t) => t.id!);
    const allPageSelected = pageIds.length > 0 && pageIds.every((id) => this._selectedIds.has(id));

    return html`
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
              <tr @click=${() => this.#navigateToTransaction(t.id!)}>
                <td class="col-checkbox" @click=${(e: Event) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    .checked=${this._selectedIds.has(t.id!)}
                    @change=${() => this.#toggleSelection(t.id!)}
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
                <td class="col-tags" @click=${(e: Event) => e.stopPropagation()}>
                  <tag-autocomplete
                    .tags=${this._tags}
                    .selectedTagIds=${t.tagIds}
                    @tag-selected=${(e: CustomEvent) => this.#onTagSelected(t, e)}
                    @tag-created=${(e: CustomEvent) => this.#onTagCreated(t, e)}
                    @tag-removed=${(e: CustomEvent) => this.#removeTag(t, e.detail.tagId, e)}
                  ></tag-autocomplete>
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
