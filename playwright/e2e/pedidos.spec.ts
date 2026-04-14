import { test } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { OrderLockupPage } from '../support/pages/orderLockupPage'
import { NavbarComponent } from '../support/components/navbarComponent'
import { LandingPage } from '../support/pages/landingPage'

test.describe('Consulta de Pedido', () => {

    let orderLockupPage: OrderLockupPage

    test.beforeEach(async ({ page }) => {

        await new LandingPage(page).open()
        await new NavbarComponent(page).goToOrderLookup()
        orderLockupPage = new OrderLockupPage(page)
        orderLockupPage.validatePageLoaded()
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        const order = {
            number: 'VLO-SKHHUC',
            status: 'APROVADO' as const,
            color: 'Lunar White',
            wheels: 'sport Wheels',
            customer: {
                name: 'Van Xavier',
                email: 'teste@teste.com'
            },
            payment: 'À Vista'
        }

        await orderLockupPage.searchOrder(order.number)

        await orderLockupPage.validateOrderDatail(order)
        await orderLockupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        const order = {
            number: 'VLO-BKE8FF',
            status: 'REPROVADO' as const,
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Van Xavier',
                email: 'teste@teste.com'
            },
            payment: 'À Vista'
        }

        await orderLockupPage.searchOrder(order.number)

        await orderLockupPage.validateOrderDatail(order)
        await orderLockupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido em analise', async ({ page }) => {

        const order = {
            number: 'VLO-C1BTUD',
            status: 'EM_ANALISE' as const,
            color: 'Glacier Blue',
            wheels: 'sport Wheels',
            customer: {
                name: 'João Pauloo',
                email: 'jao@teste.com'
            },
            payment: 'À Vista'
        }

        await orderLockupPage.searchOrder(order.number)

        await orderLockupPage.validateOrderDatail(order)
        await orderLockupPage.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

        const order = generateOrderCode()

        await orderLockupPage.searchOrder(order)

        await orderLockupPage.validateOrderNotFound()
    })
})