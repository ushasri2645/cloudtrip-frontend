import { formatDateTime } from "../formatData";

describe("formatDateTime", () => {
  it("formats a time before noon correctly (AM)", () => {
    const result = formatDateTime("2025-07-18T09:30:00Z");
    expect(result).toBe("2025-07-18 at 9:30 AM");
  });

  it("formats a time after noon correctly (PM)", () => {
    const result = formatDateTime("2025-07-18T15:45:00Z");
    expect(result).toBe("2025-07-18 at 3:45 PM");
  });

  it("formats 12:00 PM correctly", () => {
    const result = formatDateTime("2025-07-18T12:00:00Z");
    expect(result).toBe("2025-07-18 at 12:00 PM");
  });

  it("formats 12:00 AM (midnight) correctly", () => {
    const result = formatDateTime("2025-07-18T00:00:00Z");
    expect(result).toBe("2025-07-18 at 12:00 AM");
  });

  it("pads minutes correctly when single digit", () => {
    const result = formatDateTime("2025-07-18T06:05:00Z");
    expect(result).toBe("2025-07-18 at 6:05 AM");
  });
  expect(formatDateTime("2025-07-29T00:00:00Z")).toBe("2025-07-29 at 12:00 AM");
  expect(formatDateTime("2025-07-29T06:30:00Z")).toBe("2025-07-29 at 6:30 AM");
});
