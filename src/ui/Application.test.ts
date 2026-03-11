import { describe, expect, it } from "vitest";
import { Application } from "./Application";

describe("BudgeeApp", () => {
  it("should be defined", () => {
    expect(customElements.get("budgee-app")).toBeDefined();
  });

  it("renders navigation links", async () => {
    const el = new Application();
    document.body.appendChild(el);
    await el.updateComplete;

    const appName = el.shadowRoot?.querySelector(".app-name");
    expect(appName?.textContent).toContain("Budgee");

    const links = el.shadowRoot?.querySelectorAll("nav a");
    expect(links?.length).toBeGreaterThanOrEqual(6);
    expect(links?.[0].textContent).toContain("Dashboard");

    el.remove();
  });
});
