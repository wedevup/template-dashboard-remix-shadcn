import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the login page before each test
    await page.goto('/login')
  })

  test('should display login form', async ({ page }) => {
    // Check if main elements are visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByText('Enter your credentials to access the dashboard')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  test('should show validation for empty fields', async ({ page }) => {
    // Try to submit without filling fields
    await page.getByRole('button', { name: 'Login' }).click()

    // Check HTML5 validation messages
    const emailInput = page.getByLabel('Email')
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
    expect(validationMessage).toBeTruthy()
  })

  test('should navigate to dashboard after successful login', async ({ page }) => {
    // Fill in the login form
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('password123')

    // Submit the form
    await page.getByRole('button', { name: 'Login' }).click()

    // Check if we're redirected to dashboard
    await expect(page).toHaveURL('/dashboard')
  })
})
