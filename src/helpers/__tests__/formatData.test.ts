import { formatDateTime } from "../formatData";


describe("formatDateTime", () => {
  it("formats a time before noon correctly (AM)", () => {
    const result = formatDateTime("2025-07-18T09:30:00Z");
    expect(result).toBe("2025-07-18 at 3:00 PM");
  });

  it("formats a time after noon correctly (PM)", () => {
    const result = formatDateTime("2025-07-18T15:45:00Z");
    expect(result).toBe("2025-07-18 at 9:15 PM");
  });

  it("formats 12:00 PM correctly", () => {
    const result = formatDateTime("2025-07-18T12:00:00Z");
    expect(result).toBe("2025-07-18 at 5:30 PM");
  });

  it("formats 12:00 AM (midnight) correctly", () => {
    const result = formatDateTime("2025-07-18T00:00:00Z");
    expect(result).toBe("2025-07-18 at 5:30 AM");
  });

  it("pads minutes correctly when single digit", () => {
    const result = formatDateTime("2025-07-18T06:05:00Z");
    expect(result).toBe("2025-07-18 at 11:35 AM");
  });
});
