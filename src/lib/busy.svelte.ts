export function useBusy() {
  let busy = $state(false);

  async function withBusy<R>(fn: () => Promise<R>): Promise<R> {
    busy = true;
    try {
      return await fn();
    } finally {
      busy = false;
    }
  }

  return {
    get busy() {
      return busy;
    },
    withBusy,
  };
}
