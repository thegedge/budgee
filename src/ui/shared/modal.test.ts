import { afterEach, describe, expect, it, vi } from "vitest";
import { Modal } from "./modal";

function createModal(heading = "Test Modal"): Modal {
  const el = new Modal();
  el.heading = heading;
  document.body.appendChild(el);
  return el;
}

describe("Modal", () => {
  afterEach(() => {
    document.body.querySelectorAll("budgee-modal").forEach((el) => el.remove());
  });

  it("should be defined", () => {
    expect(customElements.get("budgee-modal")).toBeDefined();
  });

  it("renders heading", async () => {
    const el = createModal("My Heading");
    await el.updateComplete;

    const h3 = el.shadowRoot?.querySelector("h3");
    expect(h3?.textContent).toBe("My Heading");
  });

  it("renders a popover element", async () => {
    const el = createModal();
    await el.updateComplete;

    const popover = el.shadowRoot?.getElementById("popover");
    expect(popover).not.toBeNull();
    expect(popover?.getAttribute("popover")).toBe("auto");
  });

  it("renders a close button", async () => {
    const el = createModal();
    await el.updateComplete;

    const closeBtn = el.shadowRoot?.querySelector(".close");
    expect(closeBtn).not.toBeNull();
  });

  it("renders a slot for content", async () => {
    const el = createModal();
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector("slot");
    expect(slot).not.toBeNull();
  });

  it("dispatches modal-close when popover toggles to closed", async () => {
    const el = createModal();
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("modal-close", handler);

    const popover = el.shadowRoot!.getElementById("popover")!;
    popover.dispatchEvent(Object.assign(new Event("toggle"), { newState: "closed" }));

    expect(handler).toHaveBeenCalledOnce();
  });

  it("does not dispatch modal-close when popover toggles to open", async () => {
    const el = createModal();
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("modal-close", handler);

    const popover = el.shadowRoot!.getElementById("popover")!;
    popover.dispatchEvent(Object.assign(new Event("toggle"), { newState: "open" }));

    expect(handler).not.toHaveBeenCalled();
  });

  it("updates heading reactively", async () => {
    const el = createModal("First");
    await el.updateComplete;

    el.heading = "Second";
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h3")?.textContent).toBe("Second");
  });
});
