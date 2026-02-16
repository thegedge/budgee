import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Accounts } from "../../data/accounts";
import { Transactions } from "../../data/transactions";
import type { Account, Transaction } from "../../database/types";
import "../shared/paginatedTable";
import type { FilterChangeDetail, PageChangeDetail } from "../shared/paginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "account-list": AccountList;
  }
}

interface AccountRow {
  account: Account;
  transactionCount: number;
  balance: number;
}

type SortColumn = "name" | "type" | "count" | "balance";
type SortDir = "asc" | "desc";

@customElement("account-list")
export class AccountList extends LitElement {
  @state()
  private _rows: AccountRow[] | null = null;

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
    const [accounts, transactions] = await Promise.all([Accounts.all(), Transactions.all()]);

    const countMap = new Map<number, number>();
    const balanceMap = new Map<number, number>();
    for (const tx of transactions as Transaction[]) {
      if (tx.accountId == null) continue;
      countMap.set(tx.accountId, (countMap.get(tx.accountId) ?? 0) + 1);
      balanceMap.set(tx.accountId, (balanceMap.get(tx.accountId) ?? 0) + tx.amount);
    }

    this._rows = accounts.map((a) => ({
      account: a,
      transactionCount: countMap.get(a.id!) ?? 0,
      balance: balanceMap.get(a.id!) ?? 0,
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

  #matchesFilter(row: AccountRow): boolean {
    if (!this._filter) return true;
    const lower = this._filter.toLowerCase();
    if (row.account.name.toLowerCase().includes(lower)) return true;
    if (row.account.type?.toLowerCase().includes(lower)) return true;
    if (String(row.transactionCount).includes(lower)) return true;
    if (row.balance.toFixed(2).includes(lower)) return true;
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

  #sorted(rows: AccountRow[]): AccountRow[] {
    const col = this._sortCol;
    const dir = this._sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      let cmp = 0;
      if (col === "name") {
        cmp = a.account.name.localeCompare(b.account.name);
      } else if (col === "type") {
        cmp = (a.account.type ?? "").localeCompare(b.account.type ?? "");
      } else if (col === "count") {
        cmp = a.transactionCount - b.transactionCount;
      } else if (col === "balance") {
        cmp = a.balance - b.balance;
      }
      return cmp * dir;
    });
  }

  #navigateToAccount(id: number) {
    window.history.pushState({}, "", `/accounts/${id}`);
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
        <p>No accounts found.</p>
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
        storageKey="accounts"
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
              <th class="sortable" @click=${() => this.#onSortClick("type")}>
                Type${this.#sortIndicator("type")}
              </th>
              <th class="sortable" @click=${() => this.#onSortClick("count")}>
                Transactions${this.#sortIndicator("count")}
              </th>
              <th class="sortable col-amount" @click=${() => this.#onSortClick("balance")}>
                Balance${this.#sortIndicator("balance")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${pageRows.map(
              (row) => html`
              <tr @click=${() => this.#navigateToAccount(row.account.id!)}>
                <td>${row.account.name}</td>
                <td>${row.account.type ?? ""}</td>
                <td>${row.transactionCount}</td>
                <td class="col-amount ${row.balance < 0 ? "amount-negative" : "amount-positive"}">
                  ${row.balance.toFixed(2)}
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
