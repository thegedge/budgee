import type { User } from "./identity";
import { deleteAllDatabases } from "./database/Db";

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
const DB_OWNER_KEY = "budgee-db-owner";

let current = $state<AuthState>({ status: "local" });

export function getAuth(): AuthState {
  return current;
}

function setAuth(state: AuthState): void {
  current = state;
}

/**
 * Stamp identifying which user's data lives in the local IndexedDB.
 * Used by {@link enforceDbOwnership} to detect when a different user
 * has authenticated and wipe the previous user's data.
 *
 * DID is the primary identifier (stable across servers). When the server
 * does not return a DID, we fall back to composite `login + serverUrl`.
 * A DID-present and DID-absent pair never match — conservative by design.
 */
export interface DbOwner {
  did: string | null;
  login: string;
  serverUrl: string;
}

export function readOwner(): DbOwner | null {
  try {
    const raw = localStorage.getItem(DB_OWNER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const p = parsed as Record<string, unknown>;
    if (typeof p.login !== "string" || typeof p.serverUrl !== "string") return null;
    const did = typeof p.did === "string" ? p.did : null;
    return { did, login: p.login, serverUrl: p.serverUrl };
  } catch {
    return null;
  }
}

export function writeOwner(owner: DbOwner): void {
  try {
    localStorage.setItem(DB_OWNER_KEY, JSON.stringify(owner));
  } catch {
    // localStorage unavailable
  }
}

export function clearOwner(): void {
  try {
    localStorage.removeItem(DB_OWNER_KEY);
  } catch {
    // localStorage unavailable
  }
}

function ownerFromUser(serverUrl: string, user: User): DbOwner {
  return { did: user.did ?? null, login: user.login, serverUrl };
}

function ownersMatch(a: DbOwner, b: DbOwner): boolean {
  if (a.did !== null && b.did !== null) return a.did === b.did;
  if (a.did === null && b.did === null) {
    return a.login === b.login && a.serverUrl === b.serverUrl;
  }
  return false;
}

function setAuthenticated(serverUrl: string, user: User, token?: string): void {
  setAuth({ status: "authenticated", serverUrl, user, token });
  writeOwner(ownerFromUser(serverUrl, user));
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

  setAuthenticated(serverUrl, user, token);
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

  setAuthenticated(serverUrl, user, token);
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
  setAuthenticated(serverUrl, user);
}

/**
 * Clear auth state, wipe local databases, and remove stored credentials
 * from localStorage. Callers should reload the page after awaiting this.
 *
 * Auth state, stamp, and localStorage are reset synchronously; the DB wipe
 * is awaited via the returned promise. Unawaited calls still observe the
 * sync state change (used by a few test beforeEach hooks).
 */
export function logout(): Promise<void> {
  const wasAuthenticated = current.status === "authenticated";
  setAuth({ status: "local" });
  clearOwner();
  try {
    localStorage.removeItem(SYNC_URL_KEY);
    localStorage.removeItem(SYNC_TOKEN_KEY);
  } catch {
    // localStorage unavailable
  }
  // Only wipe local databases when transitioning out of an authenticated
  // session. Calling logout() as a reset hook from "local" state is a no-op
  // for the DB, which matches test-setup usage.
  if (!wasAuthenticated) return Promise.resolve();
  return deleteAllDatabases().catch((e) => {
    console.error("Failed to wipe databases on logout:", e);
  });
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
        setAuthenticated(serverUrl, user, token);
        return;
      }
    } catch {
      // Network error — fall through to cookie auth
    }
  }

  // Try cookie auth
  const user = await checkCookieAuth(serverUrl);
  if (user) {
    setAuthenticated(serverUrl, user, token ?? undefined);
  }
}

/**
 * Verify that the local IndexedDB belongs to the currently authenticated user.
 * Must be called after `initAuth()` and before opening the database. If the
 * stamped owner differs from the authenticated user, wipes the local
 * databases and reloads the page.
 *
 * Returns "ok" if the caller should proceed. Returns "wiped" if a reload is
 * in progress — caller should abort startup to avoid touching the DB mid-wipe.
 *
 * Offline-safe: when auth is "local" (e.g. network error, expired cookie),
 * returns "ok" without touching the stamp or the database.
 */
export async function enforceDbOwnership(): Promise<"ok" | "wiped"> {
  const auth = getAuth();
  if (auth.status !== "authenticated") return "ok";

  const currentOwner = ownerFromUser(auth.serverUrl, auth.user);
  const stamped = readOwner();

  if (!stamped) {
    // No stamp yet — claim existing local data for the current user.
    // This matches the backup-flow intent where an existing local DB is
    // adopted on first authentication.
    writeOwner(currentOwner);
    return "ok";
  }

  if (ownersMatch(stamped, currentOwner)) return "ok";

  // Mismatch — wipe and reload.
  try {
    await deleteAllDatabases();
  } catch (e) {
    console.error("Failed to wipe databases on owner mismatch:", e);
  }
  writeOwner(currentOwner);
  if (typeof window !== "undefined") {
    window.location.reload();
  }
  return "wiped";
}
