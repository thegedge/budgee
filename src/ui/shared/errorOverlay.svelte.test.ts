import { describe, expect, it, beforeEach } from "vitest";
import { flushSync } from "svelte";
import { showErrorOverlay } from "./errorOverlay.svelte";

describe("showErrorOverlay", () => {
  beforeEach(() => {
    // Clear any previously mounted overlays
    document.body.innerHTML = "";
  });

  it("upgrades to database error when IDB error arrives after generic error", () => {
    showErrorOverlay("Something went wrong");
    flushSync();

    expect(document.body.textContent).toContain("Reload");
    expect(document.body.textContent).not.toContain("Delete database and reload");

    showErrorOverlay("IDB transaction failed", { isDatabaseError: true });
    flushSync();

    expect(document.body.textContent).toContain("Delete database and reload");
    expect(document.body.textContent).not.toContain("Reload");
  });
});
