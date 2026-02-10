import { describe, expect, it } from "vitest";
import { BudgeeApp } from "./budgee-app";

describe("BudgeeApp", () => {
  it("should be defined", () => {
    expect(customElements.get("budgee-app")).toBeDefined();
  });

  it("renders with default title", async () => {
    const el = new BudgeeApp();
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("h1")?.textContent).toContain("Hello, Budgee!");
  });
});
