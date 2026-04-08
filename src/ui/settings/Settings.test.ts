import { render, cleanup, screen, fireEvent } from "@testing-library/svelte";
import { flushSync } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logout, getAuth } from "../../auth.svelte";
import Settings from "./Settings.svelte";

const mockUser = { login: "alice@example.com", name: "Alice Smith" };
const SERVER_URL = "https://sync.example.com";

beforeEach(() => {
  localStorage.clear();
  logout();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("Settings sync section", () => {
  it("shows not connected state when local", () => {
    render(Settings);
    flushSync();

    expect(screen.getByText(/Not connected/i)).toBeTruthy();
    const setupLink = screen.getByRole("link", { name: /set up backup/i });
    expect(setupLink.getAttribute("href")).toBe("/setup");
  });

  it("shows server URL and user when authenticated", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, token: "tok" }),
      }),
    );
    const { login } = await import("../../auth.svelte");
    await login(SERVER_URL, "alice@example.com", "pass");

    render(Settings);
    flushSync();

    expect(screen.getByText(SERVER_URL)).toBeTruthy();
    expect(screen.getByText(/Alice Smith/)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Disconnect" })).toBeTruthy();
  });

  it("disconnect button calls logout and reloads", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, token: "tok" }),
      }),
    );
    const { login } = await import("../../auth.svelte");
    await login(SERVER_URL, "alice@example.com", "pass");

    const reloadSpy = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadSpy },
      writable: true,
    });

    render(Settings);
    flushSync();

    fireEvent.click(screen.getByRole("button", { name: "Disconnect" }));
    flushSync();

    expect(getAuth().status).toBe("local");
    expect(reloadSpy).toHaveBeenCalled();
  });
});

describe("Settings appearance section", () => {
  it("renders theme selector", () => {
    render(Settings);
    expect(screen.getByLabelText("Theme")).toBeTruthy();
  });
});

describe("Settings import/export section", () => {
  it("renders export button", () => {
    render(Settings);
    expect(screen.getByRole("button", { name: "Export" })).toBeTruthy();
  });
});
