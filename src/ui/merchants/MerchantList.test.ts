import { describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { uuid } from "../../uuid";
import { waitFor } from "../testing";
import "./MerchantList";
import { MerchantList } from "./MerchantList";

describe("merchant-list", () => {

  it("should be defined", () => {
    expect(customElements.get("merchant-list")).toBe(MerchantList);
  });

  it("should show empty message when no merchants", async () => {
    const el = document.createElement("merchant-list") as MerchantList;
    document.body.appendChild(el);

    await waitFor(() => {
      const empty = el.shadowRoot!.querySelector("budgee-empty-state");
      expect(empty).not.toBeNull();
      expect(empty!.getAttribute("heading")).toBe("No merchants yet");
    });

    el.remove();
  });

  it("should render rows for each merchant", async () => {
    const dbs = await db();
    await dbs.merchants.bulkDocs([
      { id: uuid(), name: "Coffee Shop" },
      { id: uuid(), name: "Grocery Store" },
    ]);

    const el = document.createElement("merchant-list") as MerchantList;
    document.body.appendChild(el);

    await waitFor(() => {
      const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
      const rows = tableEl.shadowRoot!.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(2);
    });

    el.remove();
  });
});
