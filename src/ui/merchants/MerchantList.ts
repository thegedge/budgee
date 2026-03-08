import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { transactionStats } from "../../charting/transactionStats";
import { formatAmount } from "../../formatAmount";
import { Merchant } from "../../models/Merchant";
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
    "merchant-list": MerchantList;
  }
}

interface MerchantRow {
  merchant: Merchant;
  transactionCount: number | null;
  totalSpend: number | null;
}

@customElement("merchant-list")
export class MerchantList extends LitElement {
  @state()
  private _rows: MerchantRow[] | null = null;

  #sort = new SortableListController<MerchantRow>(this, {
    defaultSortCol: "name",
    defaultSortDir: "asc",
    comparators: {
      name: (a, b) => a.merchant.name.localeCompare(b.merchant.name),
      count: (a, b) => (a.transactionCount ?? 0) - (b.transactionCount ?? 0),
      spend: (a, b) => (a.totalSpend ?? 0) - (b.totalSpend ?? 0),
    },
    filterFn: (row, filter) => {
      const lower = filter.toLowerCase();
      if (row.merchant.name.toLowerCase().includes(lower)) return true;
      if (row.transactionCount != null && String(row.transactionCount).includes(lower)) return true;
      if (row.totalSpend != null && row.totalSpend.toFixed(2).includes(lower)) return true;
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
      [Merchant.subscribe, Transaction.subscribe],
      () => this.#load(),
    );
  }

  async #load() {
    const merchants = await Merchant.all();
    this._rows = merchants.map((m) => ({
      merchant: m,
      transactionCount: null,
      totalSpend: null,
    }));
    this.#loadTransactionStats();
  }

  async #loadTransactionStats() {
    const transactions = await Transaction.all();
    const stats = transactionStats(transactions, (tx) => [(tx as Transaction).merchantId]);

    this._rows = this._rows!.map((row) => {
      const s = stats.get(row.merchant.id);
      return { ...row, transactionCount: s?.count ?? 0, totalSpend: s?.total ?? 0 };
    });
  }

  #navigateToMerchant(id: string) {
    navigate(`/merchants/${id}`);
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
          heading="No merchants yet"
          description="Merchants are created automatically when you assign them to transactions or rules."
        ></budgee-empty-state>
      `;
    }

    const processed = this.#sort.filterAndSort(this._rows);

    return html`
      <paginated-table
        .items=${processed}
        .defaultPageSize=${25}
        storageKey="merchants"
        ?filterable=${true}
        @filter-change=${(e: CustomEvent<FilterChangeDetail>) =>
          this.#sort.onFilterChange(e.detail.filter)}
        .renderRow=${(row: MerchantRow) => html`
          <tr @click=${() => this.#navigateToMerchant(row.merchant.id)}>
            <td>${row.merchant.name}</td>
            <td>${row.transactionCount ?? "…"}</td>
            <td class="col-amount ${row.totalSpend != null && row.totalSpend < 0 ? "amount-negative" : "amount-positive"}">
              ${row.totalSpend != null ? formatAmount(row.totalSpend) : "…"}
            </td>
          </tr>
        `}
      >
        <thead slot="header">
          <tr>
            <th class="sortable" @click=${() => this.#sort.onSortClick("name")}>
              Name${this.#sort.sortIndicator("name")}
            </th>
            <th class="sortable" @click=${() => this.#sort.onSortClick("count")}>
              Transactions${this.#sort.sortIndicator("count")}
            </th>
            <th class="sortable col-amount" @click=${() => this.#sort.onSortClick("spend")}>
              Total Spend${this.#sort.sortIndicator("spend")}
            </th>
          </tr>
        </thead>
      </paginated-table>
    `;
  }
}
