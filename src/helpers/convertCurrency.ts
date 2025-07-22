
const conversionRates: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  AUD: 0.018,
  KWD: 0.0037,
};

const currencySymbols: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  AUD: "A$",
  KWD: "KD",
};

export function convertCurrency(amount: number, currency: string): string {
  const rate = conversionRates[currency] || 1;
  const symbol = currencySymbols[currency] || "₹";
  const convertedAmount = amount * rate;
  return `${symbol}${convertedAmount.toFixed(2)}`;
}
