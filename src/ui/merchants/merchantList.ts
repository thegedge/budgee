import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Merchant, Transaction } from "../../database/types";
import type { FilterChangeDetail, PageChangeDetail } from "../paginatedTable";
import "../paginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "merchant-list": MerchantList;
  }
}

interface MerchantRow {
  merchant: Merchant;
  transactionCount: number;
  totalSpend: number;
}

type SortColumn = "name" | "count" | "spend";
type SortDir = "asc" | "desc";

@customElement("merchant-list")
export class MerchantList extends LitElement {
  @state()
  private _rows: MerchantRow[] | null = null;

  @state()
  private _currentPage = 1;

  @state()
  private _pageSize = 25;

  @state()
  private _filter = "";

  @state()
  private _sortCol: SortColumn = "name";

  @state()
  private _sortDir: SortDir = "asc";

  static styles = [
    tableStyles,
    css`
      tbody tr {
        cursor: pointer;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.#load();
  }

  async #load() {
    const [merchants, transactions] = await Promise.all([
      db.merchants.toArray(),
      db.transactions.toArray(),
    ]);

    const countMap = new Map<number, number>();
    const spendMap = new Map<number, number>();
    for (const tx of transactions as Transaction[]) {
      if (tx.merchantId == null) continue;
      countMap.set(tx.merchantId, (countMap.get(tx.merchantId) ?? 0) + 1);
      spendMap.set(tx.merchantId, (spendMap.get(tx.merchantId) ?? 0) + tx.amount);
    }

    this._rows = merchants.map((m) => ({
      merchant: m,
      transactionCount: countMap.get(m.id!) ?? 0,
      totalSpend: spendMap.get(m.id!) ?? 0,
    }));
  }

  #onPageChange(e: CustomEvent<PageChangeDetail>) {
    this._currentPage = e.detail.page;
    this._pageSize = e.detail.pageSize;
  }

  #onFilterChange(e: CustomEvent<FilterChangeDetail>) {
    this._filter = e.detail.filter;
    this._currentPage = 1;
  }

  #matchesFilter(row: MerchantRow): boolean {
    if (!this._filter) return true;
    const lower = this._filter.toLowerCase();
    if (row.merchant.name.toLowerCase().includes(lower)) return true;
    if (String(row.transactionCount).includes(lower)) return true;
    if (row.totalSpend.toFixed(2).includes(lower)) return true;
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

  #sorted(rows: MerchantRow[]): MerchantRow[] {
    const col = this._sortCol;
    const dir = this._sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      let cmp = 0;
      if (col === "name") {
        cmp = a.merchant.name.localeCompare(b.merchant.name);
      } else if (col === "count") {
        cmp = a.transactionCount - b.transactionCount;
      } else if (col === "spend") {
        cmp = a.totalSpend - b.totalSpend;
      }
      return cmp * dir;
    });
  }

  #navigateToMerchant(id: number) {
    window.history.pushState({}, "", `/merchants/${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  render() {
    if (this._rows === null) {
      return html`
        <p>Loading…</p>
      `;
    }

    if (this._rows.length === 0) {
      return html`
        <p>No merchants found.</p>
      `;
    }

    const filtered = this._rows.filter((r) => this.#matchesFilter(r));
    const sorted = this.#sorted(filtered);
    const start = (this._currentPage - 1) * this._pageSize;
    const pageRows = sorted.slice(start, start + this._pageSize);

    return html`
      <paginated-table
        .totalItems=${filtered.length}
        .defaultPageSize=${25}
        storageKey="merchants"
        ?filterable=${true}
        @page-change=${this.#onPageChange}
        @filter-change=${this.#onFilterChange}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${() => this.#onSortClick("name")}>
                Name${this.#sortIndicator("name")}
              </th>
              <th class="sortable" @click=${() => this.#onSortClick("count")}>
                Transactions${this.#sortIndicator("count")}
              </th>
              <th class="sortable" @click=${() => this.#onSortClick("spend")}>
                Total Spend${this.#sortIndicator("spend")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${pageRows.map(
              (row) => html`
              <tr @click=${() => this.#navigateToMerchant(row.merchant.id!)}>
                <td>${row.merchant.name}</td>
                <td>${row.transactionCount}</td>
                <td class=${row.totalSpend < 0 ? "amount-negative" : "amount-positive"}>
                  ${row.totalSpend.toFixed(2)}
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
