import { render, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Transaction } from "../../models/Transaction";
import TransactionDetail from "./TransactionDetail.svelte";

describe("TransactionDetail", () => {
  afterEach(cleanup);

  it("does not reload in a loop after mounting", async () => {
    await Transaction.bulkPut([
      { id: "tx-loop-test", date: "2024-01-01", amount: -50, description: "Test", tagIds: [] },
    ]);

    const getSpy = vi.spyOn(Transaction, "get");

    render(TransactionDetail, { props: { transactionId: "tx-loop-test" } });

    // Give effects time to settle — enough to catch a loop but not so long the test drags
    await new Promise((r) => setTimeout(r, 200));

    expect(getSpy).toHaveBeenCalledTimes(1);
    getSpy.mockRestore();
  });
});
