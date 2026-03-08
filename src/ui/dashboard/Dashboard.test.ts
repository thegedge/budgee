import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { uuid } from "../../uuid";
import { waitFor } from "../testing";
import "./Dashboard";
import { Dashboard } from "./Dashboard";

describe("budgee-dashboard", () => {
  beforeEach(async () => {
    const dbs = await db();
    await dbs.transactions.clear();
    await dbs.tags.clear();
    await dbs.dashboardCharts.clear();
    await dbs.dashboardTables.clear();
    await dbs.merchants.clear();
  });

  it("should be defined", () => {
    expect(customElements.get("budgee-dashboard")).toBe(Dashboard);
  });

  it("should show empty message when no transactions", async () => {
    const el = document.createElement("budgee-dashboard") as Dashboard;
    document.body.appendChild(el);

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector("p")!.textContent).toContain("No transactions");
    });

    el.remove();
  });

  it("should render chart grid when transactions exist", async () => {
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
        amount: -25,
        description: "Restaurant",
        tagIds: [],
      },
    ]);

    const el = document.createElement("budgee-dashboard") as Dashboard;
    document.body.appendChild(el);

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector(".chart-grid")).toBeTruthy();
      expect(el.shadowRoot!.querySelector(".button-bar")).toBeTruthy();
    });

    el.remove();
  });

  it("should render dashboard tables from database", async () => {
    const dbs = await db();
    await dbs.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2024-01-01",
        amount: -50,
        description: "Groceries",
        tagIds: [],
      },
    ]);
    await dbs.dashboardTables.put({
      id: uuid(),
      title: "Recent Transactions",
      model: "transactions",
      columns: ["date", "amount", "description"],
      position: 0,
    });

    const el = document.createElement("budgee-dashboard") as Dashboard;
    document.body.appendChild(el);

    await waitFor(() => {
      const tableCards = el.shadowRoot!.querySelectorAll("dashboard-table-card");
      expect(tableCards).toHaveLength(1);
    });

    el.remove();
  });
});
