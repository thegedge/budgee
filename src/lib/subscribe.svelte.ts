import { debounce } from "../debounce";

type SubscribeFn = (callback: () => void) => Promise<{ unsubscribe: () => void }>;

export function useSubscription(
  subscribeFns: SubscribeFn[],
  refresh: () => void,
  debounceMs = 300,
) {
  let subscriptions: { unsubscribe: () => void }[] = [];

  $effect(() => {
    refresh();
    const debouncedRefresh = debounce(() => refresh(), debounceMs);
    Promise.all(subscribeFns.map((fn) => fn(debouncedRefresh))).then((subs) => {
      subscriptions = subs;
    });

    return () => {
      for (const sub of subscriptions) sub.unsubscribe();
      subscriptions = [];
    };
  });
}
