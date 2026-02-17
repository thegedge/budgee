import { beforeEach, describe, expect, it } from "vitest";
import { uuid } from "../../uuid";
import { db } from "../../database/db";
import { clearDb } from "../../database/pouchHelpers";
import "./accountList";
import { AccountList } from "./accountList";

describe("account-list", () => {
  beforeEach(async () => {
    await clearDb(db.accounts);
    await clearDb(db.transactions);
  });

  it("should be defined", () => {
    expect(customElements.get("account-list")).toBe(AccountList);
  });

  it("should show empty message when no accounts", async () => {
    const el = document.createElement("account-list") as AccountList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("p")!.textContent).toBe("No accounts found.");
    el.remove();
  });

  it("should render rows for each account", async () => {
    await db.accounts.bulkDocs([
      { _id: uuid(), name: "Checking", type: "chequing" },
      { _id: uuid(), name: "Savings", type: "savings" },
    ]);

    const el = document.createElement("account-list") as AccountList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const rows = el.shadowRoot!.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(2);
    el.remove();
  });
});
