import { afterEach, describe, expect, it } from "vitest";
import { SkeletonLoader } from "./SkeletonLoader";

describe("SkeletonLoader", () => {
  afterEach(() => {
    document.body.querySelectorAll("budgee-skeleton").forEach((el) => el.remove());
  });

  it("should be defined", () => {
    expect(customElements.get("budgee-skeleton")).toBeDefined();
  });

  it("renders table rows by default", async () => {
    const el = new SkeletonLoader();
    el.rows = 3;
    document.body.appendChild(el);
    await el.updateComplete;

    const rows = el.shadowRoot!.querySelectorAll(".table-row");
    expect(rows.length).toBe(3);
  });

  it("renders card variant", async () => {
    const el = new SkeletonLoader();
    el.variant = "card";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector(".card")).not.toBeNull();
  });

  it("renders text variant", async () => {
    const el = new SkeletonLoader();
    el.variant = "text";
    el.rows = 4;
    document.body.appendChild(el);
    await el.updateComplete;

    const lines = el.shadowRoot!.querySelectorAll(".text .skeleton-line");
    expect(lines.length).toBe(4);
  });

  it("has aria-live and aria-label", async () => {
    const el = new SkeletonLoader();
    document.body.appendChild(el);
    await el.updateComplete;

    const region = el.shadowRoot!.querySelector('[aria-live="polite"]');
    expect(region).not.toBeNull();
    expect(region!.getAttribute("aria-label")).toBe("Loading");
  });
});
