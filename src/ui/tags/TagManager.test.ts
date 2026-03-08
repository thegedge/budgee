import { describe, expect, it } from "vitest";
import { db } from "../../database/Db";
import { uuid } from "../../uuid";
import { waitFor } from "../testing";
import "./TagManager";
import { TagManager } from "./TagManager";

describe("tag-manager", () => {

  it("should be defined", () => {
    expect(customElements.get("tag-manager")).toBe(TagManager);
  });

  it("should add a tag when the Add button is clicked", async () => {
    const el = document.createElement("tag-manager") as TagManager;
    document.body.appendChild(el);

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector("input")).toBeTruthy();
    });

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Food";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const addBtn = el.shadowRoot!.querySelector("button")!;
    addBtn.click();

    await waitFor(async () => {
      const dbs = await db();
      const tags = await dbs.tags.all();
      expect(tags).toHaveLength(1);
      expect(tags[0].name).toBe("Food");
    });

    el.remove();
  });

  it("should show error for duplicate tag names", async () => {
    const dbs = await db();
    await dbs.tags.put({ id: uuid(), name: "Food" });

    const el = document.createElement("tag-manager") as TagManager;
    document.body.appendChild(el);

    await waitFor(() => {
      expect(el.shadowRoot!.querySelector("input")).toBeTruthy();
    });

    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Food";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const addBtn = el.shadowRoot!.querySelector("button")!;
    addBtn.click();

    await waitFor(() => {
      const error = el.shadowRoot!.querySelector(".error");
      expect(error).toBeTruthy();
      expect(error!.textContent).toContain("already exists");
    });

    el.remove();
  });

  it("should delete a tag when Remove is clicked", async () => {
    const dbs = await db();
    await dbs.tags.put({ id: uuid(), name: "Food" });

    const el = document.createElement("tag-manager") as TagManager;
    document.body.appendChild(el);

    await waitFor(() => {
      const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
      const deleteBtn = tableEl.shadowRoot!.querySelector(
        'button[aria-label="Remove tag"]',
      ) as HTMLButtonElement;
      expect(deleteBtn).toBeTruthy();
    });

    const tableEl = el.shadowRoot!.querySelector("paginated-table")!;
    const deleteBtn = tableEl.shadowRoot!.querySelector(
      'button[aria-label="Remove tag"]',
    ) as HTMLButtonElement;
    deleteBtn.click();

    await waitFor(async () => {
      const tags = await dbs.tags.all();
      expect(tags).toHaveLength(0);
    });

    el.remove();
  });
});
