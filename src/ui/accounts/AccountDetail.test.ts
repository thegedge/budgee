import { beforeEach, describe, expect, it } from "vitest";
import { uuid } from "../../uuid";
import { db } from "../../database/Db";
import { clearDb } from "../../database/clearDb";
import { waitFor } from "../testing";
import "./AccountDetail";
import { AccountDetail } from "./AccountDetail";

describe("account-detail", () => {
  beforeEach(async () => {
    await clearDb(db.accounts);
    await clearDb(db.transactions);
  });

  it("should be defined", () => {
    expect(customElements.get("account-detail")).toBe(AccountDetail);
  });

  it("should show loading when no account loaded", async () => {
    const el = document.createElement("account-detail") as AccountDetail;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("p")!.textContent).toContain("Loading");
    el.remove();
  });

  it("should render account name and transactions", async () => {
    const accountId = uuid();
    await db.accounts.put({ id: accountId, name: "Checking", type: "chequing" });
    await db.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2025-12-15",
        amount: -50,
        originalDescription: "Groceries",
        tagIds: [],
        accountId,
      },
      {
        id: uuid(),
        date: "2025-12-16",
        amount: 2500,
        originalDescription: "Payroll",
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
      const rows = el.shadowRoot!.querySelectorAll(".section-transactions tbody tr");
      expect(rows).toHaveLength(2);
    });

    el.remove();
  });
});
