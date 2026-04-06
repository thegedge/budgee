import { render, cleanup, fireEvent } from "@testing-library/svelte";
import { settled } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DatabaseErrorOverlay from "./DatabaseErrorOverlay.svelte";

vi.mock("./confirmDialog", () => ({
  showConfirmDialog: vi.fn().mockResolvedValue(true),
}));

describe("DatabaseErrorOverlay", () => {
  afterEach(cleanup);

  it("shows only Reload when isDatabaseError is false", () => {
    const { getByText, queryByText } = render(DatabaseErrorOverlay, {
      props: { error: "Something broke", isDatabaseError: false },
    });

    expect(getByText("Reload")).toBeTruthy();
    expect(queryByText("Delete database and reload")).toBeNull();
  });

  it("shows Delete button when isDatabaseError is true", () => {
    const { getByText, queryByText } = render(DatabaseErrorOverlay, {
      props: { error: "IDB error", isDatabaseError: true },
    });

    expect(getByText("Delete database and reload")).toBeTruthy();
    expect(queryByText("Reload")).toBeNull();
  });

  describe("delete and reload", () => {
    let mockDeleteDatabase: ReturnType<typeof vi.fn>;
    let reloadSpy: ReturnType<typeof vi.fn>;
    let capturedReq: { onblocked?: () => void; onsuccess?: () => void };

    beforeEach(() => {
      capturedReq = {};
      mockDeleteDatabase = vi.fn(() => capturedReq);
      vi.stubGlobal("indexedDB", {
        databases: vi.fn().mockResolvedValue([{ name: "budgee_test" }]),
        deleteDatabase: mockDeleteDatabase,
      });
      reloadSpy = vi.fn();
      Object.defineProperty(window, "location", {
        value: { ...window.location, reload: reloadSpy },
        writable: true,
      });
    });

    it("calls deleteDatabase and reloads on success", async () => {
      const { getByText } = render(DatabaseErrorOverlay, {
        props: { error: "IDB error", isDatabaseError: true },
      });

      await fireEvent.click(getByText("Delete database and reload"));
      await settled();

      expect(mockDeleteDatabase).toHaveBeenCalledWith("budgee_test");

      capturedReq.onsuccess?.();
      expect(reloadSpy).toHaveBeenCalled();
    });

    it("reloads when deleteDatabase is blocked by open connections", async () => {
      const { getByText } = render(DatabaseErrorOverlay, {
        props: { error: "IDB error", isDatabaseError: true },
      });

      await fireEvent.click(getByText("Delete database and reload"));
      await settled();

      capturedReq.onblocked?.();
      expect(reloadSpy).toHaveBeenCalled();
    });
  });
});
