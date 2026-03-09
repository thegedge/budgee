import "urlpattern-polyfill";
import type { ReactiveController, ReactiveControllerHost } from "lit";

export interface RouteConfig {
  path: string;
  render?: (params: Record<string, string | undefined>) => unknown;
  enter?: (params: Record<string, string | undefined>) => Promise<boolean> | boolean;
}

interface CompiledRoute {
  config: RouteConfig;
  pattern: URLPattern;
}

/**
 * A minimal Lit reactive controller that provides client-side routing using URLPattern.
 * Handles pushState-based navigation and browser back/forward via popstate events.
 */
export class Router implements ReactiveController {
  readonly #host: ReactiveControllerHost & HTMLElement;
  readonly #routes: CompiledRoute[];
  #outlet: unknown = null;

  constructor(host: ReactiveControllerHost & HTMLElement, routes: RouteConfig[]) {
    this.#host = host;
    this.#routes = routes.map((config) => ({
      config,
      pattern: new URLPattern({ pathname: config.path }),
    }));
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener("popstate", this.#onPopState);
    void this.#resolve(window.location.pathname);
  }

  hostDisconnected() {
    window.removeEventListener("popstate", this.#onPopState);
  }

  #onPopState = () => {
    void this.#resolve(window.location.pathname);
  };

  async #resolve(pathname: string) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    if (base && pathname.startsWith(base)) {
      pathname = pathname.slice(base.length) || "/";
    }

    for (const route of this.#routes) {
      const result = route.pattern.exec({ pathname });
      if (result === null) continue;

      const params: Record<string, string | undefined> = result.pathname.groups;

      if (route.config.enter) {
        const allowed = await route.config.enter(params);
        if (!allowed) return;
      }

      this.#outlet = route.config.render ? route.config.render(params) : null;
      this.#host.requestUpdate();
      return;
    }

    // No route matched — clear the outlet
    this.#outlet = null;
    this.#host.requestUpdate();
  }

  /** Returns the rendered output of the currently matched route. */
  outlet(): unknown {
    return this.#outlet;
  }
}
