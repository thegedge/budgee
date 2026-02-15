import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/db";
import "./transactionDetail";
import { TransactionDetail } from "./transactionDetail";

describe("transaction-detail", () => {
  beforeEach(async () => {
    await db.transactions.clear();
    await db.tags.clear();
    await db.merchants.clear();
  });

  it("should be defined", () => {
    expect(customElements.get("transaction-detail")).toBe(TransactionDetail);
  });

  it("should display transaction header", async () => {
    const txId = await db.transactions.add({
      date: "2024-01-15",
      amount: -42.5,
      originalDescription: "Whole Foods Market",
      tagIds: [],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("h2")!.textContent).toBe("Whole Foods Market");
    expect(el.shadowRoot!.querySelector(".amount")!.textContent!.trim()).toBe("-42.50");
    expect(el.shadowRoot!.querySelector(".meta")!.textContent).toContain("2024-01-15");

    el.remove();
  });

  it("should display merchant name when available", async () => {
    const merchantId = await db.merchants.add({ name: "Whole Foods" });
    const txId = await db.transactions.add({
      date: "2024-01-15",
      amount: -42.5,
      originalDescription: "Whole Foods Market #123",
      merchantId,
      tagIds: [],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector(".meta")!.textContent).toContain("Whole Foods");

    el.remove();
  });

  it("should display tag badges", async () => {
    const tagId = await db.tags.add({ name: "Groceries" });
    const txId = await db.transactions.add({
      date: "2024-01-15",
      amount: -42.5,
      originalDescription: "Whole Foods",
      tagIds: [tagId],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const autocomplete = el.shadowRoot!.querySelector("tag-autocomplete")!;
    const badges = autocomplete.shadowRoot!.querySelectorAll(".tag-pill");
    expect(badges).toHaveLength(1);
    expect(badges[0].textContent).toContain("Groceries");

    el.remove();
  });

  it("should save memo on blur", async () => {
    const txId = await db.transactions.add({
      date: "2024-01-15",
      amount: -42.5,
      originalDescription: "Whole Foods",
      tagIds: [],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector("textarea")!;
    textarea.value = "Weekly groceries";
    textarea.dispatchEvent(new Event("blur"));
    await new Promise((r) => setTimeout(r, 50));

    const updated = await db.transactions.get(txId);
    expect(updated!.memo).toBe("Weekly groceries");

    el.remove();
  });

  it("should show related transactions for same merchant", async () => {
    const merchantId = await db.merchants.add({ name: "Starbucks" });
    const txId = await db.transactions.add({
      date: "2024-01-15",
      amount: -5.5,
      originalDescription: "Starbucks #1",
      merchantId,
      tagIds: [],
    });
    await db.transactions.add({
      date: "2024-01-10",
      amount: -4.75,
      originalDescription: "Starbucks #2",
      merchantId,
      tagIds: [],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const sections = el.shadowRoot!.querySelectorAll(".section");
    const relatedSection = Array.from(sections).find(
      (s) => s.querySelector("h3")?.textContent === "Related Transactions",
    )!;
    const relatedRows = relatedSection.querySelectorAll("tbody tr");
    expect(relatedRows).toHaveLength(1);
    expect(relatedRows[0].querySelector("td")!.textContent).toBe("2024-01-10");

    el.remove();
  });
});
