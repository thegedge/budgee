import { uuid } from "../../uuid";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { clearDb } from "../../database/clearDb";
import "./Dashboard";
import { Dashboard } from "./Dashboard";

describe("budgee-dashboard", () => {
  beforeEach(async () => {
    await clearDb(db.transactions);
    await clearDb(db.tags);
    await clearDb(db.dashboardCharts);
    await clearDb(db.dashboardTables);
    await clearDb(db.merchants);
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

  it("should render chart grid when transactions exist", async () => {
    await db.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -50,
        originalDescription: "Groceries",
        tagIds: [],
      },
      {
        id: uuid(),
        date: "2024-01-02",
        amount: -25,
        originalDescription: "Restaurant",
        tagIds: [],
      },
    ]);

    const el = document.createElement("budgee-dashboard") as Dashboard;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector(".chart-grid")).toBeTruthy();
    expect(el.shadowRoot!.querySelector(".button-bar")).toBeTruthy();

    el.remove();
  });

  it("should render dashboard tables from database", async () => {
    await db.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -50,
        originalDescription: "Groceries",
        tagIds: [],
      },
    ]);
    await db.dashboardTables.put({
      id: uuid(),
      title: "Recent Transactions",
      model: "transactions",
      columns: ["date", "amount", "description"],
      position: 0,
    });

    const el = document.createElement("budgee-dashboard") as Dashboard;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const tableCards = el.shadowRoot!.querySelectorAll("dashboard-table-card");
    expect(tableCards).toHaveLength(1);

    el.remove();
  });
});
