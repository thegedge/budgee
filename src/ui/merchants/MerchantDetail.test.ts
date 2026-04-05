import { render, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";
import { Merchant } from "../../models/Merchant";
import MerchantDetail from "./MerchantDetail.svelte";

describe("MerchantDetail", () => {
  afterEach(cleanup);

  it("renders successfully", async () => {
    const merchant = await Merchant.create("Test Coffee Shop");

    const { findByText } = render(MerchantDetail, { props: { merchantId: merchant.id } });

    expect(await findByText("Test Coffee Shop")).toBeTruthy();
  });
});
