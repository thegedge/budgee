<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type SortDir = "asc" | "desc";

  export interface ColumnDef {
    label?: string;
    sortKey?: string;
    class?: string;
    headerSnippet?: Snippet;
  }
</script>

<script lang="ts" generics="T">
  import "../styles/button.css";
  import "../styles/icon-button.css";
  import "../styles/input.css";
  import "../styles/table.css";

  let {
    items = [],
    defaultPageSize = 10,
    storageKey = "",
    columns = [],
    comparators = {},
    filterFn,
    defaultSortCol = "",
    defaultSortDir = "asc" as SortDir,
    loading = false,
    renderRow,
  }: {
    items?: T[];
    defaultPageSize?: number;
    storageKey?: string;
    columns?: (string | ColumnDef)[];
    comparators?: Record<string, (a: T, b: T) => number>;
    filterFn?: (item: T, filter: string) => boolean;
    defaultSortCol?: string;
    defaultSortDir?: SortDir;
    loading?: boolean;
    renderRow: Snippet<[T, number]>;
  } = $props();

  let currentPage = $state(1);
  let pageSize = $state(0);
  let sortCol = $state("");
  let sortDir = $state<SortDir>("asc");
  let sortInitialized = false;
  let filter = $state("");
  let filterDebounce: ReturnType<typeof setTimeout> | null = null;

  // Initialize sort defaults and load stored page size
  $effect(() => {
    if (!sortInitialized) {
      sortCol = defaultSortCol;
      sortDir = defaultSortDir;
      sortInitialized = true;
    }
    if (!storageKey) return;
    try {
      const stored = localStorage.getItem(`budgee:pageSize:${storageKey}`);
      if (stored) pageSize = Number(stored);
    } catch { /* localStorage unavailable */ }
  });

  let effectivePageSize = $derived(pageSize || defaultPageSize);

  let processedItems = $derived.by(() => {
    let result = items;
    if (filter && filterFn) {
      result = result.filter((item) => filterFn!(item, filter));
    }
    const comparator = sortCol ? comparators[sortCol] : undefined;
    if (comparator) {
      const dir = sortDir === "asc" ? 1 : -1;
      result = [...result].sort((a, b) => comparator(a, b) * dir);
    }
    return result;
  });

  let totalPages = $derived(Math.max(1, Math.ceil(processedItems.length / effectivePageSize)));

  let currentItems = $derived.by(() => {
    const size = effectivePageSize;
    const start = (currentPage - 1) * size;
    return processedItems.slice(start, start + size);
  });

  // Reset page when items change
  let prevItemsLength = $state(0);
  $effect(() => {
    if (items.length !== prevItemsLength) {
      currentPage = 1;
      prevItemsLength = items.length;
    }
  });

  function onPageSizeChange(e: Event) {
    pageSize = Number((e.target as HTMLSelectElement).value);
    currentPage = 1;
    if (storageKey) {
      try {
        localStorage.setItem(`budgee:pageSize:${storageKey}`, String(pageSize));
      } catch { /* localStorage unavailable */ }
    }
  }

  function prevPage() { if (currentPage > 1) currentPage--; }
  function nextPage() { if (currentPage < totalPages) currentPage++; }

  function onSortClick(key: string) {
    if (sortCol === key) {
      sortDir = sortDir === "asc" ? "desc" : "asc";
    } else {
      sortCol = key;
      sortDir = "asc";
    }
    currentPage = 1;
  }

  function sortIndicator(key: string): string {
    if (sortCol !== key) return "";
    return sortDir === "asc" ? " \u25B2" : " \u25BC";
  }

  function onFilterInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (filterDebounce !== null) clearTimeout(filterDebounce);
    filterDebounce = setTimeout(() => {
      filterDebounce = null;
      filter = value;
      currentPage = 1;
    }, 200);
  }

  let total = $derived(processedItems.length);
  let start = $derived(total === 0 ? 0 : (currentPage - 1) * effectivePageSize + 1);
  let end = $derived(Math.min(currentPage * effectivePageSize, total));
  let pageItems = $derived(loading ? [] : currentItems);
</script>

{#snippet paginationBar()}
  <div class="pagination-bar">
    <div class="pagination-controls">
      {#if filterFn}
        <input
          class="filter-input"
          type="text"
          placeholder="Filter..."
          aria-label="Filter table"
          disabled={loading}
          oninput={onFilterInput}
        />
      {/if}
      <label>
        Rows per page:
        <select disabled={loading} onchange={onPageSizeChange}>
          {#each [10, 25, 50, 100] as n}
            <option value={n} selected={n === effectivePageSize}>{n}</option>
          {/each}
        </select>
      </label>
    </div>
    <span>{loading ? "Loading..." : `Showing ${start}\u2013${end} of ${total}`}</span>
    <div class="pagination-controls">
      <button class="secondary" aria-label="Previous page" disabled={loading || currentPage <= 1} onclick={prevPage}>Prev</button>
      <button class="secondary" aria-label="Next page" disabled={loading || currentPage >= totalPages} onclick={nextPage}>Next</button>
    </div>
  </div>
{/snippet}

{@render paginationBar()}
<table>
  {#if columns.length > 0}
    <thead>
      <tr>
        {#each columns as col}
          {#if typeof col === "string"}
            <th>{col}</th>
          {:else if col.headerSnippet}
            <th class={col.class ?? ""}>{@render col.headerSnippet()}</th>
          {:else}
            {@const isSortable = !!col.sortKey}
            <th
              class="{isSortable ? 'sortable' : ''} {col.class ?? ''}"
              onclick={isSortable ? () => onSortClick(col.sortKey!) : undefined}
            >
              {col.label ?? ""}{isSortable ? sortIndicator(col.sortKey!) : ""}
            </th>
          {/if}
        {/each}
      </tr>
    </thead>
  {/if}
  <tbody>
    {#if loading}
      {#each Array(effectivePageSize) as _}
        <tr>
          {#each columns as _c}
            <td><div class="skeleton-line"></div></td>
          {/each}
        </tr>
      {/each}
    {:else}
      {#each pageItems as item, i}
        {@render renderRow(item, i)}
      {/each}
    {/if}
  </tbody>
</table>
{@render paginationBar()}

<style>
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
    animation:
      fade-in 0.15s ease-out 0.3s both,
      pulse 1.5s ease-in-out 0.3s infinite;
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
</style>
