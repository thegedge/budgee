import { uuid } from "../../uuid";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/db";
import { allDocs, clearDb } from "../../database/pouchHelpers";
import "./ruleManager";
import { RuleManager } from "./ruleManager";

describe("rule-manager", () => {
  beforeEach(async () => {
    await clearDb(db.merchantRules);
    await clearDb(db.tags);
    await clearDb(db.transactions);
    await clearDb(db.merchants);
  });

  it("should be defined", () => {
    expect(customElements.get("rule-manager")).toBe(RuleManager);
  });

  it("should add a rule via clicking an unmerchanted transaction", async () => {
    await db.tags.put({ id: uuid(), name: "Coffee" });
    await db.transactions.put({
      id: uuid(),
      date: "2024-01-01",
      originalDescription: "STARBUCKS",
      amount: 5.0,
      tagIds: [],
    });

    const el = document.createElement("rule-manager") as RuleManager;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const row = el.shadowRoot!.querySelector(".clickable-row") as HTMLTableRowElement;
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
    await new Promise((r) => setTimeout(r, 50));

    const rules = await allDocs(db.merchantRules);
    expect(rules).toHaveLength(1);
    expect(rules[0].conditions[0].value).toBe("starbucks");

    el.remove();
  });

  it("should delete a rule", async () => {
    await db.merchantRules.put({
      id: uuid(),
      logic: "and",
      conditions: [{ field: "description", operator: "contains", value: "starbucks" }],
      tagIds: [],
    });

    const el = document.createElement("rule-manager") as RuleManager;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const deleteBtn = el.shadowRoot!.querySelector(
      'button[aria-label="Delete rule"]',
    ) as HTMLButtonElement;
    expect(deleteBtn).toBeTruthy();
    deleteBtn.click();
    await new Promise((r) => setTimeout(r, 50));

    const rules = await allDocs(db.merchantRules);
    expect(rules).toHaveLength(0);

    el.remove();
  });
});
