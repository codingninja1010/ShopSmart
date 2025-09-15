import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducers from 'src/redux/reducer';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Make Helmet and HelmetProvider no-ops for these smoke tests
jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => children,
  HelmetProvider: ({ children }) => children,
}));

// Mock the app's ThemeContext export to avoid importing the real index.js (which mounts the app)
jest.mock('src/index', () => {
  const React = require('react');
  return {
    ThemeContext: React.createContext({ theme: 'dark', toggleTheme: () => {} }),
  };
});

import Home from 'src/pages/Home';
import ProductsPage from 'src/pages/Products';
import ProductPage from 'src/pages/Product';
import CartPage from 'src/pages/Cart';
import CheckoutPage from 'src/pages/Checkout';
import LoginPage from 'src/pages/Login';
import RegisterPage from 'src/pages/Register';
import ProfilePage from 'src/pages/Profile';

const mockProducts = [
  { id: 1, title: 'Phone', description: 'Smart', price: 10, category: 'electronics', image: 'https://example.com/1.jpg', rating: { rate: 4.1, count: 5 } },
  { id: 2, title: 'Ring', description: 'Jewelry', price: 20, category: 'jewelery', image: 'https://example.com/2.jpg', rating: { rate: 3.9, count: 3 } },
];

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (String(url).includes('/products/category/')) {
      return Promise.resolve(new Response(JSON.stringify(mockProducts), { status: 200 }));
    }
    if (String(url).match(/\/products\/?$/)) {
      return Promise.resolve(new Response(JSON.stringify(mockProducts), { status: 200 }));
    }
    if (String(url).match(/\/products\//)) {
      const id = Number(String(url).split('/').pop());
      const prod = mockProducts.find(p => p.id === id) || mockProducts[0];
      return Promise.resolve(new Response(JSON.stringify(prod), { status: 200 }));
    }
    return Promise.resolve(new Response('{}', { status: 200 }));
  });
  window.localStorage.clear();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
});

function withStore(ui, preloadedState) {
  const store = configureStore({ reducer: rootReducers, preloadedState });
  return (
    <HelmetProvider>
      <Provider store={store}>{ui}</Provider>
    </HelmetProvider>
  );
}

describe('Pages smoke', () => {
  test('Home renders and shows Products section', async () => {
    render(withStore(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    ));
    expect(await screen.findByRole('heading', { name: /latest products/i })).toBeInTheDocument();
  });

  test('Products page renders list', async () => {
    render(withStore(
      <MemoryRouter initialEntries={['/product']}>
        <ProductsPage />
      </MemoryRouter>
    ));
    expect(await screen.findByRole('heading', { name: /latest products/i })).toBeInTheDocument();
  });

  test('Product page renders with param and allows add to cart', async () => {
    const storeWrapped = withStore(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );
  render(storeWrapped);
  expect(await screen.findByRole('link', { name: /go to cart/i })).toBeInTheDocument();
  });

  test('Cart renders EmptyCart when no items', () => {
    render(withStore(
      <MemoryRouter initialEntries={['/cart']}>
        <CartPage />
      </MemoryRouter>
    ));
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('Checkout shows EmptyCart when no items', () => {
    render(withStore(
      <MemoryRouter initialEntries={['/checkout']}>
        <CheckoutPage />
      </MemoryRouter>
    ));
    expect(screen.getByText(/no item in cart/i)).toBeInTheDocument();
  });

  test('Register then Login flows write to localStorage', async () => {
    const reg = render(withStore(
      <MemoryRouter initialEntries={['/register']}>
        <RegisterPage />
      </MemoryRouter>
    ));
    await userEvent.type(reg.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(reg.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(reg.getByLabelText(/^password$/i), 'secret');
    await userEvent.click(reg.getByRole('button', { name: /register/i }));

  await cleanup();

    const login = render(withStore(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    ));
    await userEvent.type(login.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(login.getByLabelText(/^password$/i), 'secret');
    await userEvent.click(login.getByRole('button', { name: /login/i }));

    expect(window.localStorage.getItem('isLoggedIn')).toBe('true');
    expect(JSON.parse(window.localStorage.getItem('currentUser'))).toMatchObject({ email: 'test@example.com' });
  });

  test('Profile renders with currentUser data', () => {
    window.localStorage.setItem('currentUser', JSON.stringify({ name: 'Alice', email: 'alice@example.com' }));
    render(withStore(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>
    ));
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });
});
