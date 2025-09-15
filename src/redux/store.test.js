import store from './store';
import { addCart } from './action';

describe('store cart persistence', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('writes cart to localStorage when updated', () => {
    const product = { id: 123, title: 'X', price: 5 };
    store.dispatch(addCart(product));
    const saved = JSON.parse(window.localStorage.getItem('cart') || '[]');
    expect(saved.find(p => p.id === 123)).toBeTruthy();
  });
});
