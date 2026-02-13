import { describe, expect, it } from "vitest";
import type { Transaction } from "../../database/types";
import "./transactionList";
import { TransactionList } from "./transactionList";

describe("transaction-list", () => {
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
});
