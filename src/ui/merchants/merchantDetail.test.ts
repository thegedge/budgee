import { beforeEach, describe, expect, it } from "vitest";
import { uuid } from "../../uuid";
import { db } from "../../database/db";
import { clearDb } from "../../database/pouchHelpers";
import "./merchantDetail";
import { MerchantDetail } from "./merchantDetail";

describe("merchant-detail", () => {
  beforeEach(async () => {
    await clearDb(db.merchants);
    await clearDb(db.transactions);
  });

  it("should be defined", () => {
    expect(customElements.get("merchant-detail")).toBe(MerchantDetail);
  });

  it("should show loading when no merchant loaded", async () => {
    const el = document.createElement("merchant-detail") as MerchantDetail;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("p")!.textContent).toContain("Loading");
    el.remove();
  });

  it("should render merchant name and transactions", async () => {
    const merchantId = uuid();
    await db.merchants.put({ _id: merchantId, name: "Coffee Shop" });
    await db.transactions.bulkDocs([
      {
        _id: uuid(),
        date: "2025-12-15",
        amount: -5.5,
        originalDescription: "Morning coffee",
        tagIds: [],
        merchantId,
      },
      {
        _id: uuid(),
        date: "2025-12-16",
        amount: -4.75,
        originalDescription: "Afternoon coffee",
        tagIds: [],
        merchantId,
      },
    ]);

    const el = document.createElement("merchant-detail") as MerchantDetail;
    el.merchantId = merchantId;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 200));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("h2")!.textContent).toBe("Coffee Shop");

    const rows = el.shadowRoot!.querySelectorAll(".section-transactions tbody tr");
    expect(rows).toHaveLength(2);
    el.remove();
  });
});
