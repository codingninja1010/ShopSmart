import { test, expect } from '@playwright/test';

const unique = () => Math.random().toString(36).slice(2, 8);

test.describe('Auth demo flows', () => {
  test('register then login shows profile', async ({ page }) => {
    const email = `user_${unique()}@example.com`;
    const name = `User ${unique()}`;
    const password = 'secret123';

    // Register
    await page.goto('/register');
    await page.getByLabel('Full Name').fill(name);
    await page.getByLabel('Email address').fill(email);
    await page.getByLabel('Password').fill(password);
    page.on('dialog', d => d.accept());
    await page.getByRole('button', { name: /register/i }).click();

    // Should redirect to profile
    await expect(page).toHaveURL(/.*\/profile/);
    await expect(page.getByText(name)).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();

  // Logout via navbar then login (handle collapsed navbar)
  let toggler = page.getByRole('button', { name: /toggle navigation/i });
  if (await toggler.isVisible()) await toggler.click();
  await page.getByRole('button', { name: /logout/i }).click();
  // Logout triggers a hard navigation to '/'; wait for it to complete
  await page.waitForURL('**/');
  // Re-query DOM after navigation
  toggler = page.getByRole('button', { name: /toggle navigation/i });
  if (await toggler.isVisible()) {
    await toggler.click();
    // Ensure the collapsible menu content is visible
    await expect(page.getByRole('navigation')).toBeVisible();
  }
  const loginLink = page.getByRole('link', { name: /login/i });
  if (await loginLink.count()) {
    await loginLink.first().click();
  } else {
    // Fallback on mobile where the link may not be accessible due to collapse state
    await page.goto('/login');
  }

    await page.getByLabel('Email address').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(/.*\/profile/);
    await expect(page.getByText(email)).toBeVisible();
  });
});
