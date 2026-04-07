import { describe, expect, it } from "vitest";
import { transactionStats } from "./transactionStats";

describe("transactionStats", () => {
  it("groups by a single key", () => {
    const txs = [
      { amount: -10, merchantId: "m1" },
      { amount: -20, merchantId: "m1" },
      { amount: -5, merchantId: "m2" },
    ];
    const stats = transactionStats(txs, (tx) => [
      (tx as unknown as { merchantId: string }).merchantId,
    ]);

    expect(stats.get("m1")).toEqual({ count: 2, total: -30 });
    expect(stats.get("m2")).toEqual({ count: 1, total: -5 });
  });

  it("groups by multiple keys (tags)", () => {
    const txs = [{ amount: -10, tagIds: ["t1", "t2"] }];
    const stats = transactionStats(txs, (tx) => (tx as unknown as { tagIds: string[] }).tagIds);

    expect(stats.get("t1")).toEqual({ count: 1, total: -10 });
    expect(stats.get("t2")).toEqual({ count: 1, total: -10 });
  });

  it("skips undefined keys", () => {
    const txs = [{ amount: -10, merchantId: undefined }];
    const stats = transactionStats(txs, (tx) => [
      (tx as unknown as { merchantId?: string }).merchantId,
    ]);

    expect(stats.size).toBe(0);
  });

  it("returns empty map for empty input", () => {
    const stats = transactionStats([], () => []);
    expect(stats.size).toBe(0);
  });

  it("accumulates totals across transactions", () => {
    const txs = [
      { amount: 100, tagIds: ["t1"] },
      { amount: -50, tagIds: ["t1"] },
      { amount: 25, tagIds: ["t1"] },
    ];
    const stats = transactionStats(txs, (tx) => (tx as unknown as { tagIds: string[] }).tagIds);
    expect(stats.get("t1")).toEqual({ count: 3, total: 75 });
  });
});
