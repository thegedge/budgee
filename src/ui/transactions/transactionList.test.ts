import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/db";
import type { Tag, Transaction } from "../../database/types";
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
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("p")!.textContent).toBe("No transactions found.");
    el.remove();
  });

  it("should render rows for each transaction", async () => {
    const el = document.createElement("transaction-list") as TransactionList;
    el.transactions = [
      { id: 1, date: "2024-01-01", amount: -50, originalDescription: "Groceries", tagIds: [] },
      { id: 2, date: "2024-01-02", amount: 2500, originalDescription: "Payroll", tagIds: [] },
    ] satisfies Transaction[];

    document.body.appendChild(el);
    await el.updateComplete;

    const rows = el.shadowRoot!.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(2);

    const firstCells = rows[0].querySelectorAll("td");
    expect(firstCells[0].textContent).toBe("2024-01-01");
    expect(firstCells[1].textContent).toBe("Groceries");
    expect(firstCells[2].textContent!.trim()).toBe("-50.00");
    expect(firstCells[2].classList.contains("amount-negative")).toBe(true);

    const secondCells = rows[1].querySelectorAll("td");
    expect(secondCells[2].textContent!.trim()).toBe("2500.00");
    expect(secondCells[2].classList.contains("amount-positive")).toBe(true);

    el.remove();
  });

  it("should display tag badges for tagged transactions", async () => {
    const tags: Tag[] = [
      { id: 1, name: "Food" },
      { id: 2, name: "Income" },
    ];
    const transactions: Transaction[] = [
      { id: 1, date: "2024-01-01", amount: -50, originalDescription: "Groceries", tagIds: [1] },
    ];

    const el = document.createElement("transaction-list") as TransactionList;
    el.transactions = transactions;
    el.tags = tags;
    document.body.appendChild(el);
    await el.updateComplete;

    const badges = el.shadowRoot!.querySelectorAll(".tag-badge");
    expect(badges).toHaveLength(1);
    expect(badges[0].textContent).toContain("Food");

    el.remove();
  });

  it("should add a tag via the select dropdown", async () => {
    const tagId = await db.tags.add({ name: "Food" });
    const txId = await db.transactions.add({
      date: "2024-01-01",
      amount: -50,
      originalDescription: "Groceries",
      tagIds: [],
    });

    const el = document.createElement("transaction-list") as TransactionList;
    el.transactions = [
      { id: txId, date: "2024-01-01", amount: -50, originalDescription: "Groceries", tagIds: [] },
    ];
    el.tags = [{ id: tagId, name: "Food" }];
    document.body.appendChild(el);
    await el.updateComplete;

    const select = el.shadowRoot!.querySelector(".tag-select") as HTMLSelectElement;
    select.value = String(tagId);
    select.dispatchEvent(new Event("change"));
    await new Promise((r) => setTimeout(r, 50));

    const updated = await db.transactions.get(txId);
    expect(updated!.tagIds).toContain(tagId);

    el.remove();
  });
});
