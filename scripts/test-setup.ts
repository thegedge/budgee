import "urlpattern-polyfill";
import { beforeEach, vi } from "vitest";
import { waitForDb, clearAllCollections } from "../src/database/Db";
import { transactions } from "../src/models/Transaction";
import { merchantRules } from "../src/models/MerchantRule";

if (!window.navigation) {
  const navigationMock = {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    navigate: vi
      .fn()
      .mockReturnValue({ committed: Promise.resolve(), finished: Promise.resolve() }),
  };
  Object.defineProperty(window, "navigation", { value: navigationMock, writable: true });
}

await waitForDb();

beforeEach(async () => {
  const dbs = await waitForDb();
  await clearAllCollections(dbs);
  transactions.clearCache();
  merchantRules.clearCache();
});
