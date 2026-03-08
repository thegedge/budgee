import { type ReactiveController, type ReactiveControllerHost } from "lit";

export type SortDir = "asc" | "desc";

export interface SortableListControllerOptions<T, K extends string = string> {
  /** Map of column key -> comparator returning negative/zero/positive. */
  comparators: Record<K, (a: T, b: T) => number>;
  /** Returns true if the item should be included for the given filter string. */
  filterFn: (item: T, filter: string) => boolean;
  /** Initial sort column. */
  defaultSortCol?: K;
  /** Initial sort direction. */
  defaultSortDir?: SortDir;
}

/**
 * Lit reactive controller that manages sort column, sort direction, and filter
 * state for list views. Provides `filterAndSort(items)` to apply filter + sort,
 * and helpers for sort-click handling and sort indicator rendering.
 *
 * Pagination is NOT managed here — pass the result of `filterAndSort()` to
 * `<paginated-table>` which handles it internally.
 */
export class SortableListController<T, K extends string = string> implements ReactiveController {
  #host: ReactiveControllerHost;
  #comparators: Record<K, (a: T, b: T) => number>;
  #filterFn: (item: T, filter: string) => boolean;

  sortCol: K | "";
  sortDir: SortDir;
  filter = "";

  constructor(
    host: ReactiveControllerHost,
    options: SortableListControllerOptions<T, K>,
  ) {
    this.#host = host;
    this.#comparators = options.comparators;
    this.#filterFn = options.filterFn;
    this.sortCol = options.defaultSortCol ?? "";
    this.sortDir = options.defaultSortDir ?? "asc";
    host.addController(this);
  }

  /** Filter then sort the given items. Returns a new array. */
  filterAndSort(items: T[]): T[] {
    const filtered = items.filter((item) => this.#filterFn(item, this.filter));

    const comparator = this.sortCol ? this.#comparators[this.sortCol as K] : undefined;
    if (!comparator) return filtered;

    const dir = this.sortDir === "asc" ? 1 : -1;
    return filtered.sort((a, b) => comparator(a, b) * dir);
  }

  /** Handle a sort header click — toggles direction if same column, else resets to asc. */
  onSortClick(col: K): void {
    if (this.sortCol === col) {
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      this.sortCol = col;
      this.sortDir = "asc";
    }
    this.#host.requestUpdate();
  }

  /** Returns the sort indicator string for use in column headers. */
  sortIndicator(col: K): string {
    if (this.sortCol !== col) return "";
    return this.sortDir === "asc" ? " ▲" : " ▼";
  }

  /** Handle a filter-change event from PaginatedTable. */
  onFilterChange(filter: string): void {
    this.filter = filter;
    this.#host.requestUpdate();
  }
}
