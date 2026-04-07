import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchIdentity, getCachedIdentity } from "./identity";

const CACHE_KEY = "budgee-identity";

const mockUser = { login: "alice", name: "Alice Smith", profilePic: "https://example.com/pic.jpg" };

function mockFetchOk(user = mockUser) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(user),
    }),
  );
}

function mockFetchStatus(status: number) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: false,
      status,
      json: () => Promise.resolve({}),
    }),
  );
}

function mockFetchError() {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("fetchIdentity", () => {
  describe("without server URL", () => {
    it("returns cached identity without fetching", async () => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(mockUser));
      const fetchSpy = vi.fn();
      vi.stubGlobal("fetch", fetchSpy);

      const user = await fetchIdentity();

      expect(user).toEqual(mockUser);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("returns null without fetching when no cache", async () => {
      const fetchSpy = vi.fn();
      vi.stubGlobal("fetch", fetchSpy);

      const user = await fetchIdentity();

      expect(user).toBeNull();
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  describe("with server URL", () => {
    beforeEach(() => {
      localStorage.setItem("budgee-sync-url", "http://localhost:9999");
    });

    it("returns user and caches on successful response", async () => {
      mockFetchOk();

      const user = await fetchIdentity();

      expect(user).toEqual(mockUser);
      expect(JSON.parse(localStorage.getItem(CACHE_KEY)!)).toEqual(mockUser);
    });

    it("calls /whoami on the configured server URL", async () => {
      localStorage.setItem("budgee-sync-url", "http://myserver:8080");
      const fetchSpy = vi
        .fn()
        .mockResolvedValue({ ok: true, json: () => Promise.resolve(mockUser) });
      vi.stubGlobal("fetch", fetchSpy);

      await fetchIdentity();

      expect(fetchSpy).toHaveBeenCalledWith("http://myserver:8080/whoami", { headers: {} });
    });

    it("returns cached identity on 401 response", async () => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(mockUser));
      mockFetchStatus(401);

      const user = await fetchIdentity();

      expect(user).toEqual(mockUser);
    });

    it("returns null on 401 when no cache exists", async () => {
      mockFetchStatus(401);

      const user = await fetchIdentity();

      expect(user).toBeNull();
    });

    it("returns cached identity on network error", async () => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(mockUser));
      mockFetchError();

      const user = await fetchIdentity();

      expect(user).toEqual(mockUser);
    });

    it("returns null on network error when no cache exists", async () => {
      mockFetchError();

      const user = await fetchIdentity();

      expect(user).toBeNull();
    });
  });
});

describe("getCachedIdentity", () => {
  it("returns null when cache is empty", () => {
    expect(getCachedIdentity()).toBeNull();
  });

  it("returns cached user when present", () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(mockUser));
    expect(getCachedIdentity()).toEqual(mockUser);
  });

  it("returns null when cache contains invalid JSON", () => {
    localStorage.setItem(CACHE_KEY, "not-json");
    expect(getCachedIdentity()).toBeNull();
  });
});
