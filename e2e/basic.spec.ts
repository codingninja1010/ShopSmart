import { test, expect } from '@playwright/test';

test.describe('ShopSmart basic flows', () => {
  const openNavIfCollapsed = async (page: import('@playwright/test').Page) => {
    const productsLink = page.getByRole('link', { name: /products/i });
    if (!(await productsLink.isVisible())) {
      const toggler = page.getByRole('button', { name: /toggle navigation/i });
      if (await toggler.isVisible()) await toggler.click();
    }
  };

  test('home to products navigation', async ({ page, context }) => {
    // Stub products API to avoid flakiness
    await context.route('**/fakestoreapi.com/products/**', async route => {
      const json = [
        { id: 1, title: 'E2E Product', description: 'desc', price: 10, category: 'electronics', image: 'https://example.com/x.jpg', rating: { rate: 4.2, count: 3 } },
      ];
      await route.fulfill({ json, status: 200, contentType: 'application/json' });
    });

    await page.goto('/');
    await expect(page).toHaveTitle(/ShopSmart/i);
  await openNavIfCollapsed(page);
  await page.getByRole('link', { name: /products/i }).click();
    await expect(page).toHaveURL(/.*\/product/);
    await expect(page.getByRole('heading', { name: /latest products/i })).toBeVisible();
  });

  test('add to cart from products', async ({ page, context }) => {
    await context.route('**/fakestoreapi.com/products/**', async route => {
      const json = [
        { id: 1, title: 'E2E Product', description: 'desc', price: 10, category: 'electronics', image: 'https://example.com/x.jpg', rating: { rate: 4.2, count: 3 } },
      ];
      await route.fulfill({ json, status: 200, contentType: 'application/json' });
    });
    await page.goto('/product');
    const btn = page.getByRole('button', { name: /add to cart/i }).first();
    await btn.click();
    // Navbar may be collapsed on mobile
    await openNavIfCollapsed(page);
    const cartLink = page.getByRole('link', { name: /cart/i });
    await expect(cartLink).toBeVisible();
    await expect(await cartLink.innerText()).toMatch(/\(1\)/);
  });
});
