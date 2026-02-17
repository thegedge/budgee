import { uuid } from "../../uuid";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/db";
import { clearDb } from "../../database/pouchHelpers";
import "./transactionList";
import { TransactionList } from "./transactionList";

describe("transaction-list", () => {
  beforeEach(async () => {
    await clearDb(db.transactions);
    await clearDb(db.tags);
  });

  it("should be defined", () => {
    expect(customElements.get("transaction-list")).toBe(TransactionList);
  });

  it("should show empty message when no transactions", async () => {
    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("p")!.textContent).toBe("No transactions found.");
    el.remove();
  });

  it("should render rows for each transaction", async () => {
    await db.transactions.bulkDocs([
      {
        _id: uuid(),
        date: "2024-01-01",
        amount: -50,
        originalDescription: "Groceries",
        tagIds: [],
      },
      {
        _id: uuid(),
        date: "2024-01-02",
        amount: 2500,
        originalDescription: "Payroll",
        tagIds: [],
      },
    ]);

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const rows = el.shadowRoot!.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(2);

    // Default sort is date descending, so 2024-01-02 comes first
    // Columns: Checkbox, Date, Merchant, Description, Amount, Tags
    const firstCells = rows[0].querySelectorAll("td");
    expect(firstCells[1].textContent).toBe("January 2, 2024");
    expect(firstCells[3].textContent).toBe("Payroll");
    expect(firstCells[4].textContent!.trim()).toBe("2500.00");
    expect(firstCells[4].classList.contains("amount-positive")).toBe(true);

    const secondCells = rows[1].querySelectorAll("td");
    expect(secondCells[1].textContent).toBe("January 1, 2024");
    expect(secondCells[4].textContent!.trim()).toBe("-50.00");
    expect(secondCells[4].classList.contains("amount-negative")).toBe(true);

    el.remove();
  });

  it("should display tag badges for tagged transactions", async () => {
    const tagId = uuid();
    await db.tags.put({ _id: tagId, name: "Food" });
    await db.transactions.put({
      _id: uuid(),
      date: "2024-01-01",
      amount: -50,
      originalDescription: "Groceries",
      tagIds: [tagId],
    });

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const pills = el.shadowRoot!.querySelector("tag-pills")!;
    const badges = pills.shadowRoot!.querySelectorAll(".tag-pill");
    expect(badges).toHaveLength(1);
    expect(badges[0].textContent).toContain("Food");

    el.remove();
  });

  it("should not allow removing tags from the list view", async () => {
    const tagId = uuid();
    await db.tags.put({ _id: tagId, name: "Food" });
    await db.transactions.put({
      _id: uuid(),
      date: "2024-01-01",
      amount: -50,
      originalDescription: "Groceries",
      tagIds: [tagId],
    });

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const pills = el.shadowRoot!.querySelector("tag-pills")!;
    expect(pills.shadowRoot!.querySelector("tag-autocomplete")).toBeNull();
    expect(pills.shadowRoot!.querySelectorAll(".tag-pill")).toHaveLength(1);

    el.remove();
  });
});
