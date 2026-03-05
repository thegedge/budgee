import { describe, expect, it } from "vitest";
import { highlightMatch } from "./highlightMatch";

describe("highlightMatch", () => {
  it("returns text unchanged when query is empty", () => {
    expect(highlightMatch("hello world", "")).toBe("hello world");
  });

  it("returns text unchanged when no match found", () => {
    expect(highlightMatch("hello world", "xyz")).toBe("hello world");
  });

  it("returns a TemplateResult with mark element on match", () => {
    const result = highlightMatch("hello world", "world");
    // TemplateResult has a strings property
    expect(typeof result).toBe("object");
    expect((result as unknown as { strings: unknown }).strings).toBeDefined();
  });

  it("is case-insensitive", () => {
    const result = highlightMatch("Hello World", "hello");
    expect(typeof result).toBe("object");
    expect((result as unknown as { strings: unknown }).strings).toBeDefined();
  });
});
