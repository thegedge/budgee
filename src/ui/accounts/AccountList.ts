import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { transactionStats } from "../../charting/transactionStats";
import { accountTypeLabel } from "../../database/types";
import { formatAmount } from "../../formatAmount";
import { Account } from "../../models/Account";
import { Transaction } from "../../models/Transaction";
import { navigate } from "../navigate";
import { DataSubscriptionController } from "../DataSubscriptionController";
import { SortableListController } from "../SortableListController";
import "../shared/EmptyState";
import "../shared/PaginatedTable";
import "../shared/SkeletonLoader";
import type { FilterChangeDetail } from "../shared/PaginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "account-list": AccountList;
  }
}

interface AccountRow {
  account: Account;
  transactionCount: number | null;
  balance: number | null;
}

@customElement("account-list")
export class AccountList extends LitElement {
  @state()
  private _rows: AccountRow[] | null = null;

  #sort = new SortableListController<AccountRow>(this, {
    defaultSortCol: "name",
    defaultSortDir: "asc",
    comparators: {
      name: (a, b) => a.account.name.localeCompare(b.account.name),
      type: (a, b) => (a.account.type ?? "").localeCompare(b.account.type ?? ""),
      count: (a, b) => (a.transactionCount ?? 0) - (b.transactionCount ?? 0),
      balance: (a, b) => (a.balance ?? 0) - (b.balance ?? 0),
    },
    filterFn: (row, filter) => {
      const lower = filter.toLowerCase();
      if (row.account.name.toLowerCase().includes(lower)) return true;
      if (row.account.type?.toLowerCase().includes(lower)) return true;
      if (row.transactionCount != null && String(row.transactionCount).includes(lower)) return true;
      if (row.balance != null && row.balance.toFixed(2).includes(lower)) return true;
      return false;
    },
  });

  static styles = [
    tableStyles,
    css`
      tbody tr {
        cursor: pointer;
      }
    `,
  ];

  constructor() {
    super();
    new DataSubscriptionController(
      this,
      [Account.subscribe, Transaction.subscribe],
      () => this.#load(),
    );
  }

  async #load() {
    const accounts = await Account.all();
    this._rows = accounts.map((a) => ({
      account: a,
      transactionCount: null,
      balance: null,
    }));
    this.#loadTransactionStats();
  }

  async #loadTransactionStats() {
    const transactions = await Transaction.all();
    const stats = transactionStats(transactions, (tx) => [(tx as Transaction).accountId]);

    this._rows = this._rows!.map((row) => {
      const s = stats.get(row.account.id);
      return { ...row, transactionCount: s?.count ?? 0, balance: s?.total ?? 0 };
    });
  }

  #navigateToAccount(id: string) {
    navigate(`/accounts/${id}`);
  }

  render() {
    if (this._rows === null) {
      return html`
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;
    }

    if (this._rows.length === 0) {
      return html`
        <budgee-empty-state
          heading="No accounts yet"
          description="Accounts are created when you import transactions from a CSV."
        ></budgee-empty-state>
      `;
    }

    const processed = this.#sort.filterAndSort(this._rows);

    return html`
      <paginated-table
        .items=${processed}
        .defaultPageSize=${25}
        storageKey="accounts"
        ?filterable=${true}
        @filter-change=${(e: CustomEvent<FilterChangeDetail>) =>
          this.#sort.onFilterChange(e.detail.filter)}
        .renderRow=${(row: AccountRow) => html`
          <tr @click=${() => this.#navigateToAccount(row.account.id)}>
            <td>${row.account.name}</td>
            <td>${row.account.type ? accountTypeLabel(row.account.type) : ""}</td>
            <td>${row.transactionCount ?? "…"}</td>
            <td class="col-amount ${row.balance != null && row.balance < 0 ? "amount-negative" : row.balance != null ? "amount-positive" : ""}">
              ${row.balance != null ? formatAmount(row.balance) : "…"}
            </td>
          </tr>
        `}
      >
        <thead slot="header">
          <tr>
            <th class="sortable" @click=${() => this.#sort.onSortClick("name")}>
              Name${this.#sort.sortIndicator("name")}
            </th>
            <th class="sortable" @click=${() => this.#sort.onSortClick("type")}>
              Type${this.#sort.sortIndicator("type")}
            </th>
            <th class="sortable" @click=${() => this.#sort.onSortClick("count")}>
              Transactions${this.#sort.sortIndicator("count")}
            </th>
            <th class="sortable col-amount" @click=${() => this.#sort.onSortClick("balance")}>
              Balance${this.#sort.sortIndicator("balance")}
            </th>
          </tr>
        </thead>
      </paginated-table>
    `;
  }
}
