import { usdToInr, formatINR, USD_TO_INR } from 'src/utils/currency';

describe('currency utils', () => {
  test('usdToInr converts safely', () => {
    expect(usdToInr(1)).toBe(USD_TO_INR);
    expect(usdToInr('x')).toBe(0);
    expect(usdToInr(NaN)).toBe(0);
  });

  test('formatINR formats numbers', () => {
    const formatted = formatINR(1234);
    expect(typeof formatted).toBe('string');
    expect(formatted).toMatch(/\u20B9|INR/);
    expect(formatINR('x')).toMatch(/\u20B9|INR/);
  });
});
