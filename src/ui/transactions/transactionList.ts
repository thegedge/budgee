import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Tag, Transaction } from "../../database/types";
import type { FilterChangeDetail, PageChangeDetail } from "../paginatedTable";
import "../paginatedTable";
import "../tags/tagAutocomplete";

declare global {
  interface HTMLElementTagNameMap {
    "transaction-list": TransactionList;
  }
}

type SortColumn = "date" | "description" | "amount" | "tags";
type SortDir = "asc" | "desc";

@customElement("transaction-list")
export class TransactionList extends LitElement {
  @state()
  private _transactions: Transaction[] | null = null;

  @state()
  private _tags: Tag[] = [];

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

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
    }
    th.sortable {
      cursor: pointer;
      user-select: none;
    }
    th.sortable:hover {
      background-color: var(--budgee-primary-hover, #5a9cbf);
    }
    tbody tr:nth-child(even) {
      background-color: var(--budgee-bg, #fafafa);
    }
    .amount-negative {
      color: var(--budgee-negative, #d09090);
    }
    .amount-positive {
      color: var(--budgee-positive, #7ec8a0);
    }
    .tag-badge {
      display: inline-block;
      background: var(--budgee-primary, #7eb8da);
      color: white;
      padding: 1px 6px;
      border-radius: 8px;
      font-size: 0.75rem;
      margin-right: 2px;
      cursor: pointer;
    }
    tr {
      cursor: pointer;
    }
    tr:hover {
      background-color: var(--budgee-bg, #fafafa);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
  }

  async #refresh() {
    this._transactions = await db.transactions.toArray();
    this._tags = await db.tags.toArray();
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

  #tagName(tagId: number): string {
    return this._tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
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

  #sorted(transactions: Transaction[]): Transaction[] {
    const col = this._sortCol;
    const dir = this._sortDir === "asc" ? 1 : -1;
    return [...transactions].sort((a, b) => {
      let cmp = 0;
      if (col === "date") {
        cmp = a.date.localeCompare(b.date);
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

  #navigateToTransaction(id: number) {
    window.history.pushState({}, "", `/transactions/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
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

    return html`
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
              <th class="sortable" @click=${() => this.#onSortClick("date")}>
                Date${this.#sortIndicator("date")}
              </th>
              <th class="sortable" @click=${() => this.#onSortClick("description")}>
                Description${this.#sortIndicator("description")}
              </th>
              <th class="sortable" @click=${() => this.#onSortClick("amount")}>
                Amount${this.#sortIndicator("amount")}
              </th>
              <th class="sortable" @click=${() => this.#onSortClick("tags")}>
                Tags${this.#sortIndicator("tags")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${pageTransactions.map(
              (t) => html`
              <tr @click=${() => this.#navigateToTransaction(t.id!)}>
                <td>${t.date}</td>
                <td>${t.originalDescription}</td>
                <td class=${t.amount < 0 ? "amount-negative" : "amount-positive"}>
                  ${t.amount.toFixed(2)}
                </td>
                <td @click=${(e: Event) => e.stopPropagation()}>
                  ${t.tagIds.map(
                    (tagId) => html`
                    <span class="tag-badge" @click=${(e: Event) => this.#removeTag(t, tagId, e)}>
                      ${this.#tagName(tagId)} &times;
                    </span>
                  `,
                  )}
                  <tag-autocomplete
                    .tags=${this._tags}
                    .excludeIds=${t.tagIds}
                    @tag-selected=${(e: CustomEvent) => this.#onTagSelected(t, e)}
                    @tag-created=${(e: CustomEvent) => this.#onTagCreated(t, e)}
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
