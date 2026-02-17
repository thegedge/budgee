import { describe, expect, it, vi } from "vitest";
import type { Tag } from "../../database/types";
import "./tagAutocomplete";
import { TagAutocomplete } from "./tagAutocomplete";

const tags: Tag[] = [
  { id: "t1", name: "Food" },
  { id: "t2", name: "Coffee" },
  { id: "t3", name: "Fuel" },
];

function createElement(overrides?: { excludeIds?: string[] }): TagAutocomplete {
  const el = document.createElement("tag-autocomplete") as TagAutocomplete;
  el.tags = tags;
  el.excludeIds = overrides?.excludeIds ?? [];
  return el;
}

describe("tag-autocomplete", () => {
  it("should be defined", () => {
    expect(customElements.get("tag-autocomplete")).toBe(TagAutocomplete);
  });

  it("should show suggestions matching input", async () => {
    const el = createElement();
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "fo";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const suggestions = el.shadowRoot!.querySelectorAll(".suggestion:not(.create)");
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].textContent?.trim()).toBe("Food");

    el.remove();
  });

  it("should exclude tags by excludeIds", async () => {
    const el = createElement({ excludeIds: ["t1"] });
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "fu";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const suggestions = el.shadowRoot!.querySelectorAll(".suggestion:not(.create)");
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].textContent?.trim()).toBe("Fuel");

    el.remove();
  });

  it("should show create option for new tag name", async () => {
    const el = createElement();
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Travel";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const create = el.shadowRoot!.querySelector(".suggestion.create");
    expect(create).toBeTruthy();
    expect(create!.textContent).toContain('Create "Travel"');

    el.remove();
  });

  it("should not show create option when input matches existing tag", async () => {
    const el = createElement();
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Food";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const create = el.shadowRoot!.querySelector(".suggestion.create");
    expect(create).toBeNull();

    el.remove();
  });

  it("should dispatch tag-selected on click", async () => {
    const el = createElement();
    document.body.appendChild(el);
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("tag-selected", handler);

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Cof";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const suggestion = el.shadowRoot!.querySelector(".suggestion:not(.create)") as HTMLElement;
    suggestion.click();

    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.tag.name).toBe("Coffee");

    el.remove();
  });

  it("should dispatch tag-created on create click", async () => {
    const el = createElement();
    document.body.appendChild(el);
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener("tag-created", handler);

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Travel";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const create = el.shadowRoot!.querySelector(".suggestion.create") as HTMLElement;
    create.click();

    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.name).toBe("Travel");

    el.remove();
  });

  it("should navigate suggestions with arrow keys", async () => {
    const el = createElement();
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "fu";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".highlighted")?.textContent?.trim()).toBe("Fuel");

    el.remove();
  });
});
