const CACHE_KEY = "budgee-identity";

export type User = {
  login: string;
  name: string;
  profilePic?: string;
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

export async function fetchIdentity(): Promise<User | null> {
  try {
    const response = await fetch("/whoami");
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
