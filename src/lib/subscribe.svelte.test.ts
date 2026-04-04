import { describe, it, expect, vi } from "vitest";
import { flushSync, untrack } from "svelte";
import { useSubscription } from "./subscribe.svelte";

function mockSubscribe() {
  return vi.fn(async (_cb: () => void) => ({ unsubscribe: vi.fn() }));
}

async function settled() {
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
}

describe("useSubscription", () => {
  it("calls refresh once on setup", async () => {
    const refresh = vi.fn();
    const subscribe = mockSubscribe();

    const cleanup = $effect.root(() => {
      useSubscription([subscribe], refresh);
    });

    await settled();
    expect(refresh).toHaveBeenCalledTimes(1);
    cleanup();
  });

  it("subscribes to all provided subscribe functions", async () => {
    const sub1 = mockSubscribe();
    const sub2 = mockSubscribe();

    const cleanup = $effect.root(() => {
      useSubscription([sub1, sub2], () => {});
    });

    await settled();
    expect(sub1).toHaveBeenCalledTimes(1);
    expect(sub2).toHaveBeenCalledTimes(1);
    cleanup();
  });

  it("unsubscribes on cleanup", async () => {
    const unsub = vi.fn();
    const subscribe = vi.fn(async () => ({ unsubscribe: unsub }));

    const cleanup = $effect.root(() => {
      useSubscription([subscribe], () => {});
    });

    await settled();
    cleanup();
    expect(unsub).toHaveBeenCalled();
  });

  it("does not loop when refresh reads and writes $state using untrack", async () => {
    let value = $state<string | undefined>(undefined);
    let callCount = 0;
    const subscribe = mockSubscribe();

    const cleanup = $effect.root(() => {
      useSubscription([subscribe], () => {
        callCount++;
        untrack(() => value);
        value = "updated";
      });
    });

    await settled();
    await settled();

    // Should be bounded (1-2 from initial setup), not infinite
    expect(callCount).toBeLessThanOrEqual(2);
    cleanup();
  });
});
