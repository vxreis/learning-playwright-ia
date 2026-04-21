import { expect, type Page } from '@playwright/test'

export function createConfiguratorActions(page: Page) {

  return {
    async openConfigurator() {
      await page.goto('/configure')
      await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
    },

    async selectExteriorColor(label: string) {
      await page.getByRole('button', { name: label }).click()
    },

    async selectWheels(wheels: string) {
      await page.getByRole('button', { name: new RegExp(wheels, 'i') }).click()
    },

    async selectOptional(optional: string) {
      const checkbox = page.getByRole('checkbox', { name: new RegExp(optional, 'i') })
      await expect(checkbox).toBeVisible()
      await checkbox.check()
      await expect(checkbox).toBeChecked()
    },

    async expectTotalPriceToBe(price: string) {
      const totalPrice = page.getByTestId('total-price')
      await expect(totalPrice).toBeVisible()
      await expect(totalPrice).toHaveText(price)
    },

    async expectCarImageSrc(src: string) {
      const exteriorImage = page.getByTestId('car-exterior-image')
      await expect(exteriorImage).toBeVisible()
      const carImage = page.locator('img[alt^="Velô Sprint"]')
      await expect(carImage).toHaveAttribute('src', src)
    },

    async goToCheckout() {
      const checkoutButton = page.getByTestId('checkout-button')
      await expect(checkoutButton).toBeEnabled()
      await checkoutButton.click()
      await expect(page).toHaveURL(/\/order$/)
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },
  }
}

