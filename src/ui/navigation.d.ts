interface NavigationDestination {
  url: string;
}

interface NavigationInterceptOptions {
  handler?: () => Promise<void>;
}

interface NavigateEvent extends Event {
  readonly canIntercept: boolean;
  readonly hashChange: boolean;
  readonly downloadRequest: string | null;
  readonly formData: FormData | null;
  readonly destination: NavigationDestination;
  readonly signal: AbortSignal;
  intercept(options?: NavigationInterceptOptions): void;
}

interface NavigationNavigateOptions {
  state?: unknown;
  history?: "auto" | "push" | "replace";
}

interface NavigationResult {
  committed: Promise<void>;
  finished: Promise<void>;
}

interface Navigation extends EventTarget {
  addEventListener(
    type: "navigate",
    listener: (event: NavigateEvent) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: "navigate",
    listener: (event: NavigateEvent) => void,
    options?: boolean | EventListenerOptions,
  ): void;
  navigate(url: string, options?: NavigationNavigateOptions): NavigationResult;
}

interface Window {
  readonly navigation: Navigation;
}
