import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { parseRelativeDate } from "./parseRelativeDate";

describe("parseRelativeDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns undefined for empty string", () => {
    expect(parseRelativeDate("")).toBeUndefined();
  });

  it("returns undefined for unparseable input", () => {
    expect(parseRelativeDate("yesterday")).toBeUndefined();
    expect(parseRelativeDate("foo bar")).toBeUndefined();
  });

  it("passes through ISO dates", () => {
    expect(parseRelativeDate("2024-01-15")).toBe("2024-01-15");
  });

  it("parses N days ago", () => {
    expect(parseRelativeDate("10 days ago")).toBe("2025-06-05");
    expect(parseRelativeDate("1 day ago")).toBe("2025-06-14");
  });

  it("parses N weeks ago", () => {
    expect(parseRelativeDate("2 weeks ago")).toBe("2025-06-01");
    expect(parseRelativeDate("1 week ago")).toBe("2025-06-08");
  });

  it("parses N months ago", () => {
    expect(parseRelativeDate("1 month ago")).toBe("2025-05-15");
    expect(parseRelativeDate("6 months ago")).toBe("2024-12-15");
  });

  it("parses N years ago", () => {
    expect(parseRelativeDate("1 year ago")).toBe("2024-06-15");
    expect(parseRelativeDate("2 years ago")).toBe("2023-06-15");
  });

  it("is case insensitive", () => {
    expect(parseRelativeDate("3 Months Ago")).toBe("2025-03-15");
  });

  it("trims whitespace", () => {
    expect(parseRelativeDate("  5 days ago  ")).toBe("2025-06-10");
  });
});
