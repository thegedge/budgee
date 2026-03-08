import { describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { uuid } from "../../uuid";
import { waitFor } from "../testing";
import "./TransactionDetail";
import { TransactionDetail } from "./TransactionDetail";

describe("transaction-detail", () => {

  it("should be defined", () => {
    expect(customElements.get("transaction-detail")).toBe(TransactionDetail);
  });

  it("should display transaction header", async () => {
    const dbs = await db();
    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2024-01-15",
      amount: -42.5,
      description: "Whole Foods Market",
      tagIds: [],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector("h2")!.textContent).toBe("Whole Foods Market");
      expect(el.shadowRoot!.querySelector(".amount")!.textContent!.trim()).toBe("-42.50");
      expect(el.shadowRoot!.querySelector(".meta")!.textContent).toContain("2024-01-15");
    });

    el.remove();
  });

  it("should display merchant name when available", async () => {
    const dbs = await db();
    const merchantId = uuid();
    await dbs.merchants.put({ id: merchantId, name: "Whole Foods" });

    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2024-01-15",
      amount: -42.5,
      description: "Whole Foods Market #123",
      merchantId,
      tagIds: [],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector(".meta")!.textContent).toContain("Whole Foods");
    });

    el.remove();
  });

  it("should display tag badges", async () => {
    const dbs = await db();
    const tagId = uuid();
    await dbs.tags.put({ id: tagId, name: "Groceries" });

    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2024-01-15",
      amount: -42.5,
      description: "Whole Foods",
      tagIds: [tagId],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);

    await waitFor(() => {
      const autocomplete = el.shadowRoot!.querySelector("tag-autocomplete")!;
      const badges = autocomplete.shadowRoot!.querySelectorAll(".tag-pill");
      expect(badges).toHaveLength(1);
      expect(badges[0].textContent).toContain("Groceries");
    });

    el.remove();
  });

  it("should save memo on blur", async () => {
    const dbs = await db();
    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2024-01-15",
      amount: -42.5,
      description: "Whole Foods",
      tagIds: [],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector("textarea")).toBeTruthy();
    });

    const textarea = el.shadowRoot!.querySelector("textarea")!;
    textarea.value = "Weekly groceries";
    textarea.dispatchEvent(new Event("blur"));

    await waitFor(async () => {
      const updated = await dbs.transactions.get(txId);
      expect(updated!.memo).toBe("Weekly groceries");
    });

    el.remove();
  });

  it("should show related transactions for same merchant", async () => {
    const dbs = await db();
    const merchantId = uuid();
    await dbs.merchants.put({ id: merchantId, name: "Starbucks" });

    const txId = uuid();
    await dbs.transactions.put({
      id: txId,
      date: "2024-01-15",
      amount: -5.5,
      description: "Starbucks #1",
      merchantId,
      tagIds: [],
    });
    await dbs.transactions.put({
      id: uuid(),
      date: "2024-01-10",
      amount: -4.75,
      description: "Starbucks #2",
      merchantId,
      tagIds: [],
    });

    const el = document.createElement("transaction-detail") as TransactionDetail;
    el.transactionId = txId;
    document.body.appendChild(el);

    await waitFor(() => {
      const sections = el.shadowRoot!.querySelectorAll(".section");
      const relatedSection = Array.from(sections).find(
        (s) => s.querySelector("h3")?.textContent === "Related Transactions",
      )!;
      expect(relatedSection).toBeTruthy();
      const relatedRows = relatedSection.querySelectorAll("tbody tr");
      expect(relatedRows).toHaveLength(1);
      expect(relatedRows[0].querySelector("td")!.textContent).toBe("2024-01-10");
    });

    el.remove();
  });
});
