import { describe, it, expect, beforeEach } from "vitest";
import { knownDids, setKnownDids } from "./knownDids.svelte";

describe("knownDids", () => {
  beforeEach(() => {
    setKnownDids([]);
  });

  it("returns empty array by default", () => {
    expect(knownDids()).toEqual([]);
  });

  it("returns the DIDs set via setKnownDids", () => {
    setKnownDids(["did:web:example.com:users:alice", "did:web:example.com:users:bob"]);
    expect(knownDids()).toEqual([
      "did:web:example.com:users:alice",
      "did:web:example.com:users:bob",
    ]);
  });

  it("replaces previous DIDs when called again", () => {
    setKnownDids(["did:web:example.com:users:alice"]);
    setKnownDids(["did:web:example.com:users:charlie"]);
    expect(knownDids()).toEqual(["did:web:example.com:users:charlie"]);
  });
});
