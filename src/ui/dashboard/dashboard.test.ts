import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/db";
import "./dashboard";
import { Dashboard } from "./dashboard";

describe("budgee-dashboard", () => {
  beforeEach(async () => {
    await db.transactions.clear();
    await db.tags.clear();
    await db.dashboardCharts.clear();
    await db.merchants.clear();
  });

  it("should be defined", () => {
    expect(customElements.get("budgee-dashboard")).toBe(Dashboard);
  });

  it("should show empty message when no transactions", async () => {
    const el = document.createElement("budgee-dashboard") as Dashboard;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("p")!.textContent).toContain("No transactions");
    el.remove();
  });

  it("should display totals by tag", async () => {
    const foodId = await db.tags.add({ name: "Food" });
    const incomeId = await db.tags.add({ name: "Income" });
    await db.transactions.bulkAdd([
      { date: "2024-01-01", amount: -50, originalDescription: "Groceries", tagIds: [foodId] },
      { date: "2024-01-02", amount: -25, originalDescription: "Restaurant", tagIds: [foodId] },
      { date: "2024-01-03", amount: 2500, originalDescription: "Payroll", tagIds: [incomeId] },
    ]);

    const el = document.createElement("budgee-dashboard") as Dashboard;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const cards = el.shadowRoot!.querySelectorAll(".card");
    const tagCard = Array.from(cards).find(
      (c) => c.querySelector("h3")?.textContent === "Spending by Tag",
    )!;
    const rows = tagCard.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(3);

    const firstCells = rows[0].querySelectorAll("td");
    expect(firstCells[0].textContent).toBe("Food");
    expect(firstCells[1].textContent!.trim()).toBe("-75.00");

    const secondCells = rows[1].querySelectorAll("td");
    expect(secondCells[0].textContent).toBe("Income");
    expect(secondCells[1].textContent!.trim()).toBe("2500.00");

    const totalCells = rows[2].querySelectorAll("td");
    expect(totalCells[0].textContent).toBe("Total");
    expect(totalCells[1].textContent!.trim()).toBe("2425.00");

    el.remove();
  });
});
