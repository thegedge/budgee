import { render, cleanup } from "@testing-library/svelte";
import { settled } from "svelte";
import { afterEach, describe, it } from "vitest";
import { Account } from "../../models/Account";
import AccountDetail from "./AccountDetail.svelte";

describe("AccountDetail", () => {
  afterEach(cleanup);

  it("renders successfully", async () => {
    const account = await Account.create({ name: "Test Chequing" });

    render(AccountDetail, { props: { accountId: account.id } });
    await settled();
  });
});
