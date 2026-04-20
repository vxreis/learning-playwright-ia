import { test, expect } from '../support/fixtures'
import type { Page } from '@playwright/test'

test('webappp deve estar online', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await expect(page).toHaveTitle(/Velô by Papito/)
})
