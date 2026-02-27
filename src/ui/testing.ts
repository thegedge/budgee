export async function waitFor(fn: () => void | Promise<void>, timeout = 2000, interval = 10) {
  const start = Date.now();
  while (true) {
    try {
      await fn();
      return;
    } catch (e) {
      if (Date.now() - start > timeout) throw e;
      await new Promise((r) => setTimeout(r, interval));
    }
  }
}
