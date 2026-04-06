import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

test.describe('Consultar Pedido', () => {
    test.beforeEach(async ({ page }) => {
        // Arrange
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    // AAA - Arrange, Act, Assert
    test('deve consultar um pedido aprovado', async ({ page }) => {
        // Test data
        const order = {
            number: 'VLO-SKHHUC',
            status: 'APROVADO',
            color: 'Lunar White',
            wheels: 'sport Wheels',
            customer: {
                name: 'Van Xavier',
                email: 'teste@teste.com',
                store: 'Loja de Retirada',
            },
            payment:  'À Vista'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - img
            - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);
        
        const statusBadge = page.getByTestId('order-result-status')
        await expect(statusBadge).toContainClass('bg-green-100')
        await expect(statusBadge).toContainClass('text-green-700')

        const statusIcon = page.getByTestId('order-result-status').getByRole('img')
        await expect(statusIcon).toContainClass('lucide-circle-check-big')
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {
        // Test data
        const order = {
            number: 'VLO-BKE8FF',
            status: 'REPROVADO',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Van Xavier',
                email: 'teste@teste.com',
                store: 'Loja de Retirada',
            },
            payment:  'À Vista'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - img
            - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);
        
        const statusBadge = page.getByTestId('order-result-status')
        await expect(statusBadge).toContainClass('bg-red-100')
        await expect(statusBadge).toContainClass('text-red-700')

        const statusIcon = page.getByTestId('order-result-status').getByRole('img')
        await expect(statusIcon).toContainClass('lucide-circle-x')
    })

    test('deve consultar um pedido em análise', async ({ page }) => {
        // Test data
        const order = {
            number: 'VLO-C1BTUD',
            status: 'EM_ANALISE',
            color: 'Glacier Blue',
            wheels: 'sport Wheels',
            customer: {
                name: 'João Pauloo',
                email: 'jao@teste.com',
                store: 'Loja de Retirada',
            },
            payment:  'À Vista'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - img
            - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByTestId('order-result-status')
        await expect(statusBadge).toContainClass('bg-amber-100')
        await expect(statusBadge).toContainClass('text-amber-700')
        
        const statusIcon = page.getByTestId('order-result-status').getByRole('img')
        await expect(statusIcon).toContainClass('lucide-clock-icon')
    })

    test('deve exibir mensagem de erro quando o pedido não for encontrado', async ({ page }) => {
        // Test data
        const order = generateOrderCode()

        // Act
        await page.getByTestId('search-order-id').fill(order)
        await page.getByTestId('search-order-button').click()

        // Assert
        // await expect(page.locator('#root')).toContainText('Pedido não encontrado')
        // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')
        const title = page.getByRole('heading', { name: 'Pedido não encontrado' })
        await expect(title).toBeVisible()

        //const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')
        const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
        await expect(message).toBeVisible()

    })
})

