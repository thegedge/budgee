import { describe, expect, it, vi } from "vitest";
import type { Transaction } from "../../database/types";
import "./chartConfigurator";
import { ChartConfigurator } from "./chartConfigurator";

describe("chart-configurator", () => {
  it("should be defined", () => {
    expect(customElements.get("chart-configurator")).toBe(ChartConfigurator);
  });

  it("should dispatch chart-saved with config", async () => {
    const el = document.createElement("chart-configurator") as ChartConfigurator;
    el.transactions = [
      { id: "t1", date: "2024-01-01", amount: -50, originalDescription: "Test", tagIds: [] },
    ] satisfies Transaction[];
    document.body.appendChild(el);
    await el.updateComplete;

    const titleInput = el.shadowRoot!.querySelector('input[type="text"]') as HTMLInputElement;
    titleInput.value = "My Chart";
    titleInput.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("chart-saved", handler);

    const buttons = el.shadowRoot!.querySelectorAll("button");
    const saveBtn = Array.from(buttons).find((b) => b.textContent?.trim() === "Save to Dashboard")!;
    saveBtn.click();

    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.title).toBe("My Chart");
    expect(handler.mock.calls[0][0].detail.chartType).toBe("bar");
    expect(handler.mock.calls[0][0].detail.granularity).toBe("month");

    el.remove();
  });

  it("should save relative date expressions", async () => {
    const el = document.createElement("chart-configurator") as ChartConfigurator;
    document.body.appendChild(el);
    await el.updateComplete;

    const inputs = el.shadowRoot!.querySelectorAll('input[type="text"]');
    const titleInput = inputs[0] as HTMLInputElement;
    const startInput = inputs[1] as HTMLInputElement;

    titleInput.value = "Relative Chart";
    titleInput.dispatchEvent(new Event("input"));
    startInput.value = "3 months ago";
    startInput.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("chart-saved", handler);

    const saveBtn = Array.from(el.shadowRoot!.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Save to Dashboard",
    )!;
    saveBtn.click();

    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.startDate).toBe("3 months ago");

    el.remove();
  });

  it("should save direction and description filter", async () => {
    const el = document.createElement("chart-configurator") as ChartConfigurator;
    el.editingChart = {
      id: "c1",
      title: "Filtered",
      chartType: "bar",
      granularity: "month",
      position: 0,
      direction: "debit",
      descriptionFilter: "CC PAYMENT",
      descriptionFilterMode: "exclude",
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("chart-saved", handler);

    const saveBtn = Array.from(el.shadowRoot!.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Update Chart",
    )!;
    saveBtn.click();

    expect(handler).toHaveBeenCalledOnce();
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.direction).toBe("debit");
    expect(detail.descriptionFilter).toBe("CC PAYMENT");
    expect(detail.descriptionFilterMode).toBe("exclude");

    el.remove();
  });

  it("should not save without title", async () => {
    const el = document.createElement("chart-configurator") as ChartConfigurator;
    document.body.appendChild(el);
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("chart-saved", handler);

    const buttons = el.shadowRoot!.querySelectorAll("button");
    const saveBtn = Array.from(buttons).find((b) => b.textContent?.trim() === "Save to Dashboard")!;
    saveBtn.click();

    expect(handler).not.toHaveBeenCalled();

    el.remove();
  });
});
