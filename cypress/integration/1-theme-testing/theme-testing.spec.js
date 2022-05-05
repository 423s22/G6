
describe('Testing the store', () => {
    it('Visit our webpage.', () => {
        cy.visit('https://esof-test-store.myshopify.com/password')
            .get('[id=password]').type('naiblo')
            .get('button').click()
    })

    it('Navigate to a product.', () => {
        cy.get('a[href="/products/helmet"]:last').click()
            .get('[id=password]').type('naiblo')
            .get('button').click()
            .get('a[href="/products/helmet"]:last').click()
    })

    it('GET request test.', () => {
        cy.request('https://pricing-options-app.herokuapp.com/api/show-options/7664308912376').as('helmetRequest');
        cy.get('@helmetRequest').then(helmet => {
            expect(helmet.status).to.equal(200);
            assert.isObject(helmet.body, 'Helmet response is an object');
        })
    })

    it('Add product to the cart.', () => {
        cy.get('[class=button]').click()
    })
})
