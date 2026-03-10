import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Application } from "./Application";

describe("BudgeeApp", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404, json: () => Promise.resolve({}) }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    const el = document.body.querySelector("budgee-app");
    if (el) el.remove();
  });

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

  it("sets identity when /whoami returns a user", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ login: "alice", name: "Alice" }),
      }),
    );

    const el = new Application();
    document.body.appendChild(el);
    await el.updateComplete;

    await vi.waitFor(() => {
      expect(el.identity).toEqual({ login: "alice", name: "Alice" });
    });

    el.remove();
  });
});
