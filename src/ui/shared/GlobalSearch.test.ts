import { afterEach, describe, expect, it } from "vitest";
import { GlobalSearch } from "./GlobalSearch";

describe("GlobalSearch", () => {
  afterEach(() => {
    document.body.querySelectorAll("budgee-global-search").forEach((el) => el.remove());
  });

  it("should be defined", () => {
    expect(customElements.get("budgee-global-search")).toBeDefined();
  });

  it("renders nothing when closed", async () => {
    const el = new GlobalSearch();
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.children.length).toBe(0);
  });

  it("opens on Cmd+K", async () => {
    const el = new GlobalSearch();
    document.body.appendChild(el);
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input");
    expect(input).not.toBeNull();
  });

  it("opens on Ctrl+K", async () => {
    const el = new GlobalSearch();
    document.body.appendChild(el);
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("input")).not.toBeNull();
  });

  it("has aria attributes on dialog", async () => {
    const el = new GlobalSearch();
    document.body.appendChild(el);
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    await el.updateComplete;

    const panel = el.shadowRoot!.querySelector('[role="dialog"]');
    expect(panel).not.toBeNull();
    expect(panel!.getAttribute("aria-modal")).toBe("true");
  });

  it("shows empty message when query has no results", async () => {
    const el = new GlobalSearch();
    document.body.appendChild(el);
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    await el.updateComplete;

    // Set query directly and trigger search
    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "xyznonexistent";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    // Wait for debounce
    await new Promise((r) => setTimeout(r, 200));
    await el.updateComplete;

    const empty = el.shadowRoot!.querySelector(".empty");
    expect(empty).not.toBeNull();
  });
});
