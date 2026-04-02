const CACHE_KEY = "budgee-identity";

export type User = {
  login: string;
  name: string;
  profilePic?: string;
  did?: string;
};

export function getCachedIdentity(): User | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function cachedDid(): string | null {
  return getCachedIdentity()?.did ?? null;
}

export async function fetchIdentity(): Promise<User | null> {
  try {
    const headers: Record<string, string> = {};
    const token = localStorage.getItem("budgee-sync-token");
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const serverUrl = localStorage.getItem("budgee-sync-url");
    const base = serverUrl ?? "";

    const response = await fetch(`${base}/whoami`, { headers });
    if (response.ok) {
      const user = (await response.json()) as User;
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(user));
      } catch {
        // localStorage unavailable
      }
      return user;
    }
    // 401 or other non-ok status — fall back to cache
    return getCachedIdentity();
  } catch {
    // Network error — fall back to cache
    return getCachedIdentity();
  }
}
