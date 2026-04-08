import type { User } from "./identity";

export type { User };

export type AuthState =
  | { status: "local" }
  | { status: "authenticated"; serverUrl: string; user: User; token?: string };

export interface ServerInfo {
  name: string;
  version?: string;
}

export interface ProbeResult {
  serverInfo: ServerInfo;
  user: User | null;
}

const SYNC_URL_KEY = "budgee-sync-url";
const SYNC_TOKEN_KEY = "budgee-sync-token";

let current = $state<AuthState>({ status: "local" });

export function getAuth(): AuthState {
  return current;
}

function setAuth(state: AuthState): void {
  current = state;
}

/**
 * Fetch `/.well-known/mygard-server` to confirm the server is a MyGard instance,
 * then attempt `/whoami` with cookie credentials for existing session.
 */
export async function probeServer(url: string): Promise<ProbeResult> {
  const base = url.replace(/\/$/, "");

  const wellKnownRes = await fetch(`${base}/.well-known/mygard-server`);
  if (!wellKnownRes.ok) {
    throw new Error(`Not a MyGard server: ${wellKnownRes.status} ${wellKnownRes.statusText}`);
  }
  const serverInfo = (await wellKnownRes.json()) as ServerInfo;

  let user: User | null = null;
  try {
    const whoamiRes = await fetch(`${base}/whoami`, { credentials: "include" });
    if (whoamiRes.ok) {
      user = (await whoamiRes.json()) as User;
    }
  } catch {
    // No existing session — not an error
  }

  return { serverInfo, user };
}

/**
 * POST `/auth/login` with cookie credentials. Updates auth state on success.
 */
export async function login(serverUrl: string, email: string, password: string): Promise<User> {
  const base = serverUrl.replace(/\/$/, "");
  const res = await fetch(`${base}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error(`Login failed: ${res.status} ${res.statusText}`);
  }
  const body = (await res.json()) as { user: User; token?: string };
  const user = body.user;
  const token = body.token;

  if (token) {
    try {
      localStorage.setItem(SYNC_TOKEN_KEY, token);
    } catch {
      // localStorage unavailable
    }
  }
  try {
    localStorage.setItem(SYNC_URL_KEY, serverUrl);
  } catch {
    // localStorage unavailable
  }

  setAuth({ status: "authenticated", serverUrl, user, token });
  return user;
}

/**
 * POST `/auth/register` with cookie credentials. Updates auth state on success.
 */
export async function register(serverUrl: string, email: string, password: string): Promise<User> {
  const base = serverUrl.replace(/\/$/, "");
  const res = await fetch(`${base}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error(`Registration failed: ${res.status} ${res.statusText}`);
  }
  const body = (await res.json()) as { user: User; token?: string };
  const user = body.user;
  const token = body.token;

  if (token) {
    try {
      localStorage.setItem(SYNC_TOKEN_KEY, token);
    } catch {
      // localStorage unavailable
    }
  }
  try {
    localStorage.setItem(SYNC_URL_KEY, serverUrl);
  } catch {
    // localStorage unavailable
  }

  setAuth({ status: "authenticated", serverUrl, user, token });
  return user;
}

/**
 * GET `/whoami` with cookie credentials. Returns the user if authenticated,
 * null otherwise. Does not throw on non-2xx responses.
 */
export async function checkCookieAuth(serverUrl: string): Promise<User | null> {
  const base = serverUrl.replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/whoami`, { credentials: "include" });
    if (res.ok) {
      return (await res.json()) as User;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Set auth state to authenticated with cookie-only auth (no token).
 * Used after a successful probe that detected an existing session.
 */
export function acceptCookieAuth(serverUrl: string, user: User): void {
  try {
    localStorage.setItem(SYNC_URL_KEY, serverUrl);
  } catch {
    // localStorage unavailable
  }
  setAuth({ status: "authenticated", serverUrl, user });
}

/**
 * Clear auth state and remove stored credentials from localStorage.
 */
export function logout(): void {
  try {
    localStorage.removeItem(SYNC_URL_KEY);
    localStorage.removeItem(SYNC_TOKEN_KEY);
  } catch {
    // localStorage unavailable
  }
  setAuth({ status: "local" });
}

/**
 * Attempt to restore auth state from localStorage on app start.
 * Tries cookie auth if a server URL is stored.
 */
export async function initAuth(): Promise<void> {
  let serverUrl: string | null = null;
  let token: string | null = null;
  try {
    serverUrl = localStorage.getItem(SYNC_URL_KEY);
    token = localStorage.getItem(SYNC_TOKEN_KEY);
  } catch {
    // localStorage unavailable
    return;
  }

  if (!serverUrl) return;

  // Try token-based auth first
  if (token) {
    try {
      const base = serverUrl.replace(/\/$/, "");
      const res = await fetch(`${base}/whoami`, {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const user = (await res.json()) as User;
        setAuth({ status: "authenticated", serverUrl, user, token });
        return;
      }
    } catch {
      // Network error — fall through to cookie auth
    }
  }

  // Try cookie auth
  const user = await checkCookieAuth(serverUrl);
  if (user) {
    setAuth({ status: "authenticated", serverUrl, user, token: token ?? undefined });
  }
}
