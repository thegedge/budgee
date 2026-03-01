import { Temporal } from "@js-temporal/polyfill";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import "./TimeRangePicker";
import { TimeRangePicker, type TimeRangeChangeEvent } from "./TimeRangePicker";

describe("time-range-picker", () => {
  let el: TimeRangePicker;

  beforeEach(async () => {
    el = document.createElement("time-range-picker") as TimeRangePicker;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it("should highlight All by default", () => {
    const buttons = el.shadowRoot!.querySelectorAll("button");
    const active = Array.from(buttons).filter((b) => b.classList.contains("active"));
    expect(active).toHaveLength(1);
    expect(active[0].textContent).toBe("All");
  });

  it("should highlight the clicked option", async () => {
    const buttons = el.shadowRoot!.querySelectorAll("button");
    const sixMonthBtn = Array.from(buttons).find((b) => b.textContent === "6M")!;

    sixMonthBtn.click();
    await el.updateComplete;

    const active = Array.from(el.shadowRoot!.querySelectorAll("button")).filter((b) =>
      b.classList.contains("active"),
    );
    expect(active).toHaveLength(1);
    expect(active[0].textContent).toBe("6M");
  });

  it("should dispatch time-range-change event with duration", async () => {
    const events: TimeRangeChangeEvent[] = [];
    el.addEventListener("time-range-change", (e) => events.push(e as TimeRangeChangeEvent));

    const buttons = el.shadowRoot!.querySelectorAll("button");
    const oneYearBtn = Array.from(buttons).find((b) => b.textContent === "1Y")!;
    oneYearBtn.click();

    expect(events).toHaveLength(1);
    expect(events[0].timeRange!.toString()).toBe(Temporal.Duration.from({ years: 1 }).toString());
  });

  it("should highlight correctly when value is set externally", async () => {
    el.value = Temporal.Duration.from({ months: 6 });
    await el.updateComplete;

    const active = Array.from(el.shadowRoot!.querySelectorAll("button")).filter((b) =>
      b.classList.contains("active"),
    );
    expect(active).toHaveLength(1);
    expect(active[0].textContent).toBe("6M");
  });
});
