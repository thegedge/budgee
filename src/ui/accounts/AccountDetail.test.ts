import { render, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";
import { Account } from "../../models/Account";
import AccountDetail from "./AccountDetail.svelte";

describe("AccountDetail", () => {
  afterEach(cleanup);

  it("renders successfully", async () => {
    const account = await Account.create({ name: "Test Chequing" });

    const { findByText } = render(AccountDetail, { props: { accountId: account.id } });

    expect(await findByText("Test Chequing")).toBeTruthy();
  });
});
