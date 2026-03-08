import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
import { transactionStats } from "../../charting/transactionStats";
import { formatAmount } from "../../formatAmount";
import type { DashboardTableColumn } from "../../database/types";
import type { Account } from "../../models/Account";
import type { DashboardTable } from "../../models/DashboardTable";
import type { Merchant } from "../../models/Merchant";
import type { Tag } from "../../models/Tag";
import type { Transaction } from "../../models/Transaction";
import { iconButtonStyles } from "../iconButtonStyles";
import { ResizableMixin, renderResizeHandles, resizableStyles } from "../shared/ResizableMixin";
import "../shared/PaginatedTable";
import { tableStyles } from "../tableStyles";
import "../tags/TagPills";

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-table-card": DashboardTableCard;
  }
}

interface MerchantRow {
  merchant: Merchant;
  transactionCount: number;
  totalAmount: number;
}

interface TagRow {
  tag: Tag;
  transactionCount: number;
  totalAmount: number;
}

@customElement("dashboard-table-card")
export class DashboardTableCard extends ResizableMixin(LitElement) {
  @property({ type: Object })
  config!: DashboardTable;

  @property({ type: Array })
  transactions: Transaction[] = [];

  @property({ type: Array })
  tags: Tag[] = [];

  @property({ type: Array })
  merchants: Merchant[] = [];

  @property({ type: Array })
  accounts: Account[] = [];

  protected get _resizableConfig() {
    return this.config;
  }

  protected _onResized(update: { colSpan?: number; rowSpan?: number }) {
    this.dispatchEvent(
      new CustomEvent("table-resized", { detail: { id: this.config.id, ...update } }),
    );
  }

  static styles = [
    tableStyles,
    iconButtonStyles,
    resizableStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      h4 {
        margin: 0;
      }
      .actions {
        display: flex;
        gap: 0.25rem;
      }
    `,
  ];

  #onEdit() {
    this.dispatchEvent(new CustomEvent("table-edit", { detail: { table: this.config } }));
  }

  #onDelete() {
    this.dispatchEvent(new CustomEvent("table-deleted", { detail: { id: this.config.id } }));
  }

  #merchantName(merchantId: string | undefined): string {
    if (!merchantId) return "";
    return this.merchants.find((m) => m.id === merchantId)?.name ?? "";
  }

  #accountName(accountId: string | undefined): string {
    if (!accountId) return "";
    return this.accounts.find((a) => a.id === accountId)?.name ?? "";
  }

  #columnLabel(col: DashboardTableColumn): string {
    const labels: Record<DashboardTableColumn, string> = {
      date: "Date",
      amount: "Amount",
      description: "Description",
      merchant: "Merchant",
      tags: "Tags",
      account: "Account",
      name: "Name",
      transactionCount: "Transactions",
      totalAmount: "Total Amount",
    };
    return labels[col];
  }

  #isAmountColumn(col: DashboardTableColumn): boolean {
    return col === "amount" || col === "totalAmount";
  }

  #renderTransactionsTable() {
    const sorted = [...this.transactions].sort((a, b) => b.date.localeCompare(a.date));
    const columns = this.config.columns;

    return html`
      <paginated-table
        .items=${sorted}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        .renderRow=${(t: Transaction) => html`
          <tr>
            ${columns.map((col) => this.#renderTransactionCell(t, col))}
          </tr>
        `}
      >
        <thead slot="header">
          <tr>
            ${columns.map(
              (col) => html`
              <th class=${this.#isAmountColumn(col) ? "col-amount" : ""}>${this.#columnLabel(col)}</th>
            `,
            )}
          </tr>
        </thead>
      </paginated-table>
    `;
  }

  #renderTransactionCell(t: Transaction, col: DashboardTableColumn) {
    switch (col) {
      case "date":
        return html`<td>${t.date}</td>`;
      case "amount":
        return html`<td class="col-amount ${t.amount < 0 ? "amount-negative" : "amount-positive"}">${formatAmount(t.amount)}</td>`;
      case "description":
        return html`<td>${t.description}</td>`;
      case "merchant":
        return html`<td>${this.#merchantName(t.merchantId)}</td>`;
      case "tags":
        return html`<td><tag-pills .tags=${this.tags} .tagIds=${t.tagIds}></tag-pills></td>`;
      case "account":
        return html`<td>${this.#accountName(t.accountId)}</td>`;
      default:
        return html`
          <td></td>
        `;
    }
  }

  #buildMerchantRows(): MerchantRow[] {
    const stats = transactionStats(this.transactions, (tx) => [(tx as Transaction).merchantId]);
    return this.merchants.map((m) => {
      const s = stats.get(m.id);
      return { merchant: m, transactionCount: s?.count ?? 0, totalAmount: s?.total ?? 0 };
    });
  }

  #renderMerchantsTable() {
    const rows = this.#buildMerchantRows();
    const columns = this.config.columns;

    return html`
      <paginated-table
        .items=${rows}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        .renderRow=${(row: MerchantRow) => html`
          <tr>
            ${columns.map((col) => this.#renderMerchantCell(row, col))}
          </tr>
        `}
      >
        <thead slot="header">
          <tr>
            ${columns.map(
              (col) => html`
              <th class=${this.#isAmountColumn(col) ? "col-amount" : ""}>${this.#columnLabel(col)}</th>
            `,
            )}
          </tr>
        </thead>
      </paginated-table>
    `;
  }

  #renderMerchantCell(row: MerchantRow, col: DashboardTableColumn) {
    switch (col) {
      case "name":
        return html`<td>${row.merchant.name}</td>`;
      case "transactionCount":
        return html`<td>${row.transactionCount}</td>`;
      case "totalAmount":
        return html`<td class="col-amount ${row.totalAmount < 0 ? "amount-negative" : "amount-positive"}">${formatAmount(row.totalAmount)}</td>`;
      default:
        return html`
          <td></td>
        `;
    }
  }

  #buildTagRows(): TagRow[] {
    const stats = transactionStats(this.transactions, (tx) => (tx as Transaction).tagIds);
    return this.tags.map((t) => {
      const s = stats.get(t.id);
      return { tag: t, transactionCount: s?.count ?? 0, totalAmount: s?.total ?? 0 };
    });
  }

  #renderTagsTable() {
    const rows = this.#buildTagRows();
    const columns = this.config.columns;

    return html`
      <paginated-table
        .items=${rows}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        .renderRow=${(row: TagRow) => html`
          <tr>
            ${columns.map((col) => this.#renderTagCell(row, col))}
          </tr>
        `}
      >
        <thead slot="header">
          <tr>
            ${columns.map(
              (col) => html`
              <th class=${this.#isAmountColumn(col) ? "col-amount" : ""}>${this.#columnLabel(col)}</th>
            `,
            )}
          </tr>
        </thead>
      </paginated-table>
    `;
  }

  #renderTagCell(row: TagRow, col: DashboardTableColumn) {
    switch (col) {
      case "name":
        return html`<td>${row.tag.name}</td>`;
      case "transactionCount":
        return html`<td>${row.transactionCount}</td>`;
      case "totalAmount":
        return html`<td class="col-amount ${row.totalAmount < 0 ? "amount-negative" : "amount-positive"}">${formatAmount(row.totalAmount)}</td>`;
      default:
        return html`
          <td></td>
        `;
    }
  }

  #renderTable() {
    switch (this.config.model) {
      case "transactions":
        return this.#renderTransactionsTable();
      case "merchants":
        return this.#renderMerchantsTable();
      case "tags":
        return this.#renderTagsTable();
      default:
        return nothing;
    }
  }

  render() {
    return html`
      ${renderResizeHandles(this)}
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${this.#onEdit}>${unsafeSVG(wrenchIcon)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${this.#onDelete}>${unsafeSVG(trash2Icon)}</button>
        </div>
      </div>
      ${this.#renderTable()}
    `;
  }
}
