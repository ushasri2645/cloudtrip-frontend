import { convertCurrency } from "../convertCurrency";

describe("convertCurrency", () => {
  it("should convert amount to INR correctly", () => {
    expect(convertCurrency(1000, "INR")).toBe("₹1000.00");
  });

  it("should convert amount to USD correctly", () => {
    expect(convertCurrency(1000, "USD")).toBe("$12.00");
  });

  it("should convert amount to EUR correctly", () => {
    expect(convertCurrency(1000, "EUR")).toBe("€11.00");
  });

  it("should convert amount to AUD correctly", () => {
    expect(convertCurrency(1000, "AUD")).toBe("A$18.00");
  });

  it("should convert amount to KWD correctly", () => {
    expect(convertCurrency(1000, "KWD")).toBe("KD3.70");
  });

  it("should fall back to INR conversion and symbol for unknown currency", () => {
    expect(convertCurrency(1000, "XYZ")).toBe("₹1000.00");
  });

  it("should round to 2 decimal places", () => {
    expect(convertCurrency(1234.567, "USD")).toBe("$14.81");
  });
});
