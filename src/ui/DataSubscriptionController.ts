import { type ReactiveController, type ReactiveControllerHost } from "lit";
import { debounce } from "../debounce";

type SubscribeFn = (callback: () => void) => Promise<{ unsubscribe: () => void }>;

export class DataSubscriptionController implements ReactiveController {
  #subscribeFns: SubscribeFn[];
  #refresh: () => void;
  #subscriptions: { unsubscribe: () => void }[] = [];
  #debounceMs: number;

  constructor(
    host: ReactiveControllerHost,
    subscribeFns: SubscribeFn[],
    refresh: () => void,
    debounceMs = 300,
  ) {
    this.#subscribeFns = subscribeFns;
    this.#refresh = refresh;
    this.#debounceMs = debounceMs;
    host.addController(this);
  }

  hostConnected() {
    this.#refresh();
    const debouncedRefresh = debounce(() => this.#refresh(), this.#debounceMs);
    Promise.all(this.#subscribeFns.map((fn) => fn(debouncedRefresh))).then((subs) => {
      this.#subscriptions = subs;
    });
  }

  hostDisconnected() {
    for (const sub of this.#subscriptions) sub.unsubscribe();
    this.#subscriptions = [];
  }
}
