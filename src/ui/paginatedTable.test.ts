import { describe, expect, it, vi } from "vitest";
import { PaginatedTable } from "./paginatedTable";

function createTable(totalItems: number, defaultPageSize = 10): PaginatedTable {
  const el = new PaginatedTable();
  el.totalItems = totalItems;
  el.defaultPageSize = defaultPageSize;
  document.body.appendChild(el);
  return el;
}

describe("PaginatedTable", () => {
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

  it("fires page-change event on next click", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("page-change", handler);

    const nextBtn = el.shadowRoot?.querySelectorAll("button")[1];
    nextBtn?.click();
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ page: 2, pageSize: 10 });
    expect(el.shadowRoot?.textContent).toContain("Showing 11–20 of 30");

    el.remove();
  });

  it("fires page-change event on prev click", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    // Go to page 2 first
    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("page-change", handler);

    el.shadowRoot?.querySelectorAll("button")[0]?.click();
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ page: 1, pageSize: 10 });

    el.remove();
  });

  it("resets to page 1 when totalItems changes", async () => {
    const el = createTable(30, 10);
    await el.updateComplete;

    // Go to page 2
    el.shadowRoot?.querySelectorAll("button")[1]?.click();
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain("Showing 11–20 of 30");

    // Change total items
    el.totalItems = 50;
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain("Showing 1–10 of 50");

    el.remove();
  });

  it("changes page size via dropdown", async () => {
    const el = createTable(100, 10);
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("page-change", handler);

    const select = el.shadowRoot?.querySelector("select");
    select!.value = "25";
    select?.dispatchEvent(new Event("change"));
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ page: 1, pageSize: 25 });
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
});
