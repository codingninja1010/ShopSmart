// Unit tests for handleCart reducer
import handleCart from './handleCart';

const product = { id: 1, title: 'Sample', price: 10 };

beforeEach(() => {
  // Ensure reducer initial state isn't influenced by prior tests
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('cart');
  }
});

test('returns initial state (empty array) when state is undefined', () => {
  const state = handleCart(undefined, { type: '@@INIT' });
  expect(Array.isArray(state)).toBe(true);
  expect(state).toHaveLength(0);
});

test('ADDITEM adds new product with qty 1', () => {
  const state1 = handleCart([], { type: 'ADDITEM', payload: product });
  expect(state1).toHaveLength(1);
  expect(state1[0]).toMatchObject({ id: product.id, qty: 1 });
});

test('ADDITEM increments qty when product exists', () => {
  const state1 = handleCart([], { type: 'ADDITEM', payload: product });
  const state2 = handleCart(state1, { type: 'ADDITEM', payload: product });
  expect(state2).toHaveLength(1);
  expect(state2[0].qty).toBe(2);
});

test('DELITEM decrements qty when qty > 1', () => {
  const state1 = handleCart([], { type: 'ADDITEM', payload: product });
  const state2 = handleCart(state1, { type: 'ADDITEM', payload: product });
  const state3 = handleCart(state2, { type: 'DELITEM', payload: product });
  expect(state3[0].qty).toBe(1);
});

test('DELITEM removes product when qty == 1', () => {
  const state1 = handleCart([], { type: 'ADDITEM', payload: product });
  const state2 = handleCart(state1, { type: 'DELITEM', payload: product });
  expect(state2).toHaveLength(0);
});

test('REMALLITEM removes product regardless of qty', () => {
  const seeded = [{ ...product, qty: 3 }];
  const state2 = handleCart(seeded, { type: 'REMALLITEM', payload: product });
  expect(state2).toHaveLength(0);
});

test('unknown action returns same state reference', () => {
  const prev = [{ ...product, qty: 1 }];
  const next = handleCart(prev, { type: 'UNKNOWN' });
  expect(next).toBe(prev);
});

test('DELITEM for non-existent product returns same state', () => {
  const prev = [{ ...product, qty: 1 }];
  const other = { id: 2, title: 'Other', price: 5 };
  const next = handleCart(prev, { type: 'DELITEM', payload: other });
  expect(next).toBe(prev);
});
