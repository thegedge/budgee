import { render, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";
import { Transaction } from "../../models/Transaction";
import TransactionDetail from "./TransactionDetail.svelte";

describe("TransactionDetail", () => {
  afterEach(cleanup);

  it("renders successfully", async () => {
    await Transaction.bulkPut([
      {
        id: "tx-render-test",
        date: "2024-01-01",
        amount: -50,
        description: "Test Groceries",
        tagIds: [],
      },
    ]);

    const { findByText } = render(TransactionDetail, {
      props: { transactionId: "tx-render-test" },
    });

    expect(await findByText("Test Groceries")).toBeTruthy();
  });
});
