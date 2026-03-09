/** Navigate to a route using the app's pushState-based router. */
export function navigate(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const url = new URL(base + path, window.location.origin);
  // Preserve demo mode query param across navigations
  const demo = new URLSearchParams(window.location.search).get("demo");
  if (demo) url.searchParams.set("demo", demo);
  window.history.pushState({}, "", url.pathname + url.search);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
