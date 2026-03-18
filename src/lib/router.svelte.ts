import "urlpattern-polyfill";
import { stripBasePath } from "../ui/navigate";

export interface RouteConfig {
  path: string;
  enter?: (params: Record<string, string | undefined>) => Promise<boolean> | boolean;
}

interface CompiledRoute {
  config: RouteConfig;
  pattern: URLPattern;
}

let currentPath = $state(stripBasePath(window.location.pathname));
let routes: CompiledRoute[] = [];

export function currentRoute() {
  return currentPath;
}

export function matchedRoute(): {
  config: RouteConfig;
  params: Record<string, string | undefined>;
} | null {
  for (const route of routes) {
    const result = route.pattern.exec({ pathname: currentPath });
    if (result) {
      return { config: route.config, params: result.pathname.groups };
    }
  }
  return null;
}

export function initRouter(routeConfigs: RouteConfig[]) {
  routes = routeConfigs.map((config) => ({
    config,
    pattern: new URLPattern({ pathname: config.path }),
  }));
  currentPath = stripBasePath(window.location.pathname);
}

function onNavigate(event: NavigateEvent) {
  if (!event.canIntercept || event.hashChange || event.downloadRequest || event.formData) return;
  if (event.navigationType === "reload") return;
  const pathname = new URL(event.destination.url).pathname;
  event.intercept({
    handler: async () => {
      const stripped = stripBasePath(pathname);
      for (const route of routes) {
        const result = route.pattern.exec({ pathname: stripped });
        if (!result) continue;
        const params: Record<string, string | undefined> = result.pathname.groups;
        if (route.config.enter) {
          const allowed = await route.config.enter(params);
          if (!allowed) return;
        }
        currentPath = stripped;
        return;
      }
      currentPath = stripped;
    },
  });
}

export function startRouter() {
  window.navigation.addEventListener("navigate", onNavigate);
  return () => {
    window.navigation.removeEventListener("navigate", onNavigate);
  };
}
