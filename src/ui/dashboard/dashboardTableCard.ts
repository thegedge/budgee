import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import { iconButtonStyles } from "../iconButtonStyles";
import type {
  Account,
  DashboardTable,
  DashboardTableColumn,
  Merchant,
  Tag,
  Transaction,
} from "../../database/types";
import "../shared/paginatedTable";
import "../tags/tagPills";
import type { PageChangeDetail } from "../shared/paginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-table-card": DashboardTableCard;
  }
}

type ColSpan = NonNullable<DashboardTable["colSpan"]>;
type RowSpan = NonNullable<DashboardTable["rowSpan"]>;

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
export class DashboardTableCard extends LitElement {
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

  @state()
  private _page = 1;

  @state()
  private _pageSize = 10;

  static styles = [
    tableStyles,
    iconButtonStyles,
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
      .resize-handle {
        position: absolute;
        right: 0;
        top: 0;
        width: 6px;
        height: 100%;
        cursor: col-resize;
        background: transparent;
        transition: background 0.15s;
      }
      .resize-handle:hover,
      :host([data-resizing]) .resize-handle {
        background: var(--budgee-primary);
      }
      .resize-handle-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        cursor: row-resize;
        background: transparent;
        transition: background 0.15s;
      }
      .resize-handle-bottom:hover,
      :host([data-resizing-vertical]) .resize-handle-bottom {
        background: var(--budgee-primary);
      }
      .resize-handle-corner {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        cursor: nwse-resize;
        background: transparent;
        z-index: 1;
      }
      .resize-handle-corner:hover,
      :host([data-resizing-corner]) .resize-handle-corner {
        background: var(--budgee-primary);
      }
    `,
  ];

  #onEdit() {
    this.dispatchEvent(new CustomEvent("table-edit", { detail: { table: this.config } }));
  }

  #onDelete() {
    this.dispatchEvent(new CustomEvent("table-deleted", { detail: { id: this.config.id } }));
  }

  #onResize(update: { colSpan?: ColSpan; rowSpan?: RowSpan }) {
    this.dispatchEvent(
      new CustomEvent("table-resized", { detail: { id: this.config.id, ...update } }),
    );
  }

  #onResizeHandlePointerDown(e: PointerEvent) {
    this.#startResize(e, { horizontal: true });
  }

  #onVerticalResizePointerDown(e: PointerEvent) {
    this.#startResize(e, { vertical: true });
  }

  #onCornerResizePointerDown(e: PointerEvent) {
    this.#startResize(e, { horizontal: true, vertical: true });
  }

  #startResize(
    e: PointerEvent,
    { horizontal, vertical }: { horizontal?: boolean; vertical?: boolean },
  ) {
    e.preventDefault();
    e.stopPropagation();
    const handle = e.currentTarget as HTMLElement;
    handle.setPointerCapture(e.pointerId);

    const grid = this.closest(".table-grid") ?? this.parentElement;
    if (!grid) return;

    const gridRect = grid.getBoundingClientRect();
    const gridStyle = getComputedStyle(grid);
    const gridColumns = horizontal ? gridStyle.gridTemplateColumns.split(" ").length : 0;
    const rowHeight = vertical ? parseFloat(gridStyle.gridTemplateRows.split(" ")[0]) || 200 : 0;
    const gap = vertical ? parseFloat(gridStyle.rowGap) || 0 : 0;

    let currentColSpan = this.config.colSpan ?? 1;
    let currentRowSpan: number = this.config.rowSpan ?? 1;

    const attr =
      horizontal && vertical
        ? "data-resizing-corner"
        : horizontal
          ? "data-resizing"
          : "data-resizing-vertical";
    this.setAttribute(attr, "");

    const onPointerMove = (ev: PointerEvent) => {
      if (horizontal) {
        const relativeX = ev.clientX - gridRect.left;
        const fractionAcrossGrid = relativeX / gridRect.width;
        const rawSpan = Math.round(fractionAcrossGrid * gridColumns);
        const hostLeft = this.getBoundingClientRect().left - gridRect.left;
        const startCol = Math.round((hostLeft / gridRect.width) * gridColumns);
        currentColSpan = Math.max(
          1,
          Math.min(gridColumns - startCol, rawSpan - startCol),
        ) as ColSpan;
        this.style.gridColumn = `span ${currentColSpan}`;
      }
      if (vertical) {
        const hostTop = this.getBoundingClientRect().top - gridRect.top;
        const bottomEdge = ev.clientY - gridRect.top;
        const spannedHeight = bottomEdge - hostTop;
        currentRowSpan = Math.max(1, Math.round((spannedHeight + gap) / (rowHeight + gap)));
        this.style.gridRow = `span ${currentRowSpan}`;
      }
    };

    const onPointerUp = () => {
      this.removeAttribute(attr);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);

      this.#onResize({
        ...(horizontal && { colSpan: Math.max(1, Math.min(6, currentColSpan)) as ColSpan }),
        ...(vertical && { rowSpan: Math.max(1, Math.min(4, currentRowSpan)) as RowSpan }),
      });
    };

    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
  }

  #onPageChange(e: CustomEvent<PageChangeDetail>) {
    this._page = e.detail.page;
    this._pageSize = e.detail.pageSize;
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
    const start = (this._page - 1) * this._pageSize;
    const pageItems = sorted.slice(start, start + this._pageSize);
    const columns = this.config.columns;

    return html`
      <paginated-table
        .totalItems=${sorted.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${this.#onPageChange}
      >
        <table>
          <thead>
            <tr>
              ${columns.map(
                (col) => html`
                <th class=${this.#isAmountColumn(col) ? "col-amount" : ""}>${this.#columnLabel(col)}</th>
              `,
              )}
            </tr>
          </thead>
          <tbody>
            ${pageItems.map(
              (t) => html`
              <tr>
                ${columns.map((col) => this.#renderTransactionCell(t, col))}
              </tr>
            `,
            )}
          </tbody>
        </table>
      </paginated-table>
    `;
  }

  #renderTransactionCell(t: Transaction, col: DashboardTableColumn) {
    switch (col) {
      case "date":
        return html`<td>${t.date}</td>`;
      case "amount":
        return html`<td class="col-amount ${t.amount < 0 ? "amount-negative" : "amount-positive"}">${t.amount.toFixed(2)}</td>`;
      case "description":
        return html`<td>${t.originalDescription}</td>`;
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
    const countMap = new Map<string, number>();
    const amountMap = new Map<string, number>();
    for (const tx of this.transactions) {
      if (tx.merchantId == null) continue;
      countMap.set(tx.merchantId, (countMap.get(tx.merchantId) ?? 0) + 1);
      amountMap.set(tx.merchantId, (amountMap.get(tx.merchantId) ?? 0) + tx.amount);
    }
    return this.merchants.map((m) => ({
      merchant: m,
      transactionCount: countMap.get(m.id) ?? 0,
      totalAmount: amountMap.get(m.id) ?? 0,
    }));
  }

  #renderMerchantsTable() {
    const rows = this.#buildMerchantRows();
    const start = (this._page - 1) * this._pageSize;
    const pageRows = rows.slice(start, start + this._pageSize);
    const columns = this.config.columns;

    return html`
      <paginated-table
        .totalItems=${rows.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${this.#onPageChange}
      >
        <table>
          <thead>
            <tr>
              ${columns.map(
                (col) => html`
                <th class=${this.#isAmountColumn(col) ? "col-amount" : ""}>${this.#columnLabel(col)}</th>
              `,
              )}
            </tr>
          </thead>
          <tbody>
            ${pageRows.map(
              (row) => html`
              <tr>
                ${columns.map((col) => this.#renderMerchantCell(row, col))}
              </tr>
            `,
            )}
          </tbody>
        </table>
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
        return html`<td class="col-amount ${row.totalAmount < 0 ? "amount-negative" : "amount-positive"}">${row.totalAmount.toFixed(2)}</td>`;
      default:
        return html`
          <td></td>
        `;
    }
  }

  #buildTagRows(): TagRow[] {
    const countMap = new Map<string, number>();
    const amountMap = new Map<string, number>();
    for (const tx of this.transactions) {
      for (const tagId of tx.tagIds) {
        countMap.set(tagId, (countMap.get(tagId) ?? 0) + 1);
        amountMap.set(tagId, (amountMap.get(tagId) ?? 0) + tx.amount);
      }
    }
    return this.tags.map((t) => ({
      tag: t,
      transactionCount: countMap.get(t.id) ?? 0,
      totalAmount: amountMap.get(t.id) ?? 0,
    }));
  }

  #renderTagsTable() {
    const rows = this.#buildTagRows();
    const start = (this._page - 1) * this._pageSize;
    const pageRows = rows.slice(start, start + this._pageSize);
    const columns = this.config.columns;

    return html`
      <paginated-table
        .totalItems=${rows.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${this.#onPageChange}
      >
        <table>
          <thead>
            <tr>
              ${columns.map(
                (col) => html`
                <th class=${this.#isAmountColumn(col) ? "col-amount" : ""}>${this.#columnLabel(col)}</th>
              `,
              )}
            </tr>
          </thead>
          <tbody>
            ${pageRows.map(
              (row) => html`
              <tr>
                ${columns.map((col) => this.#renderTagCell(row, col))}
              </tr>
            `,
            )}
          </tbody>
        </table>
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
        return html`<td class="col-amount ${row.totalAmount < 0 ? "amount-negative" : "amount-positive"}">${row.totalAmount.toFixed(2)}</td>`;
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
      <div class="resize-handle" @pointerdown=${this.#onResizeHandlePointerDown}></div>
      <div class="resize-handle-bottom" @pointerdown=${this.#onVerticalResizePointerDown}></div>
      <div class="resize-handle-corner" @pointerdown=${this.#onCornerResizePointerDown}></div>
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" aria-label="Edit" @click=${this.#onEdit}>${unsafeSVG(wrenchIcon)}</button>
          <button class="icon-btn icon-btn--danger" aria-label="Delete" @click=${this.#onDelete}>${unsafeSVG(trash2Icon)}</button>
        </div>
      </div>
      ${this.#renderTable()}
    `;
  }
}
