import { describe, expect, it } from "vitest";
import type { Tag, Transaction } from "../../database/types";
import "./dashboard";
import { Dashboard } from "./dashboard";

describe("budgee-dashboard", () => {
  it("should be defined", () => {
    expect(customElements.get("budgee-dashboard")).toBe(Dashboard);
  });

  it("should show empty message when no transactions", async () => {
    const el = document.createElement("budgee-dashboard") as Dashboard;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("p")!.textContent).toContain("No transactions");
    el.remove();
  });

  it("should display totals by tag", async () => {
    const tags: Tag[] = [
      { id: 1, name: "Food" },
      { id: 2, name: "Income" },
    ];
    const transactions: Transaction[] = [
      { id: 1, date: "2024-01-01", amount: -50, originalDescription: "Groceries", tagIds: [1] },
      { id: 2, date: "2024-01-02", amount: -25, originalDescription: "Restaurant", tagIds: [1] },
      { id: 3, date: "2024-01-03", amount: 2500, originalDescription: "Payroll", tagIds: [2] },
    ];

    const el = document.createElement("budgee-dashboard") as Dashboard;
    el.transactions = transactions;
    el.tags = tags;
    document.body.appendChild(el);
    await el.updateComplete;

    const rows = el.shadowRoot!.querySelectorAll("tbody tr");
    // 2 tag rows + 1 total row
    expect(rows).toHaveLength(3);

    // Sorted by total ascending: Food (-75), Income (2500)
    const firstCells = rows[0].querySelectorAll("td");
    expect(firstCells[0].textContent).toBe("Food");
    expect(firstCells[1].textContent!.trim()).toBe("-75.00");

    const secondCells = rows[1].querySelectorAll("td");
    expect(secondCells[0].textContent).toBe("Income");
    expect(secondCells[1].textContent!.trim()).toBe("2500.00");

    // Grand total row
    const totalCells = rows[2].querySelectorAll("td");
    expect(totalCells[0].textContent).toBe("Total");
    expect(totalCells[1].textContent!.trim()).toBe("2425.00");

    el.remove();
  });
});
