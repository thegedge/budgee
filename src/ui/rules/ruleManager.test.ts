import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/db";
import "./ruleManager";
import { RuleManager } from "./ruleManager";

describe("rule-manager", () => {
  beforeEach(async () => {
    await db.merchantRules.clear();
    await db.tags.clear();
  });

  it("should be defined", () => {
    expect(customElements.get("rule-manager")).toBe(RuleManager);
  });

  it("should add a rule", async () => {
    await db.tags.add({ name: "Coffee" });

    const el = document.createElement("rule-manager") as RuleManager;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "starbucks";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const addBtn = el.shadowRoot!.querySelector("button:not(.delete-btn)")!;
    (addBtn as HTMLButtonElement).click();
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const rules = await db.merchantRules.toArray();
    expect(rules).toHaveLength(1);
    expect(rules[0].pattern).toBe("starbucks");

    el.remove();
  });

  it("should delete a rule", async () => {
    await db.merchantRules.add({ pattern: "starbucks", tagIds: [] });

    const el = document.createElement("rule-manager") as RuleManager;
    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const deleteBtn = el.shadowRoot!.querySelector(".delete-btn") as HTMLButtonElement;
    expect(deleteBtn).toBeTruthy();
    deleteBtn.click();
    await new Promise((r) => setTimeout(r, 50));

    const rules = await db.merchantRules.toArray();
    expect(rules).toHaveLength(0);

    el.remove();
  });
});
