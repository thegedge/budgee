import { render, cleanup, fireEvent } from "@testing-library/svelte";
import { settled } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as DbModule from "../../database/Db";
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

  it("deletes all databases and reloads on confirm", async () => {
    const deleteSpy = vi.spyOn(DbModule, "deleteAllDatabases").mockResolvedValue(undefined);
    const reloadSpy = vi.fn();
    Object.defineProperty(window, "location", {
      value: { ...window.location, reload: reloadSpy },
      writable: true,
    });

    const { getByText } = render(DatabaseErrorOverlay, {
      props: { error: "IDB error", isDatabaseError: true },
    });

    await fireEvent.click(getByText("Delete database and reload"));
    await settled();

    expect(deleteSpy).toHaveBeenCalled();
    expect(reloadSpy).toHaveBeenCalled();

    deleteSpy.mockRestore();
  });
});
