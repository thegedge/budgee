import { describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { uuid } from "../../uuid";
import { waitFor } from "../testing";
import "./AccountDetail";
import { AccountDetail } from "./AccountDetail";

describe("account-detail", () => {

  it("should be defined", () => {
    expect(customElements.get("account-detail")).toBe(AccountDetail);
  });

  it("should show loading skeleton when no account loaded", async () => {
    const el = document.createElement("account-detail") as AccountDetail;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("budgee-skeleton")).toBeTruthy();
    el.remove();
  });

  it("should render account name and transactions", async () => {
    const dbs = await db();
    const accountId = uuid();
    await dbs.accounts.put({ id: accountId, name: "Checking", type: "chequing" });
    await dbs.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2025-12-15",
        amount: -50,
        description: "Groceries",
        tagIds: [],
        accountId,
      },
      {
        id: uuid(),
        date: "2025-12-16",
        amount: 2500,
        description: "Payroll",
        tagIds: [],
        accountId,
      },
    ]);

    const el = document.createElement("account-detail") as AccountDetail;
    el.accountId = accountId;
    document.body.appendChild(el);

    await waitFor(() => {
      const name = el.shadowRoot!.querySelector(".editable")!;
      expect(name.textContent).toBe("Checking");
      const tableEl = el.shadowRoot!.querySelector(".section-transactions paginated-table")!;
      const rows = tableEl.shadowRoot!.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(2);
    });

    el.remove();
  });
});
