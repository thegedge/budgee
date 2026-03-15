import "urlpattern-polyfill";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import { stripBasePath } from "./navigate";

export interface RouteConfig {
  path: string;
  render?: (params: Record<string, string | undefined>) => unknown;
  enter?: (params: Record<string, string | undefined>) => Promise<boolean> | boolean;
}

interface CompiledRoute {
  config: RouteConfig;
  pattern: URLPattern;
}

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
    window.navigation.addEventListener("navigate", this.#onNavigate);
    void this.#resolve(window.location.pathname);
  }

  hostDisconnected() {
    window.navigation.removeEventListener("navigate", this.#onNavigate);
  }

  #onNavigate = (event: NavigateEvent) => {
    if (!event.canIntercept || event.hashChange || event.downloadRequest || event.formData) return;
    if (event.navigationType === "reload") return;
    const pathname = new URL(event.destination.url).pathname;
    event.intercept({
      handler: async () => {
        await this.#resolve(pathname);
      },
    });
  };

  async #resolve(pathname: string) {
    pathname = stripBasePath(pathname);

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
