import { describe, expect, it } from "vitest";
import { buildTopic } from "./replication";

describe("buildTopic", () => {
  it("returns un-namespaced topic when no userLogin is provided", () => {
    expect(buildTopic("transactions")).toBe("budgee--transactions");
  });

  it("returns un-namespaced topic when userLogin is null", () => {
    expect(buildTopic("transactions", null)).toBe("budgee--transactions");
  });

  it("returns un-namespaced topic when userLogin is undefined", () => {
    expect(buildTopic("transactions", undefined)).toBe("budgee--transactions");
  });

  it("returns namespaced topic when userLogin is provided", () => {
    expect(buildTopic("transactions", "alice")).toBe("budgee--alice--transactions");
  });

  it("namespaces all collection names correctly", () => {
    const collections = ["transactions", "tags", "merchants", "accounts", "merchant_rules"];
    for (const col of collections) {
      expect(buildTopic(col, "bob")).toBe(`budgee--bob--${col}`);
    }
  });

  it("returns un-namespaced topic when userLogin is an empty string", () => {
    expect(buildTopic("transactions", "")).toBe("budgee--transactions");
  });
});
