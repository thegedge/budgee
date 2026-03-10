import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { transactionStats } from "../../charting/transactionStats";
import { formatAmount } from "../../formatAmount";
import { Merchant } from "../../models/Merchant";
import { Transaction } from "../../models/Transaction";
import { navigate } from "../navigate";
import { DataSubscriptionController } from "../DataSubscriptionController";
import "../shared/EmptyState";
import "../shared/PaginatedTable";
import "../shared/SkeletonLoader";

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

  static styles = css`
    .clickable-row {
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    new DataSubscriptionController(this, [Merchant.subscribe, Transaction.subscribe], () =>
      this.#load(),
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

    return html`
      <paginated-table
        .items=${this._rows}
        .defaultPageSize=${25}
        storageKey="merchants"
        .columns=${[
          { label: "Name", sortKey: "name" },
          { label: "Transactions", sortKey: "count" },
          { label: "Total Spend", sortKey: "spend", class: "col-amount" },
        ]}
        .comparators=${{
          name: (a: MerchantRow, b: MerchantRow) => a.merchant.name.localeCompare(b.merchant.name),
          count: (a: MerchantRow, b: MerchantRow) =>
            (a.transactionCount ?? 0) - (b.transactionCount ?? 0),
          spend: (a: MerchantRow, b: MerchantRow) => (a.totalSpend ?? 0) - (b.totalSpend ?? 0),
        }}
        .filterFn=${(row: MerchantRow, filter: string) => {
          const lower = filter.toLowerCase();
          if (row.merchant.name.toLowerCase().includes(lower)) return true;
          if (row.transactionCount != null && String(row.transactionCount).includes(lower))
            return true;
          if (row.totalSpend != null && row.totalSpend.toFixed(2).includes(lower)) return true;
          return false;
        }}
        defaultSortCol="name"
        defaultSortDir="asc"
        .renderRow=${(row: MerchantRow) => html`
          <tr class="clickable-row" @click=${() => this.#navigateToMerchant(row.merchant.id)}>
            <td>${row.merchant.name}</td>
            <td>${row.transactionCount ?? "…"}</td>
            <td class="col-amount ${row.totalSpend != null && row.totalSpend < 0 ? "amount-negative" : "amount-positive"}">
              ${row.totalSpend != null ? formatAmount(row.totalSpend) : "…"}
            </td>
          </tr>
        `}
      ></paginated-table>
    `;
  }
}
