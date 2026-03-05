import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ToastManager } from "./ToastManager";
import { showToast } from "./toast";

describe("ToastManager", () => {
  let el: ToastManager;

  beforeEach(async () => {
    vi.useFakeTimers();
    el = new ToastManager();
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
    vi.useRealTimers();
  });

  it("should be defined", () => {
    expect(customElements.get("budgee-toast-manager")).toBeDefined();
  });

  it("renders a toast when event is dispatched", async () => {
    vi.useRealTimers();
    showToast({ message: "Hello", type: "success" });
    await el.updateComplete;

    const toast = el.shadowRoot!.querySelector(".toast");
    expect(toast).not.toBeNull();
    expect(toast!.querySelector(".message")!.textContent).toBe("Hello");
    expect(toast!.classList.contains("success")).toBe(true);
  });

  it("defaults to info type", async () => {
    vi.useRealTimers();
    showToast({ message: "Info toast" });
    await el.updateComplete;

    const toast = el.shadowRoot!.querySelector(".toast");
    expect(toast!.classList.contains("info")).toBe(true);
  });

  it("auto-dismisses after duration", async () => {
    showToast({ message: "Bye", duration: 1000 });
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector(".toast")).not.toBeNull();

    vi.advanceTimersByTime(1000);
    await el.updateComplete;

    // Should be in dismissing state
    const toast = el.shadowRoot!.querySelector(".toast");
    expect(toast?.classList.contains("dismissing")).toBe(true);

    // After animation completes
    vi.advanceTimersByTime(200);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".toast")).toBeNull();
  });

  it("has aria-live region", async () => {
    const region = el.shadowRoot!.querySelector('[aria-live="polite"]');
    expect(region).not.toBeNull();
  });

  it("renders dismiss button", async () => {
    vi.useRealTimers();
    showToast({ message: "Dismissable" });
    await el.updateComplete;

    const closeBtn = el.shadowRoot!.querySelector(".close");
    expect(closeBtn).not.toBeNull();
    expect(closeBtn!.getAttribute("aria-label")).toBe("Dismiss");
  });
});
