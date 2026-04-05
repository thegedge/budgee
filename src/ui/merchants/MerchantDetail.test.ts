import { render, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Merchant } from "../../models/Merchant";
import MerchantDetail from "./MerchantDetail.svelte";

describe("MerchantDetail", () => {
  afterEach(cleanup);

  it("does not reload in a loop after mounting", async () => {
    const merchant = await Merchant.create("Test Merchant");

    const getSpy = vi.spyOn(Merchant, "get");

    render(MerchantDetail, { props: { merchantId: merchant.id } });

    await new Promise((r) => setTimeout(r, 200));

    // Called twice on mount: once from useSubscription, once from the merchantId $effect
    expect(getSpy).toHaveBeenCalledTimes(2);
    getSpy.mockRestore();
  });
});
