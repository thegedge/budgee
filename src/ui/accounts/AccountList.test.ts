import { describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { uuid } from "../../uuid";
import { waitFor } from "../testing";
import "./AccountList";
import { AccountList } from "./AccountList";

describe("account-list", () => {
  it("should be defined", () => {
    expect(customElements.get("account-list")).toBe(AccountList);
  });

  it("should show empty message when no accounts", async () => {
    const el = document.createElement("account-list") as AccountList;
    document.body.appendChild(el);

    await waitFor(() => {
      const empty = el.shadowRoot!.querySelector("budgee-empty-state");
      expect(empty).not.toBeNull();
      expect(empty!.getAttribute("heading")).toBe("No accounts yet");
    });

    el.remove();
  });

  it("should render rows for each account", async () => {
    const dbs = await db();
    await dbs.accounts.bulkDocs([
      { id: uuid(), name: "Checking", type: "chequing" },
      { id: uuid(), name: "Savings", type: "savings" },
    ]);

    const el = document.createElement("account-list") as AccountList;
    document.body.appendChild(el);

    await waitFor(() => {
      const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
      const rows = tableEl.shadowRoot!.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(2);
    });

    el.remove();
  });
});
