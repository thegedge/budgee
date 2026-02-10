import { describe, expect, it } from "vitest";
import { Application } from "./application";

describe("BudgeeApp", () => {
  it("should be defined", () => {
    expect(customElements.get("budgee-app")).toBeDefined();
  });

  it("renders with default title", async () => {
    const el = new Application();
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h1")?.textContent).toContain("Budgee");
  });
});
