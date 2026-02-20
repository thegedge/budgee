import { describe, expect, it } from "vitest";
import "./ChartWrapper";
import { ChartWrapper } from "./ChartWrapper";

describe("chart-wrapper", () => {
  it("should be defined", () => {
    expect(customElements.get("chart-wrapper")).toBe(ChartWrapper);
  });

  it("should render a canvas element", async () => {
    const el = document.createElement("chart-wrapper") as ChartWrapper;
    el.chartType = "bar";
    el.data = {
      labels: ["Jan", "Feb"],
      datasets: [{ label: "Spend", data: [100, 200] }],
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const canvas = el.shadowRoot!.querySelector("canvas");
    expect(canvas).toBeTruthy();

    el.remove();
  });
});
