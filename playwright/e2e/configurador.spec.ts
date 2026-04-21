import { test } from '../support/fixtures'

test.describe('Configurador', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.openConfigurator()
  })

  test('Configurador: alterar cor não muda o preço', async ({ app }) => {
    await app.configurator.selectExteriorColor('Midnight Black')
    await app.configurator.expectTotalPriceToBe('R$ 40.000,00')
    await app.configurator.expectCarImageSrc('/src/assets/midnight-black-aero-wheels.png')
  })

  test('Configurador: rodas sport adiciona valor e aero volta ao base', async ({ app }) => {
    await app.configurator.selectWheels('Sport Wheels')
    await app.configurator.expectTotalPriceToBe('R$ 42.000,00')
    await app.configurator.expectCarImageSrc('/src/assets/glacier-blue-sport-wheels.png')

    await app.configurator.selectWheels('Aero Wheels')
    await app.configurator.expectTotalPriceToBe('R$ 40.000,00')
    await app.configurator.expectCarImageSrc('/src/assets/glacier-blue-aero-wheels.png')
  })

  test('Configurador: incluir opcionais adiciona valor', async ({ app }) => {
    await app.configurator.selectOptional('Precision Park')
    await app.configurator.expectTotalPriceToBe('R$ 45.500,00')

    await app.configurator.selectOptional('Flux Capacitor')
    await app.configurator.expectTotalPriceToBe('R$ 50.500,00')
  })

  test('Configurador: ao clicar em \"Monte o Seu\" redireciona para finalizar pedido', async ({ app }) => {
    await app.configurator.goToCheckout()
  })
})

