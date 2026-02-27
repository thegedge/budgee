import { beforeEach, describe, expect, it } from "vitest";
import { uuid } from "../../uuid";
import { db } from "../../database/Db";
import { clearDb } from "../../database/clearDb";
import { waitFor } from "../testing";
import "./MerchantDetail";
import { MerchantDetail } from "./MerchantDetail";

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
    await db.merchants.put({ id: merchantId, name: "Coffee Shop" });
    await db.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2025-12-15",
        amount: -5.5,
        originalDescription: "Morning coffee",
        tagIds: [],
        merchantId,
      },
      {
        id: uuid(),
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

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector("h2")!.textContent).toContain("Coffee Shop");
      const rows = el.shadowRoot!.querySelectorAll(".section-transactions tbody tr");
      expect(rows).toHaveLength(2);
    });

    el.remove();
  });

  it("should render transactions when merchantId is set after connecting", async () => {
    const merchantId = uuid();
    await db.merchants.put({ id: merchantId, name: "Coffee Shop" });
    await db.transactions.bulkDocs([
      {
        id: uuid(),
        date: "2025-12-15",
        amount: -5.5,
        originalDescription: "Morning coffee",
        tagIds: [],
        merchantId,
      },
    ]);

    const el = document.createElement("merchant-detail") as MerchantDetail;
    document.body.appendChild(el);
    el.merchantId = merchantId;

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector("h2")!.textContent).toContain("Coffee Shop");
      const rows = el.shadowRoot!.querySelectorAll(".section-transactions tbody tr");
      expect(rows).toHaveLength(1);
    });

    el.remove();
  });

  it("should allow inline editing of the merchant name", async () => {
    const merchantId = uuid();
    await db.merchants.put({ id: merchantId, name: "Coffee Shop" });

    const el = document.createElement("merchant-detail") as MerchantDetail;
    el.merchantId = merchantId;
    document.body.appendChild(el);

    await waitFor(() => {
      const editBtn = el.shadowRoot!.querySelector<HTMLButtonElement>(".edit-name-btn")!;
      expect(editBtn).toBeTruthy();
    });

    // Click edit button
    const editBtn = el.shadowRoot!.querySelector<HTMLButtonElement>(".edit-name-btn")!;
    editBtn.click();
    await el.updateComplete;

    // Input should appear with current name
    const input = el.shadowRoot!.querySelector<HTMLInputElement>(".name-input")!;
    expect(input).toBeTruthy();
    expect(input.value).toBe("Coffee Shop");

    // Type new name and press Escape — should revert
    input.value = "Tea House";
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector(".name-input")).toBeNull();
    expect(el.shadowRoot!.querySelector("h2")!.textContent).toContain("Coffee Shop");

    // Edit again, type new name, press Enter — should save
    el.shadowRoot!.querySelector<HTMLButtonElement>(".edit-name-btn")!.click();
    await el.updateComplete;

    const input2 = el.shadowRoot!.querySelector<HTMLInputElement>(".name-input")!;
    input2.value = "Tea House";
    input2.dispatchEvent(new Event("input"));
    input2.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector(".name-input")).toBeNull();
      expect(el.shadowRoot!.querySelector("h2")!.textContent).toContain("Tea House");
    });

    el.remove();
  });
});
