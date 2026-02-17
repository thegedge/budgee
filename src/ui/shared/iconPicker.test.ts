import { afterEach, describe, expect, it, vi } from "vitest";
import { ICON_MAP, IconPicker } from "./iconPicker";

function createPicker(value = ""): IconPicker {
  const el = new IconPicker();
  el.value = value;
  document.body.appendChild(el);
  return el;
}

describe("IconPicker", () => {
  afterEach(() => {
    document.body.querySelectorAll("icon-picker").forEach((el) => el.remove());
  });

  it("should be defined", () => {
    expect(customElements.get("icon-picker")).toBeDefined();
  });

  it("renders a trigger button", async () => {
    const el = createPicker();
    await el.updateComplete;

    const trigger = el.shadowRoot?.querySelector(".trigger");
    expect(trigger).toBeDefined();
    expect(trigger?.classList.contains("placeholder")).toBe(true);
  });

  it("shows icon in trigger when value is set", async () => {
    const el = createPicker("apple");
    await el.updateComplete;

    const trigger = el.shadowRoot?.querySelector(".trigger");
    expect(trigger?.classList.contains("placeholder")).toBe(false);
    expect(trigger?.querySelector("svg")).toBeDefined();
  });

  it("does not show popup initially", async () => {
    const el = createPicker();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".popup")).toBeNull();
  });

  it("opens popup on trigger click", async () => {
    const el = createPicker();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".popup")).not.toBeNull();
  });

  it("renders all icons in the grid", async () => {
    const el = createPicker();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    const options = el.shadowRoot?.querySelectorAll(".icon-option");
    expect(options?.length).toBe(Object.keys(ICON_MAP).length);
  });

  it("filters icons by search", async () => {
    const el = createPicker();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector<HTMLInputElement>(".search")!;
    input.value = "apple";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const options = el.shadowRoot?.querySelectorAll(".icon-option");
    expect(options?.length).toBe(1);
  });

  it("dispatches icon-selected on icon click", async () => {
    const el = createPicker();
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("icon-selected", handler);

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    const firstOption = el.shadowRoot!.querySelector<HTMLButtonElement>(".icon-option")!;
    firstOption.click();
    await el.updateComplete;

    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.icon).toBeTruthy();
  });

  it("closes popup after selecting an icon", async () => {
    const el = createPicker();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".icon-option")?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".popup")).toBeNull();
  });

  it("marks current value as selected", async () => {
    const el = createPicker("apple");
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    const selected = el.shadowRoot?.querySelector(".icon-option.selected");
    expect(selected?.getAttribute("title")).toBe("apple");
  });

  it("shows clear button when value is set", async () => {
    const el = createPicker("apple");
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".clear-btn")).not.toBeNull();
  });

  it("does not show clear button when no value", async () => {
    const el = createPicker();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".clear-btn")).toBeNull();
  });

  it("dispatches icon-selected with empty string on clear", async () => {
    const el = createPicker("apple");
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("icon-selected", handler);

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".clear-btn")?.click();
    await el.updateComplete;

    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.icon).toBe("");
  });

  it("closes popup when clicking outside", async () => {
    const el = createPicker();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".popup")).not.toBeNull();

    document.body.click();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".popup")).toBeNull();
  });

  it("resets search when popup closes", async () => {
    const el = createPicker();
    await el.updateComplete;

    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector<HTMLInputElement>(".search")!;
    input.value = "test";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    document.body.click();
    await el.updateComplete;

    // Reopen and verify search is cleared
    el.shadowRoot?.querySelector<HTMLButtonElement>(".trigger")?.click();
    await el.updateComplete;

    const newInput = el.shadowRoot!.querySelector<HTMLInputElement>(".search")!;
    expect(newInput.value).toBe("");
  });
});
