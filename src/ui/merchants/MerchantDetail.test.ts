import { render, cleanup } from "@testing-library/svelte";
import { settled } from "svelte";
import { afterEach, describe, it } from "vitest";
import { Merchant } from "../../models/Merchant";
import MerchantDetail from "./MerchantDetail.svelte";

describe("MerchantDetail", () => {
  afterEach(cleanup);

  it("renders successfully", async () => {
    const merchant = await Merchant.create("Test Coffee Shop");

    render(MerchantDetail, { props: { merchantId: merchant.id } });
    await settled();
  });
});
