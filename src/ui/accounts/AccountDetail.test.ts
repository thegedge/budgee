import { render, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Account } from "../../models/Account";
import AccountDetail from "./AccountDetail.svelte";

describe("AccountDetail", () => {
  afterEach(cleanup);

  it("does not reload in a loop after mounting", async () => {
    await Account.create({ name: "Test Account" });
    const accounts = await Account.all();
    const id = accounts[0].id;

    const getSpy = vi.spyOn(Account, "get");

    render(AccountDetail, { props: { accountId: id } });

    await new Promise((r) => setTimeout(r, 200));

    expect(getSpy).toHaveBeenCalledTimes(1);
    getSpy.mockRestore();
  });
});
