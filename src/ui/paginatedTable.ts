import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export interface PageChangeDetail {
  page: number;
  pageSize: number;
}

export interface FilterChangeDetail {
  filter: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "paginated-table": PaginatedTable;
  }
}

@customElement("paginated-table")
export class PaginatedTable extends LitElement {
  @property({ type: Number })
  totalItems = 0;

  @property({ type: Number })
  defaultPageSize = 10;

  @property()
  storageKey = "";

  @property({ type: Boolean })
  filterable = false;

  @state()
  private _currentPage = 1;

  @state()
  private _pageSize = 0;

  private _filterDebounce: ReturnType<typeof setTimeout> | null = null;

  static styles = css`
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
    button {
      padding: 4px 12px;
      cursor: pointer;
      background-color: var(--budgee-primary);
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover:not(:disabled) {
      background-color: var(--budgee-primary-hover);
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
  `;

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
  }

  private get _effectivePageSize() {
    return this._pageSize || this.defaultPageSize;
  }

  private get _totalPages() {
    return Math.max(1, Math.ceil(this.totalItems / this._effectivePageSize));
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("totalItems")) {
      this._currentPage = 1;
    }
    if (changed.has("defaultPageSize") && this._pageSize === 0) {
      this.#firePageChange();
    }
  }

  reset() {
    this._currentPage = 1;
    this.#firePageChange();
  }

  #firePageChange() {
    this.dispatchEvent(
      new CustomEvent<PageChangeDetail>("page-change", {
        detail: { page: this._currentPage, pageSize: this._effectivePageSize },
        bubbles: true,
        composed: true,
      }),
    );
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
    this.#firePageChange();
  }

  #prevPage() {
    if (this._currentPage > 1) {
      this._currentPage--;
      this.#firePageChange();
    }
  }

  #nextPage() {
    if (this._currentPage < this._totalPages) {
      this._currentPage++;
      this.#firePageChange();
    }
  }

  #onFilterInput(e: Event) {
    const filter = (e.target as HTMLInputElement).value;
    if (this._filterDebounce !== null) {
      clearTimeout(this._filterDebounce);
    }
    this._filterDebounce = setTimeout(() => {
      this._filterDebounce = null;
      this._currentPage = 1;
      this.dispatchEvent(
        new CustomEvent<FilterChangeDetail>("filter-change", {
          detail: { filter },
          bubbles: true,
          composed: true,
        }),
      );
    }, 200);
  }

  render() {
    const size = this._effectivePageSize;
    const start = (this._currentPage - 1) * size + 1;
    const end = Math.min(this._currentPage * size, this.totalItems);

    return html`
      <div class="pagination-bar">
        <div class="pagination-controls">
          ${
            this.filterable
              ? html`<input
                class="filter-input"
                type="text"
                placeholder="Filter..."
                @input=${this.#onFilterInput}
              />`
              : ""
          }
          <label>
            Rows per page:
            <select @change=${this.#onPageSizeChange}>
              ${[10, 25, 50, 100].map(
                (n) => html`<option value=${n} ?selected=${n === size}>${n}</option>`,
              )}
            </select>
          </label>
        </div>
        <span>Showing ${start}–${end} of ${this.totalItems}</span>
        <div class="pagination-controls">
          <button ?disabled=${this._currentPage <= 1} @click=${this.#prevPage}>Prev</button>
          <button ?disabled=${this._currentPage >= this._totalPages} @click=${this.#nextPage}>Next</button>
        </div>
      </div>
      <slot></slot>
    `;
  }
}
