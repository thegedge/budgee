import { render, cleanup, screen, fireEvent } from "@testing-library/svelte";
import { flushSync } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logout } from "../../auth.svelte";
import { db } from "../../database/Db";
import BackupNudge from "./BackupNudge.svelte";

const DISMISS_KEY = "budgee-backup-nudge-dismissed";

async function seedTransactions(count: number) {
  const dbs = await db();
  const docs = Array.from({ length: count }, (_, i) => ({
    id: `tx-${i}`,
    date: "2024-01-01",
    amount: -10,
    description: `Transaction ${i}`,
    tagIds: [] as string[],
  }));
  await dbs.transactions.bulkDocs(docs);
}

beforeEach(() => {
  localStorage.removeItem(DISMISS_KEY);
  logout();
});

afterEach(() => {
  cleanup();
  localStorage.removeItem(DISMISS_KEY);
  vi.restoreAllMocks();
});

describe("BackupNudge", () => {
  it("is hidden when auth status is authenticated", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({ user: { login: "alice@example.com", name: "Alice" }, token: "tok" }),
      }),
    );

    const { login } = await import("../../auth.svelte");
    await login("https://sync.example.com", "alice@example.com", "pass");
    await seedTransactions(100);

    render(BackupNudge);
    flushSync();

    expect(screen.queryByRole("status")).toBeNull();

    vi.unstubAllGlobals();
  });

  it("is hidden when transaction count is below threshold", async () => {
    await seedTransactions(50);

    render(BackupNudge);
    flushSync();

    expect(screen.queryByRole("status")).toBeNull();
  });

  it("is hidden when already dismissed", async () => {
    localStorage.setItem(DISMISS_KEY, "1");
    await seedTransactions(100);

    render(BackupNudge);
    flushSync();

    expect(screen.queryByRole("status")).toBeNull();
  });

  it("is visible when local, undismissed, and >= 100 transactions", async () => {
    await seedTransactions(100);

    render(BackupNudge);

    const nudge = await screen.findByRole("status");
    expect(nudge).toBeTruthy();
    expect(nudge.textContent).toContain("Set up backup");
  });

  it("dismiss button hides the nudge and sets localStorage", async () => {
    await seedTransactions(100);

    render(BackupNudge);
    await screen.findByRole("status");

    const dismissBtn = screen.getByLabelText("Dismiss");
    fireEvent.click(dismissBtn);
    flushSync();

    expect(screen.queryByRole("status")).toBeNull();
    expect(localStorage.getItem(DISMISS_KEY)).toBe("1");
  });

  it("setup link points to /setup", async () => {
    await seedTransactions(100);

    render(BackupNudge);
    await screen.findByRole("status");

    const link = screen.getByRole("link", { name: /set up backup/i });
    expect(link.getAttribute("href")).toBe("/setup");
  });
});
