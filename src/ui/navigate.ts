/** The base path prefix, without a trailing slash (e.g. "" or "/budgee"). */
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prepend the base path to a route path. */
export function withBasePath(path: string): string {
  return basePath + path;
}

/** Strip the base path from a full pathname, returning the route-level path. */
export function stripBasePath(pathname: string): string {
  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || "/";
  }
  return pathname;
}

/** Navigate to a route using the app's pushState-based router. */
export function navigate(path: string) {
  const url = new URL(withBasePath(path), window.location.origin);
  // Preserve demo mode query param across navigations
  const demo = new URLSearchParams(window.location.search).get("demo");
  if (demo) url.searchParams.set("demo", demo);
  window.history.pushState({}, "", url.pathname + url.search);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
