import { describe, expect, it, vi } from "vitest";
import { initRouter, matchedRoute } from "./router.svelte";

describe("initRouter", () => {
  it("calls enter callback for the initially matched route", () => {
    // Simulate landing on /transactions/abc
    Object.defineProperty(window, "location", {
      value: { pathname: "/transactions/abc" },
      writable: true,
    });

    const enter = vi.fn(() => true);

    initRouter([
      { path: "/" },
      { path: "/transactions" },
      { path: "/transactions/:id", enter },
      { path: "/settings" },
    ]);

    expect(enter).toHaveBeenCalledOnce();
    expect(enter).toHaveBeenCalledWith(expect.objectContaining({ id: "abc" }));
  });

  it("does not call enter for non-matching routes", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/settings" },
      writable: true,
    });

    const enter = vi.fn(() => true);

    initRouter([{ path: "/transactions/:id", enter }, { path: "/settings" }]);

    expect(enter).not.toHaveBeenCalled();
  });

  it("does not call enter when route has no enter callback", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/transactions" },
      writable: true,
    });

    // No enter callback — should not throw
    initRouter([{ path: "/transactions" }]);

    const route = matchedRoute();
    expect(route?.config.path).toBe("/transactions");
  });

  it("calls enter with params for detail routes with special characters", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/transactions/did:web:mygard:users:alice~demo-tx-1205" },
      writable: true,
    });

    const enter = vi.fn(() => true);

    initRouter([{ path: "/transactions/:id", enter }]);

    expect(enter).toHaveBeenCalledWith(
      expect.objectContaining({ id: "did:web:mygard:users:alice~demo-tx-1205" }),
    );
  });

  it("calls enter for account detail route on refresh", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/accounts/acc-123" },
      writable: true,
    });

    const txEnter = vi.fn(() => true);
    const accEnter = vi.fn(() => true);

    initRouter([
      { path: "/transactions/:id", enter: txEnter },
      { path: "/accounts/:id", enter: accEnter },
    ]);

    expect(txEnter).not.toHaveBeenCalled();
    expect(accEnter).toHaveBeenCalledOnce();
  });

  it("calls enter for merchant detail route on refresh", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/merchants/m-freshmart" },
      writable: true,
    });

    const enter = vi.fn(() => true);

    initRouter([{ path: "/merchants/:id", enter }]);

    expect(enter).toHaveBeenCalledOnce();
  });
});
