import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  checkCookieAuth,
  getAuth,
  initAuth,
  login,
  logout,
  probeServer,
  register,
} from "./auth.svelte";

const mockUser = { login: "alice@example.com", name: "Alice Smith" };
const SERVER_URL = "https://sync.example.com";

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

beforeEach(() => {
  localStorage.clear();
  // Reset auth state to local before each test
  logout();
});

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("probeServer", () => {
  it("returns serverInfo and null user when not authenticated", async () => {
    mockFetch([
      { ok: true, body: { name: "MyGard", version: "1.0" } },
      { ok: false, status: 401 },
    ]);

    const result = await probeServer(SERVER_URL);

    expect(result.serverInfo).toEqual({ name: "MyGard", version: "1.0" });
    expect(result.user).toBeNull();
  });

  it("returns serverInfo and user when session cookie is active", async () => {
    mockFetch([
      { ok: true, body: { name: "MyGard" } },
      { ok: true, body: mockUser },
    ]);

    const result = await probeServer(SERVER_URL);

    expect(result.serverInfo).toEqual({ name: "MyGard" });
    expect(result.user).toEqual(mockUser);
  });

  it("throws when server is not a MyGard server", async () => {
    mockFetch([{ ok: false, status: 404 }]);

    await expect(probeServer(SERVER_URL)).rejects.toThrow("Not a MyGard server");
  });

  it("strips trailing slash from URL", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ name: "MyGard" }),
    });
    vi.stubGlobal("fetch", fetchSpy);

    // Second call (whoami) also needs to succeed
    fetchSpy
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ name: "MyGard" }) })
      .mockResolvedValueOnce({ ok: false, status: 401 });

    await probeServer(`${SERVER_URL}/`);

    expect(fetchSpy.mock.calls[0][0]).toBe(`${SERVER_URL}/.well-known/mygard-server`);
  });
});

describe("login", () => {
  it("updates auth state to authenticated on success", async () => {
    mockFetch([{ ok: true, body: { user: mockUser, token: "tok123" } }]);

    const user = await login(SERVER_URL, "alice@example.com", "pass");

    expect(user).toEqual(mockUser);
    const state = getAuth();
    expect(state.status).toBe("authenticated");
    if (state.status === "authenticated") {
      expect(state.user).toEqual(mockUser);
      expect(state.serverUrl).toBe(SERVER_URL);
      expect(state.token).toBe("tok123");
    }
  });

  it("stores serverUrl and token in localStorage", async () => {
    mockFetch([{ ok: true, body: { user: mockUser, token: "tok123" } }]);

    await login(SERVER_URL, "alice@example.com", "pass");

    expect(localStorage.getItem("budgee-sync-url")).toBe(SERVER_URL);
    expect(localStorage.getItem("budgee-sync-token")).toBe("tok123");
  });

  it("throws on non-ok response", async () => {
    mockFetch([{ ok: false, status: 401 }]);

    await expect(login(SERVER_URL, "alice@example.com", "wrong")).rejects.toThrow("Login failed");
  });

  it("handles response without token", async () => {
    mockFetch([{ ok: true, body: { user: mockUser } }]);

    await login(SERVER_URL, "alice@example.com", "pass");

    expect(localStorage.getItem("budgee-sync-token")).toBeNull();
    const state = getAuth();
    if (state.status === "authenticated") {
      expect(state.token).toBeUndefined();
    }
  });
});

describe("register", () => {
  it("updates auth state to authenticated on success", async () => {
    mockFetch([{ ok: true, body: { user: mockUser, token: "newtok" } }]);

    const user = await register(SERVER_URL, "alice@example.com", "pass");

    expect(user).toEqual(mockUser);
    const state = getAuth();
    expect(state.status).toBe("authenticated");
  });

  it("stores serverUrl in localStorage", async () => {
    mockFetch([{ ok: true, body: { user: mockUser } }]);

    await register(SERVER_URL, "alice@example.com", "pass");

    expect(localStorage.getItem("budgee-sync-url")).toBe(SERVER_URL);
  });

  it("throws on non-ok response", async () => {
    mockFetch([{ ok: false, status: 409 }]);

    await expect(register(SERVER_URL, "alice@example.com", "pass")).rejects.toThrow(
      "Registration failed",
    );
  });
});

describe("checkCookieAuth", () => {
  it("returns user when session is valid", async () => {
    mockFetch([{ ok: true, body: mockUser }]);

    const user = await checkCookieAuth(SERVER_URL);

    expect(user).toEqual(mockUser);
  });

  it("returns null on 401", async () => {
    mockFetch([{ ok: false, status: 401 }]);

    expect(await checkCookieAuth(SERVER_URL)).toBeNull();
  });

  it("returns null on network error", async () => {
    mockFetch([new TypeError("Network error")]);

    expect(await checkCookieAuth(SERVER_URL)).toBeNull();
  });
});

describe("logout", () => {
  it("resets auth state to local", async () => {
    mockFetch([{ ok: true, body: { user: mockUser, token: "tok" } }]);
    await login(SERVER_URL, "alice@example.com", "pass");

    logout();

    expect(getAuth().status).toBe("local");
  });

  it("clears localStorage keys", async () => {
    localStorage.setItem("budgee-sync-url", SERVER_URL);
    localStorage.setItem("budgee-sync-token", "tok");

    logout();

    expect(localStorage.getItem("budgee-sync-url")).toBeNull();
    expect(localStorage.getItem("budgee-sync-token")).toBeNull();
  });
});

describe("initAuth", () => {
  it("does nothing when no server URL is stored", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    await initAuth();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(getAuth().status).toBe("local");
  });

  it("authenticates via token when token is stored", async () => {
    localStorage.setItem("budgee-sync-url", SERVER_URL);
    localStorage.setItem("budgee-sync-token", "stored-tok");
    mockFetch([{ ok: true, body: mockUser }]);

    await initAuth();

    const state = getAuth();
    expect(state.status).toBe("authenticated");
    if (state.status === "authenticated") {
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe("stored-tok");
    }
  });

  it("falls back to cookie auth when token check fails", async () => {
    localStorage.setItem("budgee-sync-url", SERVER_URL);
    localStorage.setItem("budgee-sync-token", "expired-tok");
    mockFetch([
      { ok: false, status: 401 }, // token whoami fails
      { ok: true, body: mockUser }, // cookie whoami succeeds
    ]);

    await initAuth();

    expect(getAuth().status).toBe("authenticated");
  });

  it("tries cookie auth when no token is stored", async () => {
    localStorage.setItem("budgee-sync-url", SERVER_URL);
    mockFetch([{ ok: true, body: mockUser }]);

    await initAuth();

    expect(getAuth().status).toBe("authenticated");
  });

  it("stays local when both token and cookie auth fail", async () => {
    localStorage.setItem("budgee-sync-url", SERVER_URL);
    localStorage.setItem("budgee-sync-token", "bad-tok");
    mockFetch([
      { ok: false, status: 401 },
      { ok: false, status: 401 },
    ]);

    await initAuth();

    expect(getAuth().status).toBe("local");
  });
});
