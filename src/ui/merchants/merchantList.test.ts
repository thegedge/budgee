import { beforeEach, describe, expect, it } from "vitest";
import { uuid } from "../../uuid";
import { db } from "../../database/db";
import { clearDb } from "../../database/clearDb";
import "./merchantList";
import { MerchantList } from "./merchantList";

describe("merchant-list", () => {
  beforeEach(async () => {
    await clearDb(db.merchants);
    await clearDb(db.transactions);
  });

  it("should be defined", () => {
    expect(customElements.get("merchant-list")).toBe(MerchantList);
  });

  it("should show empty message when no merchants", async () => {
    const el = document.createElement("merchant-list") as MerchantList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("p")!.textContent).toBe("No merchants found.");
    el.remove();
  });

  it("should render rows for each merchant", async () => {
    await db.merchants.bulkDocs([
      { id: uuid(), name: "Coffee Shop" },
      { id: uuid(), name: "Grocery Store" },
    ]);

    const el = document.createElement("merchant-list") as MerchantList;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const rows = el.shadowRoot!.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(2);
    el.remove();
  });
});
