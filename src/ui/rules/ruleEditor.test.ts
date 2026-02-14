import { describe, expect, it, vi } from "vitest";
import type { Tag } from "../../database/types";
import "./ruleEditor";
import { RuleEditor } from "./ruleEditor";

describe("rule-editor", () => {
  it("should be defined", () => {
    expect(customElements.get("rule-editor")).toBe(RuleEditor);
  });

  it("should dispatch rule-saved with condition data", async () => {
    const el = document.createElement("rule-editor") as RuleEditor;
    el.tags = [{ id: 1, name: "Coffee" }] satisfies Tag[];
    document.body.appendChild(el);
    await el.updateComplete;

    const conditionRow = el.shadowRoot!.querySelector("condition-row")!;
    conditionRow.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: {
          index: 0,
          condition: { field: "description", operator: "contains", value: "starbucks" },
        },
      }),
    );
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("rule-saved", handler);

    const saveBtn = Array.from(el.shadowRoot!.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Save Rule",
    )!;
    saveBtn.click();

    expect(handler).toHaveBeenCalledOnce();
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.conditions).toHaveLength(1);
    expect(detail.conditions[0].value).toBe("starbucks");
    expect(detail.logic).toBe("and");

    el.remove();
  });

  it("should prefill description from property", async () => {
    const el = document.createElement("rule-editor") as RuleEditor;
    el.prefillDescription = "Whole Foods";
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;

    const conditionRow = el.shadowRoot!.querySelector("condition-row")!;
    expect(conditionRow.condition.value).toBe("Whole Foods");

    el.remove();
  });
});
