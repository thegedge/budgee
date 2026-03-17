import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { backupDates, createSnapshot, restoreBackup } from "./backup";

const { mockMeta } = vi.hoisted(() => ({
  mockMeta: { put: vi.fn().mockResolvedValue(undefined) },
}));
vi.mock("./Db", () => ({
  db: vi.fn().mockResolvedValue({ meta: mockMeta }),
  clearAllCollections: vi.fn().mockResolvedValue(undefined),
}));

describe("backupDates", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ dates: ["2025-03-01", "2025-02-28"] }),
      }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls the correct endpoint", async () => {
    await backupDates("http://localhost:3000");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/databases/backup-dates");
  });

  it("returns parsed dates", async () => {
    const dates = await backupDates("http://localhost:3000");
    expect(dates).toEqual(["2025-03-01", "2025-02-28"]);
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      }),
    );
    await expect(backupDates("http://localhost:3000")).rejects.toThrow(
      "Failed to fetch backup dates",
    );
  });
});

describe("createSnapshot", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ status: "created", created: ["topic-a", "topic-b"] }),
      }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("POSTs to the correct endpoint", async () => {
    await createSnapshot("http://localhost:3000");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/databases/snapshot", {
      method: "POST",
    });
  });

  it("returns created topics", async () => {
    const created = await createSnapshot("http://localhost:3000");
    expect(created).toEqual(["topic-a", "topic-b"]);
  });
});

describe("restoreBackup", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            generation: 5,
            restored: ["topic-a"],
            skipped: [],
            errors: {},
          }),
      }),
    );
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("POSTs to restore-all with the date", async () => {
    await restoreBackup("http://localhost:3000", "2025-03-01");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/databases/restore-all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: "2025-03-01" }),
    });
  });

  it("stores generation in localStorage", async () => {
    await restoreBackup("http://localhost:3000", "2025-03-01");
    expect(localStorage.getItem("budgee-sync-generation:http://localhost:3000")).toBe("5");
  });

  it("calls clearAllCollections", async () => {
    const { clearAllCollections } = await import("./Db");
    await restoreBackup("http://localhost:3000", "2025-03-01");
    expect(clearAllCollections).toHaveBeenCalled();
  });

  it("sets schema_version after clearing collections", async () => {
    await restoreBackup("http://localhost:3000", "2025-03-01");
    expect(mockMeta.put).toHaveBeenCalledWith({ id: "schema_version", value: 1 });
  });

  it("returns the restore result", async () => {
    const result = await restoreBackup("http://localhost:3000", "2025-03-01");
    expect(result).toEqual({
      generation: 5,
      restored: ["topic-a"],
      skipped: [],
      errors: {},
    });
  });
});
