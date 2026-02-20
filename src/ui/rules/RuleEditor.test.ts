import { describe, expect, it, vi } from "vitest";
import type { Tag } from "../../database/types";
import "./RuleEditor";
import { RuleEditor } from "./RuleEditor";

describe("rule-editor", () => {
  it("should be defined", () => {
    expect(customElements.get("rule-editor")).toBe(RuleEditor);
  });

  it("should dispatch rule-saved with condition data", async () => {
    const el = document.createElement("rule-editor") as RuleEditor;
    el.tags = [{ id: "t1", name: "Coffee" }] satisfies Tag[];
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

    const merchantAutocomplete = el.shadowRoot!.querySelector("merchant-autocomplete")!;
    merchantAutocomplete.dispatchEvent(
      new CustomEvent("merchant-changed", { detail: { name: "Starbucks" } }),
    );
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("rule-saved", handler);

    const saveBtn = Array.from(el.shadowRoot!.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Create new",
    )!;
    saveBtn.click();

    expect(handler).toHaveBeenCalledOnce();
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.conditions).toHaveLength(1);
    expect(detail.conditions[0].value).toBe("starbucks");
    expect(detail.logic).toBe("or");

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

  it("should switch operator from equals to contains on first edit after prefill", async () => {
    const el = document.createElement("rule-editor") as RuleEditor;
    el.prefillDescription = "Whole Foods";
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;

    const conditionRow = el.shadowRoot!.querySelector("condition-row")!;

    // First edit: operator should switch to "contains"
    conditionRow.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: {
          index: 0,
          condition: { field: "description", operator: "equals", value: "Whole Foods Market" },
        },
      }),
    );
    await el.updateComplete;

    expect(conditionRow.condition.operator).toBe("contains");
    expect(conditionRow.condition.value).toBe("Whole Foods Market");

    // Second edit: operator should remain "contains" (not switch back or change)
    conditionRow.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: {
          index: 0,
          condition: { field: "description", operator: "contains", value: "Whole" },
        },
      }),
    );
    await el.updateComplete;

    expect(conditionRow.condition.operator).toBe("contains");

    el.remove();
  });

  it("should not switch operator if user already changed it before editing value", async () => {
    const el = document.createElement("rule-editor") as RuleEditor;
    el.prefillDescription = "Whole Foods";
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;

    const conditionRow = el.shadowRoot!.querySelector("condition-row")!;

    // User manually changes operator to "startsWith"
    conditionRow.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: {
          index: 0,
          condition: { field: "description", operator: "startsWith", value: "Whole Foods" },
        },
      }),
    );
    await el.updateComplete;

    // Now user edits value — operator should NOT be switched to "contains"
    conditionRow.dispatchEvent(
      new CustomEvent("condition-changed", {
        detail: {
          index: 0,
          condition: { field: "description", operator: "startsWith", value: "Whole" },
        },
      }),
    );
    await el.updateComplete;

    expect(conditionRow.condition.operator).toBe("startsWith");

    el.remove();
  });
});
