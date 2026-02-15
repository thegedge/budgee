import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/db";
import "./transactionList";
import { TransactionList } from "./transactionList";

describe("transaction-list", () => {
  beforeEach(async () => {
    await db.transactions.clear();
    await db.tags.clear();
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
    await db.transactions.bulkAdd([
      { date: "2024-01-01", amount: -50, originalDescription: "Groceries", tagIds: [] },
      { date: "2024-01-02", amount: 2500, originalDescription: "Payroll", tagIds: [] },
    ]);

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const rows = el.shadowRoot!.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(2);

    // Default sort is date descending, so 2024-01-02 comes first
    // Columns: Date, Merchant, Description, Amount, Tags
    const firstCells = rows[0].querySelectorAll("td");
    expect(firstCells[0].textContent).toBe("January 2, 2024");
    expect(firstCells[2].textContent).toBe("Payroll");
    expect(firstCells[3].textContent!.trim()).toBe("2500.00");
    expect(firstCells[3].classList.contains("amount-positive")).toBe(true);

    const secondCells = rows[1].querySelectorAll("td");
    expect(secondCells[0].textContent).toBe("January 1, 2024");
    expect(secondCells[3].textContent!.trim()).toBe("-50.00");
    expect(secondCells[3].classList.contains("amount-negative")).toBe(true);

    el.remove();
  });

  it("should display tag badges for tagged transactions", async () => {
    const tagId = await db.tags.add({ name: "Food" });
    await db.transactions.add({
      date: "2024-01-01",
      amount: -50,
      originalDescription: "Groceries",
      tagIds: [tagId],
    });

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const autocomplete = el.shadowRoot!.querySelector("tag-autocomplete")!;
    const badges = autocomplete.shadowRoot!.querySelectorAll(".tag-pill");
    expect(badges).toHaveLength(1);
    expect(badges[0].textContent).toContain("Food");

    el.remove();
  });

  it("should add a tag via the autocomplete", async () => {
    const tagId = await db.tags.add({ name: "Food" });
    const txId = await db.transactions.add({
      date: "2024-01-01",
      amount: -50,
      originalDescription: "Groceries",
      tagIds: [],
    });

    const el = document.createElement("transaction-list") as TransactionList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const autocomplete = el.shadowRoot!.querySelector("tag-autocomplete")!;
    autocomplete.dispatchEvent(
      new CustomEvent("tag-selected", { detail: { tag: { id: tagId, name: "Food" } } }),
    );
    await new Promise((r) => setTimeout(r, 50));

    const updated = await db.transactions.get(txId);
    expect(updated!.tagIds).toContain(tagId);

    el.remove();
  });
});
