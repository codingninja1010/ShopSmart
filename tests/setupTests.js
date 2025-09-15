// Extend Jest with DOM matchers
import '@testing-library/jest-dom';

// Quiet specific noisy warnings in tests to keep output readable.
// We only filter well-known, non-actionable messages.

const originalError = console.error;
const originalWarn = console.warn;

const errorFilters = [
  /ReactDOMTestUtils\.act is deprecated/i,
  /deprecated in favor of `React\.act`/i,
];

const warnFilters = [
  /React Router Future Flag Warning/i,
  /not wrapped in act\(\)\./i,
];

console.error = (...args) => {
  const text = args.map(a => (typeof a === 'string' ? a : '')).join(' ');
  if (errorFilters.some((re) => re.test(text))) {
    return;
  }
  originalError(...args);
};

console.warn = (...args) => {
  const text = args.map(a => (typeof a === 'string' ? a : '')).join(' ');
  if (warnFilters.some((re) => re.test(text))) {
    return;
  }
  originalWarn(...args);
};

// Minimal ResizeObserver polyfill for jsdom-based tests
if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}
