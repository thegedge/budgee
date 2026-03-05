import { afterEach, describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  afterEach(() => {
    document.body.querySelectorAll("budgee-empty-state").forEach((el) => el.remove());
  });

  it("should be defined", () => {
    expect(customElements.get("budgee-empty-state")).toBeDefined();
  });

  it("renders heading and description", async () => {
    const el = new EmptyState();
    el.heading = "No items";
    el.description = "Nothing here yet.";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("h3")!.textContent).toBe("No items");
    expect(el.shadowRoot!.querySelector("p")!.textContent).toBe("Nothing here yet.");
  });

  it("renders a slot for CTA", async () => {
    const el = new EmptyState();
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();
  });

  it("renders icon when provided", async () => {
    const el = new EmptyState();
    el.icon = '<svg class="lucide"><circle cx="10" cy="10" r="5"/></svg>';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector(".icon svg")).not.toBeNull();
  });

  it("does not render icon div when no icon", async () => {
    const el = new EmptyState();
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector(".icon")).toBeNull();
  });
});
