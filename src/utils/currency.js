// Currency utils for INR formatting and USD->INR conversion
// Assumption: Use a static FX rate close to current average. Adjust as needed.
export const USD_TO_INR = 83; // 1 USD ~= ₹83

export function usdToInr(amountUSD) {
  if (typeof amountUSD !== 'number' || isNaN(amountUSD)) return 0;
  return amountUSD * USD_TO_INR;
}

export function formatINR(amount) {
  const safe = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(safe);
}
