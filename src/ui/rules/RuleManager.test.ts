import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { uuid } from "../../uuid";
import { waitFor } from "../testing";
import "./RuleManager";
import { RuleManager } from "./RuleManager";

describe("rule-manager", () => {
  beforeEach(async () => {
    const dbs = await db();
    await dbs.merchantRules.clear();
    await dbs.tags.clear();
    await dbs.transactions.clear();
    await dbs.merchants.clear();
  });

  it("should be defined", () => {
    expect(customElements.get("rule-manager")).toBe(RuleManager);
  });

  it("should add a rule via clicking an unmerchanted transaction", async () => {
    const dbs = await db();
    await dbs.tags.put({ id: uuid(), name: "Coffee" });
    await dbs.transactions.put({
      id: uuid(),
      date: "2024-01-01",
      description: "STARBUCKS",
      amount: 5.0,
      tagIds: [],
    });

    const el = document.createElement("rule-manager") as RuleManager;
    document.body.appendChild(el);

    await waitFor(() => {
      const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
      const row = tableEl.shadowRoot!.querySelector(".clickable-row") as HTMLTableRowElement;
      expect(row).toBeTruthy();
    });

    const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
    const row = tableEl.shadowRoot!.querySelector(".clickable-row") as HTMLTableRowElement;
    row.click();
    await el.updateComplete;

    const modal = el.shadowRoot!.querySelector("budgee-modal")!;
    const editor = modal.querySelector("rule-editor")!;
    editor.dispatchEvent(
      new CustomEvent("rule-saved", {
        detail: {
          logic: "and",
          conditions: [{ field: "description", operator: "contains", value: "starbucks" }],
          tagIds: [],
        },
      }),
    );

    await waitFor(async () => {
      const rules = await dbs.merchantRules.all();
      expect(rules).toHaveLength(1);
      expect(rules[0].conditions[0].value).toBe("starbucks");
    });

    el.remove();
  });

  it("should delete a rule", async () => {
    const dbs = await db();
    await dbs.merchantRules.put({
      id: uuid(),
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "starbucks" }],
      tagIds: [],
    });

    const el = document.createElement("rule-manager") as RuleManager;
    document.body.appendChild(el);

    let deleteBtn: HTMLButtonElement;
    await waitFor(() => {
      const tableEls = el.shadowRoot!.querySelectorAll("paginated-table");
      for (const tableEl of tableEls) {
        const btn = tableEl.shadowRoot!.querySelector(
          'button[aria-label="Delete rule"]',
        ) as HTMLButtonElement | null;
        if (btn) {
          deleteBtn = btn;
          break;
        }
      }
      expect(deleteBtn).toBeTruthy();
    });

    deleteBtn!.click();

    await waitFor(async () => {
      const rules = await dbs.merchantRules.all();
      expect(rules).toHaveLength(0);
    });

    el.remove();
  });
});
