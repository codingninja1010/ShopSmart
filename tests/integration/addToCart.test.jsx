import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducers from 'src/redux/reducer';
import Products from 'src/components/Products';

describe('Add to Cart integration', () => {
  const mockProducts = [
    {
      id: 101,
      title: 'Test Product',
      description: 'A product for testing',
      price: 12.34,
      category: 'electronics',
      image: 'https://example.com/image.jpg',
      rating: { rate: 4.5, count: 10 },
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockProducts,
      ok: true,
    });
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('adds product to cart and increments quantity on second click', async () => {
    const store = configureStore({ reducer: rootReducers });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await screen.findByRole('heading', { name: /Test Product/i });
    const addBtn = (await screen.findAllByRole('button', { name: /add to cart/i }))[0];

    await userEvent.click(addBtn);
    let state = store.getState();
    expect(state.handleCart).toHaveLength(1);
    expect(state.handleCart[0]).toMatchObject({ id: 101, qty: 1 });

    await userEvent.click(addBtn);
    state = store.getState();
    expect(state.handleCart[0].qty).toBe(2);
  });
});
