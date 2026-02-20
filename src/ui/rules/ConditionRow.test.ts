import { describe, expect, it, vi } from "vitest";
import "./ConditionRow";
import { ConditionRow } from "./ConditionRow";

describe("condition-row", () => {
  it("should be defined", () => {
    expect(customElements.get("condition-row")).toBe(ConditionRow);
  });

  it("should render with condition values", async () => {
    const el = document.createElement("condition-row") as ConditionRow;
    el.condition = { field: "description", operator: "startsWith", value: "star" };
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    expect(input.value).toBe("star");

    const select = el.shadowRoot!.querySelector("select")!;
    expect(select.value).toBe("startsWith");

    el.remove();
  });

  it("should dispatch condition-changed on value input", async () => {
    const el = document.createElement("condition-row") as ConditionRow;
    el.condition = { field: "description", operator: "contains", value: "" };
    el.index = 0;
    document.body.appendChild(el);
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("condition-changed", handler);

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "test";
    input.dispatchEvent(new Event("input"));

    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.condition.value).toBe("test");

    el.remove();
  });

  it("should dispatch condition-removed on remove click", async () => {
    const el = document.createElement("condition-row") as ConditionRow;
    el.index = 2;
    document.body.appendChild(el);
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("condition-removed", handler);

    const btn = el.shadowRoot!.querySelector("button")!;
    btn.click();

    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.index).toBe(2);

    el.remove();
  });
});
