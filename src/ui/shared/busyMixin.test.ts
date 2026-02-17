import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { afterEach, describe, expect, it } from "vitest";
import { BusyMixin, busyStyles } from "./busyMixin";

@customElement("busy-test-element")
class BusyTestElement extends BusyMixin(LitElement) {
  static styles = [busyStyles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

describe("BusyMixin", () => {
  let el: BusyTestElement;

  afterEach(() => {
    el?.remove();
  });

  async function createElement(): Promise<BusyTestElement> {
    el = new BusyTestElement();
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it("should not be busy initially", async () => {
    await createElement();
    expect(el.busy).toBe(false);
    expect(el.hasAttribute("busy")).toBe(false);
  });

  it("should set busy during withBusy execution", async () => {
    await createElement();

    let busyDuringExecution = false;
    let hasAttributeDuringExecution = false;

    await el.withBusy(async () => {
      busyDuringExecution = el.busy;
      hasAttributeDuringExecution = el.hasAttribute("busy");
    });

    expect(busyDuringExecution).toBe(true);
    expect(hasAttributeDuringExecution).toBe(true);
    expect(el.busy).toBe(false);
    expect(el.hasAttribute("busy")).toBe(false);
  });

  it("should clear busy after an error", async () => {
    await createElement();

    await expect(
      el.withBusy(async () => {
        throw new Error("test error");
      }),
    ).rejects.toThrow("test error");

    expect(el.busy).toBe(false);
    expect(el.hasAttribute("busy")).toBe(false);
  });

  it("should return the value from the callback", async () => {
    await createElement();
    const result = await el.withBusy(async () => 42);
    expect(result).toBe(42);
  });
});
