import "urlpattern-polyfill";
import { beforeEach } from "vitest";
import { waitForDb, clearAllCollections } from "../src/database/Db";
import { transactions } from "../src/models/Transaction";
import { merchantRules } from "../src/models/MerchantRule";

await waitForDb();

beforeEach(async () => {
  const dbs = await waitForDb();
  await clearAllCollections(dbs);
  transactions.clearCache();
  merchantRules.clearCache();
});
