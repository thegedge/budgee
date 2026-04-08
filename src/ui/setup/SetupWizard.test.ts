import { render, cleanup, screen, fireEvent } from "@testing-library/svelte";
import { flushSync } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logout } from "../../auth.svelte";
import SetupWizard from "./SetupWizard.svelte";

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

function mockFetch(responses: Array<{ ok: boolean; status?: number; body?: unknown } | Error>) {
  let callIndex = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn().mockImplementation(() => {
      const response = responses[callIndex++];
      if (response instanceof Error) return Promise.reject(response);
      const { ok, status = ok ? 200 : 400, body = {} } = response;
      return Promise.resolve({
        ok,
        status,
        statusText: ok ? "OK" : "Bad Request",
        json: () => Promise.resolve(body),
      });
    }),
  );
}

describe("SetupWizard tabs", () => {
  it("shows Managed tab by default", () => {
    render(SetupWizard);
    const managedTab = screen.getByRole("tab", { name: "Managed" });
    expect(managedTab.getAttribute("aria-selected")).toBe("true");
  });

  it("switches to Custom server tab on click", () => {
    render(SetupWizard);
    const customTab = screen.getByRole("tab", { name: "Custom server" });
    fireEvent.click(customTab);
    flushSync();

    expect(customTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByLabelText("Server URL")).toBeTruthy();
  });

  it("shows Login/Register toggle on Managed tab", () => {
    render(SetupWizard);
    const loginButtons = screen.getAllByText("Login");
    const registerButtons = screen.getAllByText("Register");
    expect(loginButtons.length).toBeGreaterThan(0);
    expect(registerButtons.length).toBeGreaterThan(0);
  });
});

describe("SetupWizard managed login", () => {
  it("calls login and navigates on success", async () => {
    mockFetch([{ ok: true, body: { user: mockUser, token: "tok" } }]);

    render(SetupWizard);

    fireEvent.input(screen.getByLabelText("Email"), { target: { value: "alice@example.com" } });
    fireEvent.input(screen.getByLabelText("Password"), { target: { value: "pass" } });

    const form = screen.getByLabelText("Email").closest("form")!;
    fireEvent.submit(form);

    await screen.findByRole("link", { name: /go to dashboard/i });
  });

  it("shows error on login failure", async () => {
    mockFetch([{ ok: false, status: 401, body: {} }]);

    render(SetupWizard);

    fireEvent.input(screen.getByLabelText("Email"), { target: { value: "alice@example.com" } });
    fireEvent.input(screen.getByLabelText("Password"), { target: { value: "wrong" } });

    const form = screen.getByLabelText("Email").closest("form")!;
    fireEvent.submit(form);

    await screen.findByText(/Login failed/i);
  });
});

describe("SetupWizard managed register", () => {
  it("calls register when Register mode is selected", async () => {
    mockFetch([{ ok: true, body: { user: mockUser } }]);

    render(SetupWizard);

    fireEvent.click(screen.getAllByText("Register")[0]);
    flushSync();

    fireEvent.input(screen.getByLabelText("Email"), { target: { value: "alice@example.com" } });
    fireEvent.input(screen.getByLabelText("Password"), { target: { value: "pass" } });

    const form = screen.getByLabelText("Email").closest("form")!;
    fireEvent.submit(form);

    await screen.findByRole("link", { name: /go to dashboard/i });
  });
});

describe("SetupWizard custom server", () => {
  it("shows URL input on Custom server tab", () => {
    render(SetupWizard);

    fireEvent.click(screen.getByRole("tab", { name: "Custom server" }));
    flushSync();

    expect(screen.getByLabelText("Server URL")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Connect" })).toBeTruthy();
  });

  it("auto-authenticates when probe finds existing cookie session", async () => {
    mockFetch([
      { ok: true, body: { name: "MyGard" } },
      { ok: true, body: mockUser },
    ]);

    render(SetupWizard);

    fireEvent.click(screen.getByRole("tab", { name: "Custom server" }));
    flushSync();

    fireEvent.input(screen.getByLabelText("Server URL"), { target: { value: SERVER_URL } });

    const form = screen.getByLabelText("Server URL").closest("form")!;
    fireEvent.submit(form);

    await screen.findByRole("link", { name: /go to dashboard/i });
  });

  it("shows login form when probe succeeds but no cookie", async () => {
    mockFetch([
      { ok: true, body: { name: "MyGard" } },
      { ok: false, status: 401 },
    ]);

    render(SetupWizard);

    fireEvent.click(screen.getByRole("tab", { name: "Custom server" }));
    flushSync();

    fireEvent.input(screen.getByLabelText("Server URL"), { target: { value: SERVER_URL } });

    const form = screen.getByLabelText("Server URL").closest("form")!;
    fireEvent.submit(form);

    await screen.findByLabelText("Email");
  });

  it("shows error when probe fails", async () => {
    mockFetch([{ ok: false, status: 404 }]);

    render(SetupWizard);

    fireEvent.click(screen.getByRole("tab", { name: "Custom server" }));
    flushSync();

    fireEvent.input(screen.getByLabelText("Server URL"), { target: { value: SERVER_URL } });

    const form = screen.getByLabelText("Server URL").closest("form")!;
    fireEvent.submit(form);

    await screen.findByText(/Not a MyGard server/i);
  });
});

describe("SetupWizard already connected", () => {
  it("shows already-connected message when authenticated", async () => {
    const { login } = await import("../../auth.svelte");
    mockFetch([{ ok: true, body: { user: mockUser, token: "tok" } }]);
    await login(SERVER_URL, "alice@example.com", "pass");

    render(SetupWizard);
    flushSync();

    expect(screen.getByRole("link", { name: /go to dashboard/i })).toBeTruthy();
  });
});
