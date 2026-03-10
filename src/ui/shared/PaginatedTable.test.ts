import { html } from "lit";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PaginatedTable } from "./PaginatedTable";

function makeItems(count: number): { id: number }[] {
  return Array.from({ length: count }, (_, i) => ({ id: i + 1 }));
}

function createTable(count: number, defaultPageSize = 10): PaginatedTable<{ id: number }> {
  const el = new PaginatedTable<{ id: number }>();
  el.items = makeItems(count);
  el.defaultPageSize = defaultPageSize;
  el.renderRow = (item) => html`<tr><td>${item.id}</td></tr>`;
  document.body.appendChild(el);
  return el;
}

const storage = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
};

describe("PaginatedTable", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "localStorage", { value: mockLocalStorage, writable: true });
  });

  afterEach(() => {
    storage.clear();
  });

  it("should be defined", () => {
    expect(customElements.get("paginated-table")).toBeDefined();
  });

  it("renders showing text with correct range", async () => {
    const el = createTable(55, 10);
    await el.updateComplete;

    const text = el.shadowRoot?.textContent;
    expect(text).toContain("Showing 1–10 of 55");

    el.remove();
  });

  it("disables prev button on first page", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll("button");
    const prevBtn = buttons?.[0];
    expect(prevBtn?.disabled).toBe(true);

    el.remove();
  });

  it("enables next button when more pages exist", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll("button");
    const nextBtn = buttons?.[1];
    expect(nextBtn?.disabled).toBe(false);

    el.remove();
  });

  it("disables next button on last page", async () => {
    const el = createTable(5, 10);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll("button");
    const nextBtn = buttons?.[1];
    expect(nextBtn?.disabled).toBe(true);

    el.remove();
  });

  it("navigates to next page on next click", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    const nextBtn = el.shadowRoot?.querySelectorAll("button")[1];
    nextBtn?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Showing 11–20 of 30");
    expect(el.currentItems.map((i) => i.id)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    el.remove();
  });

  it("navigates back to prev page on prev click", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    // Go to page 2 first
    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;

    el.shadowRoot?.querySelectorAll("button")[0]?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Showing 1–10 of 30");

    el.remove();
  });

  it("resets to page 1 when items length changes", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    // Go to page 2
    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain("Showing 11–20 of 30");

    // Change items to a different length
    el.items = makeItems(50);
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain("Showing 1–10 of 50");

    el.remove();
  });

  it("does not reset page when items length is unchanged (e.g. sort change)", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    // Go to page 2
    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain("Showing 11–20 of 30");

    // Replace with same-length array (simulating a sort)
    el.items = makeItems(30).reverse();
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain("Showing 11–20 of 30");

    el.remove();
  });

  it("changes page size via dropdown", async () => {
    const el = createTable(100, 10);
    await el.updateComplete;

    const select = el.shadowRoot?.querySelector("select");
    select!.value = "25";
    select?.dispatchEvent(new Event("change"));
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Showing 1–25 of 100");

    el.remove();
  });

  it("shows correct range on last page with partial rows", async () => {
    const el = createTable(23, 10);
    await el.updateComplete;

    // Go to page 3
    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Showing 21–23 of 23");

    el.remove();
  });

  it("reset() returns to page 1", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;

    el.reset();
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain("Showing 1–10 of 30");

    el.remove();
  });

  it("persists page size to localStorage when storageKey is set", async () => {
    const el = createTable(100, 10);
    el.storageKey = "test-table";
    document.body.appendChild(el);
    await el.updateComplete;

    const select = el.shadowRoot?.querySelector("select");
    select!.value = "50";
    select?.dispatchEvent(new Event("change"));

    expect(localStorage.getItem("budgee:pageSize:test-table")).toBe("50");

    el.remove();
  });

  it("restores page size from localStorage on connect", async () => {
    localStorage.setItem("budgee:pageSize:test-restore", "25");

    const el = new PaginatedTable<{ id: number }>();
    el.items = makeItems(100);
    el.defaultPageSize = 10;
    el.storageKey = "test-restore";
    el.renderRow = (item) => html`<tr><td>${item.id}</td></tr>`;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Showing 1–25 of 100");

    el.remove();
  });

  it("does not use localStorage when storageKey is empty", async () => {
    const el = createTable(100, 10);
    await el.updateComplete;

    const select = el.shadowRoot?.querySelector("select");
    select!.value = "50";
    select?.dispatchEvent(new Event("change"));

    expect(localStorage.getItem("budgee:pageSize:")).toBeNull();

    el.remove();
  });

  it("shows 0–0 of 0 when items is empty", async () => {
    const el = createTable(0, 10);
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Showing 0–0 of 0");

    el.remove();
  });

  it("currentItems returns the correct slice", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    expect(el.currentItems.map((i) => i.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;

    expect(el.currentItems.map((i) => i.id)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    el.remove();
  });

  describe("loading state", () => {
    function createLoadingTable(pageSize = 5): PaginatedTable<{ id: number }> {
      const el = new PaginatedTable<{ id: number }>();
      el.items = makeItems(20);
      el.defaultPageSize = pageSize;
      el.columns = ["ID", "Name"];
      el.filterFn = (item, filter) => String(item.id).includes(filter);
      el.renderRow = (item) => html`<tr><td>${item.id}</td></tr>`;
      el.loading = true;
      document.body.appendChild(el);
      return el;
    }

    it("renders skeleton rows instead of data rows when loading is true", async () => {
      const el = createLoadingTable(5);
      await el.updateComplete;

      const skeletons = el.shadowRoot?.querySelectorAll(".skeleton-line");
      // 5 rows × 2 columns × 2 pagination bars = 20 skeleton-line elements, but
      // skeleton rows are only in the tbody — the pagination bars render twice so
      // we check there is at least one skeleton-line and no rendered data rows.
      expect(skeletons?.length).toBeGreaterThan(0);

      const tds = el.shadowRoot?.querySelectorAll("tbody td");
      // Every td should contain a skeleton-line, not real data
      tds?.forEach((td) => {
        expect(td.querySelector(".skeleton-line")).not.toBeNull();
      });

      el.remove();
    });

    it("disables the filter input when loading is true", async () => {
      const el = createLoadingTable();
      await el.updateComplete;

      const input = el.shadowRoot?.querySelector<HTMLInputElement>("input.filter-input");
      expect(input?.disabled).toBe(true);

      el.remove();
    });

    it("disables the page-size select when loading is true", async () => {
      const el = createLoadingTable();
      await el.updateComplete;

      // Two pagination bars render, each with a select — both should be disabled.
      const selects = el.shadowRoot?.querySelectorAll<HTMLSelectElement>("select");
      expect(selects?.length).toBeGreaterThan(0);
      selects?.forEach((select) => {
        expect(select.disabled).toBe(true);
      });

      el.remove();
    });

    it("disables prev and next buttons when loading is true", async () => {
      const el = createLoadingTable();
      await el.updateComplete;

      const buttons = el.shadowRoot?.querySelectorAll<HTMLButtonElement>("button");
      expect(buttons?.length).toBeGreaterThan(0);
      buttons?.forEach((btn) => {
        expect(btn.disabled).toBe(true);
      });

      el.remove();
    });

    it("shows 'Loading...' status text instead of range when loading is true", async () => {
      const el = createLoadingTable();
      await el.updateComplete;

      expect(el.shadowRoot?.textContent).toContain("Loading...");
      expect(el.shadowRoot?.textContent).not.toContain("Showing");

      el.remove();
    });
  });
});
