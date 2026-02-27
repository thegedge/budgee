import { beforeEach, describe, expect, it } from "vitest";
import { uuid } from "../../uuid";
import { db } from "../../database/Db";
import { clearDb } from "../../database/clearDb";
import { waitFor } from "../testing";
import "./AccountList";
import { AccountList } from "./AccountList";

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

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector("p")!.textContent).toBe("No accounts found.");
    });

    el.remove();
  });

  it("should render rows for each account", async () => {
    await db.accounts.bulkDocs([
      { id: uuid(), name: "Checking", type: "chequing" },
      { id: uuid(), name: "Savings", type: "savings" },
    ]);

    const el = document.createElement("account-list") as AccountList;
    document.body.appendChild(el);

    await waitFor(() => {
      const rows = el.shadowRoot!.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(2);
    });

    el.remove();
  });
});
