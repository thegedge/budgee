import { describe, expect, it } from "vitest";
import { parseTurnUri } from "./replication";

describe("parseTurnUri", () => {
  it("parses a turn URI with credentials", () => {
    expect(parseTurnUri("turn:myuser:mypass@example.com:3478")).toEqual({
      urls: "turn:example.com:3478",
      username: "myuser",
      credential: "mypass",
    });
  });

  it("parses a turns URI with credentials", () => {
    expect(parseTurnUri("turns:myuser:mypass@example.com:5349")).toEqual({
      urls: "turns:example.com:5349",
      username: "myuser",
      credential: "mypass",
    });
  });

  it("returns the URI as-is when it does not match the expected format", () => {
    expect(parseTurnUri("turn:example.com:3478")).toEqual({
      urls: "turn:example.com:3478",
    });
  });

  it("returns the URI as-is for stun URIs", () => {
    expect(parseTurnUri("stun:example.com:3478")).toEqual({
      urls: "stun:example.com:3478",
    });
  });
});
