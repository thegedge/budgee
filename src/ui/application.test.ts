import { describe, expect, it } from "vitest";
import { Application } from "./application";

describe("BudgeeApp", () => {
  it("should be defined", () => {
    expect(customElements.get("budgee-app")).toBeDefined();
  });

  it("renders navigation links", async () => {
    const el = new Application();
    document.body.appendChild(el);
    await el.updateComplete;

    const appName = el.shadowRoot?.querySelector("nav .app-name");
    expect(appName?.textContent).toContain("Budgee");
    expect(appName?.tagName).toBe("DIV");

    const links = el.shadowRoot?.querySelectorAll("nav a");
    expect(links?.length).toBeGreaterThanOrEqual(6);
    expect(links?.[0].textContent).toContain("Dashboard");
    expect(links?.[1].textContent).toContain("Transactions");

    el.remove();
  });
});
