import { expect, test } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'

test.describe('Consulta de Pedido', () => {

    test.beforeEach(async ({ app }) => {
        await app.orderLookup.openOrderLookup()
    })

    test('deve consultar um pedido aprovado', async ({ app }) => {

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

        await app.orderLookup.searchOrder(order.number)
        await app.orderLookup.validateOrderDatail(order)
        await app.orderLookup.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido reprovado', async ({ app }) => {

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

        await app.orderLookup.searchOrder(order.number)
        await app.orderLookup.validateOrderDatail(order)
        await app.orderLookup.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido em analise', async ({ app }) => {

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

        await app.orderLookup.searchOrder(order.number)
        await app.orderLookup.validateOrderDatail(order)
        await app.orderLookup.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {

        const order = generateOrderCode()

        await app.orderLookup.searchOrder(order)
        await app.orderLookup.validateOrderNotFound()
    })

    test('deve exibir manter o botão de busca desabilitado com campo vazio ou apenas espaços', async ({ app }) => {

        const button = app.orderLookup.elements.searchButton
        await expect(button).toBeDisabled()

        await app.orderLookup.elements.orderInput.fill('      ')
        await expect(button).toBeDisabled()
    })
})