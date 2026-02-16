import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../../database/db";
import "./tagManager";
import { TagManager } from "./tagManager";

describe("tag-manager", () => {
  beforeEach(async () => {
    await db.tags.clear();
  });

  it("should be defined", () => {
    expect(customElements.get("tag-manager")).toBe(TagManager);
  });

  it("should add a tag when the Add button is clicked", async () => {
    const el = document.createElement("tag-manager") as TagManager;
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Food";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const addBtn = el.shadowRoot!.querySelector("button")!;
    addBtn.click();
    await el.updateComplete;
    // Wait for async DB operation
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const tags = await db.tags.toArray();
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("Food");

    el.remove();
  });

  it("should show error for duplicate tag names", async () => {
    await db.tags.add({ name: "Food" });

    const el = document.createElement("tag-manager") as TagManager;
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Food";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const addBtn = el.shadowRoot!.querySelector("button")!;
    addBtn.click();
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const error = el.shadowRoot!.querySelector(".error");
    expect(error).toBeTruthy();
    expect(error!.textContent).toContain("already exists");

    el.remove();
  });

  it("should delete a tag when Remove is clicked", async () => {
    await db.tags.add({ name: "Food" });

    const el = document.createElement("tag-manager") as TagManager;
    document.body.appendChild(el);
    await el.updateComplete;
    // Wait for connectedCallback refresh
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const deleteBtn = el.shadowRoot!.querySelector(
      'button[aria-label="Remove tag"]',
    ) as HTMLButtonElement;
    expect(deleteBtn).toBeTruthy();
    deleteBtn.click();
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    const tags = await db.tags.toArray();
    expect(tags).toHaveLength(0);

    el.remove();
  });
});
