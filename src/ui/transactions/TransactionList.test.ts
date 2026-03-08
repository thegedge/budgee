import { describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { uuid } from "../../uuid";
import { waitFor } from "../testing";
import "./TransactionList";
import { TransactionList } from "./TransactionList";

describe("transaction-list", () => {

  it("should be defined", () => {
    expect(customElements.get("transaction-list")).toBe(TransactionList);
  });

  it("should show empty message when no transactions", async () => {
    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);

    await waitFor(() => {
      const empty = el.shadowRoot!.querySelector("budgee-empty-state");
      expect(empty).not.toBeNull();
      expect(empty!.getAttribute("heading")).toBe("No transactions yet");
    });

    el.remove();
  });

  it("should render rows for each transaction", async () => {
    const dbs = await db();
    await dbs.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -50,
        description: "Groceries",
        tagIds: [],
      },
      {
        id: uuid(),
        date: "2024-01-02",
        amount: 2500,
        description: "Payroll",
        tagIds: [],
      },
    ]);

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);

    let rows: NodeListOf<Element>;
    await waitFor(() => {
      const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
      rows = tableEl.shadowRoot!.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(2);
    });

    const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
    rows = tableEl.shadowRoot!.querySelectorAll("tbody tr");

    // Default sort is date descending, so 2024-01-02 comes first
    // Columns: Checkbox, Date, Merchant, Description, Amount, Tags
    const firstCells = rows[0].querySelectorAll("td");
    expect(firstCells[1].textContent).toBe("January 2, 2024");
    expect(firstCells[3].textContent).toBe("Payroll");
    expect(firstCells[4].textContent!.trim()).toBe("$2,500.00");
    expect(firstCells[4].classList.contains("amount-positive")).toBe(true);

    const secondCells = rows[1].querySelectorAll("td");
    expect(secondCells[1].textContent).toBe("January 1, 2024");
    expect(secondCells[4].textContent!.trim()).toBe("-$50.00");
    expect(secondCells[4].classList.contains("amount-negative")).toBe(true);

    el.remove();
  });

  it("should display tag badges for tagged transactions", async () => {
    const dbs = await db();
    const tagId = uuid();
    await dbs.tags.put({ id: tagId, name: "Food" });
    await dbs.transactions.put({
      id: uuid(),
      date: "2024-01-01",
      amount: -50,
      description: "Groceries",
      tagIds: [tagId],
    });

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);

    await waitFor(() => {
      const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
      const pills = tableEl.shadowRoot!.querySelector("tag-pills")!;
      expect(pills).toBeTruthy();
      const badges = pills.shadowRoot!.querySelectorAll(".tag-pill");
      expect(badges).toHaveLength(1);
      expect(badges[0].textContent).toContain("Food");
    });

    el.remove();
  });

  it("should not allow removing tags from the list view", async () => {
    const dbs = await db();
    const tagId = uuid();
    await dbs.tags.put({ id: tagId, name: "Food" });
    await dbs.transactions.put({
      id: uuid(),
      date: "2024-01-01",
      amount: -50,
      description: "Groceries",
      tagIds: [tagId],
    });

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);

    await waitFor(() => {
      const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
      const pills = tableEl.shadowRoot!.querySelector("tag-pills")!;
      expect(pills).toBeTruthy();
      expect(pills.shadowRoot!.querySelector("tag-autocomplete")).toBeNull();
      expect(pills.shadowRoot!.querySelectorAll(".tag-pill")).toHaveLength(1);
    });

    el.remove();
  });
});
