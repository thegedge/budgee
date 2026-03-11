import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { buttonStyles } from "../buttonStyles";
import { iconButtonStyles } from "../iconButtonStyles";
import { inputStyles } from "../inputStyles";
import { tableStyles } from "../tableStyles";

export type SortDir = "asc" | "desc";

export type ColumnDef =
  | string
  | {
      label?: string;
      sortKey?: string;
      class?: string;
      header?: TemplateResult;
    };

declare global {
  interface HTMLElementTagNameMap {
    "paginated-table": PaginatedTable<unknown>;
  }
}

@customElement("paginated-table")
export class PaginatedTable<T = unknown> extends LitElement {
  @property({ type: Array })
  items: T[] = [];

  @property({ type: Number })
  defaultPageSize = 10;

  @property()
  storageKey = "";

  @property({ attribute: false })
  columns: ColumnDef[] = [];

  @property({ attribute: false })
  comparators: Record<string, (a: T, b: T) => number> = {};

  @property({ attribute: false })
  filterFn?: (item: T, filter: string) => boolean;

  @property()
  defaultSortCol = "";

  @property()
  defaultSortDir: SortDir = "asc";

  @property({ type: Boolean })
  loading = false;

  /** Callback to render a single row. Receives the item and its index in the current page. */
  @property({ attribute: false })
  renderRow: (item: T, index: number) => TemplateResult = () => html``;

  @state()
  private _currentPage = 1;

  @state()
  private _pageSize = 0;

  @state()
  private _sortCol = "";

  @state()
  private _sortDir: SortDir = "asc";

  @state()
  private _filter = "";

  private _filterDebounce: ReturnType<typeof setTimeout> | null = null;
  private _sortInitialized = false;

  static styles = [
    buttonStyles,
    iconButtonStyles,
    inputStyles,
    tableStyles,
    css`
      .pagination-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        font-size: 0.875rem;
        color: var(--budgee-text-muted);
      }
      .pagination-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      select {
        padding: 2px 6px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
      }
      .filter-input {
        padding: 4px 8px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        font-size: 0.875rem;
      }
      .skeleton-line {
        height: 1rem;
        background: var(--budgee-border);
        border-radius: 4px;
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 0.4;
        }
        50% {
          opacity: 1;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (this.storageKey) {
      try {
        const stored = localStorage.getItem(`budgee:pageSize:${this.storageKey}`);
        if (stored) {
          this._pageSize = Number(stored);
        }
      } catch {
        // localStorage unavailable
      }
    }
    if (!this._sortInitialized) {
      this._sortCol = this.defaultSortCol;
      this._sortDir = this.defaultSortDir;
      this._sortInitialized = true;
    }
  }

  private get _effectivePageSize() {
    return this._pageSize || this.defaultPageSize;
  }

  private get _processedItems(): T[] {
    let result = this.items;

    if (this._filter && this.filterFn) {
      result = result.filter((item) => this.filterFn!(item, this._filter));
    }

    const comparator = this._sortCol ? this.comparators[this._sortCol] : undefined;
    if (comparator) {
      const dir = this._sortDir === "asc" ? 1 : -1;
      result = [...result].sort((a, b) => comparator(a, b) * dir);
    }

    return result;
  }

  private get _totalPages() {
    return Math.max(1, Math.ceil(this._processedItems.length / this._effectivePageSize));
  }

  /** The items visible on the current page, after filtering and sorting. */
  get currentItems(): T[] {
    const size = this._effectivePageSize;
    const start = (this._currentPage - 1) * size;
    return this._processedItems.slice(start, start + size);
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("items")) {
      const prev = changed.get("items") as T[] | undefined;
      if (prev === undefined || prev.length !== this.items.length) {
        this._currentPage = 1;
      }
    }
  }

  reset() {
    this._currentPage = 1;
  }

  #onPageSizeChange(e: Event) {
    this._pageSize = Number((e.target as HTMLSelectElement).value);
    this._currentPage = 1;
    if (this.storageKey) {
      try {
        localStorage.setItem(`budgee:pageSize:${this.storageKey}`, String(this._pageSize));
      } catch {
        // localStorage unavailable
      }
    }
  }

  #prevPage() {
    if (this._currentPage > 1) {
      this._currentPage--;
    }
  }

  #nextPage() {
    if (this._currentPage < this._totalPages) {
      this._currentPage++;
    }
  }

  #onSortClick(key: string) {
    if (this._sortCol === key) {
      this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
    } else {
      this._sortCol = key;
      this._sortDir = "asc";
    }
    this._currentPage = 1;
  }

  #sortIndicator(key: string): string {
    if (this._sortCol !== key) return "";
    return this._sortDir === "asc" ? " ▲" : " ▼";
  }

  #onFilterInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (this._filterDebounce !== null) {
      clearTimeout(this._filterDebounce);
    }
    this._filterDebounce = setTimeout(() => {
      this._filterDebounce = null;
      this._filter = value;
      this._currentPage = 1;
    }, 200);
  }

  #renderHeader() {
    if (this.columns.length === 0) return nothing;

    return html`
      <thead>
        <tr>
          ${this.columns.map((col) => {
            if (typeof col === "string") {
              return html`<th>${col}</th>`;
            }
            if (col.header) {
              return html`<th class=${col.class ?? ""}>${col.header}</th>`;
            }
            const sortKey = col.sortKey;
            const isSortable = !!sortKey;
            return html`
              <th
                class=${[isSortable ? "sortable" : "", col.class ?? ""].filter(Boolean).join(" ")}
                @click=${isSortable ? () => this.#onSortClick(sortKey!) : nothing}
              >
                ${col.label ?? ""}${isSortable ? this.#sortIndicator(sortKey!) : ""}
              </th>
            `;
          })}
        </tr>
      </thead>
    `;
  }

  #renderPaginationBar() {
    const processed = this._processedItems;
    const size = this._effectivePageSize;
    const total = processed.length;
    const start = total === 0 ? 0 : (this._currentPage - 1) * size + 1;
    const end = Math.min(this._currentPage * size, total);

    return html`
      <div class="pagination-bar">
        <div class="pagination-controls">
          ${
            this.filterFn
              ? html`<input
                class="filter-input"
                type="text"
                placeholder="Filter..."
                aria-label="Filter table"
                ?disabled=${this.loading}
                @input=${this.#onFilterInput}
              />`
              : ""
          }
          <label>
            Rows per page:
            <select ?disabled=${this.loading} @change=${this.#onPageSizeChange}>
              ${[10, 25, 50, 100].map(
                (n) => html`<option value=${n} ?selected=${n === size}>${n}</option>`,
              )}
            </select>
          </label>
        </div>
        <span>${this.loading ? "Loading..." : `Showing ${start}–${end} of ${total}`}</span>
        <div class="pagination-controls">
          <button class="secondary" aria-label="Previous page" ?disabled=${this.loading || this._currentPage <= 1} @click=${this.#prevPage}>Prev</button>
          <button class="secondary" aria-label="Next page" ?disabled=${this.loading || this._currentPage >= this._totalPages} @click=${this.#nextPage}>Next</button>
        </div>
      </div>
    `;
  }

  render() {
    const pageItems = this.loading ? [] : this.currentItems;

    return html`
      ${this.#renderPaginationBar()}
      <table>
        ${this.#renderHeader()}
        <tbody>
          ${
            this.loading
              ? Array.from(
                  { length: this._effectivePageSize },
                  () =>
                    html`<tr>${Array.from(
                      { length: this.columns.length },
                      () =>
                        html`
                          <td><div class="skeleton-line"></div></td>
                        `,
                    )}</tr>`,
                )
              : pageItems.map((item, i) => this.renderRow(item, i))
          }
        </tbody>
      </table>
      ${this.#renderPaginationBar()}
    `;
  }
}
