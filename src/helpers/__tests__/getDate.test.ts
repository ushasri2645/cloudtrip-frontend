import { describe, it, expect } from "vitest";
import { getDate } from "../getDate";

describe("getDate", () => {
  it("should return date in YYYY-MM-DD format", () => {
    const input = new Date("2025-07-19T15:45:30.000Z");
    const result = getDate(input);
    expect(result).toBe("2025-07-19");
  });

  it("should handle different dates correctly", () => {
    const input = new Date("1995-12-17T03:24:00");
    const result = getDate(input);
    expect(result).toBe("1995-12-16");
  });
});
