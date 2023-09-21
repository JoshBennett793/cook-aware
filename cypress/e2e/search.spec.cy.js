/* eslint-disable no-undef */
describe('Search form submission user flow ', () => {
  beforeEach(() => {
    const apiID = Cypress.env('API_ID')
    const apiKey = Cypress.env('API_KEY')

    cy.intercept(
      'GET',
      `https://api.edamam.com/api/recipes/v2?type=public&q=Chicken%20Nuggets&app_id=${apiID}&app_key=${apiKey}`,
      { statusCode: 200, fixture: 'searchRequest.json' }
    ).as('searchRequest')
    cy.visit('http://localhost:5173')
  })

  it('Receives good response status from network request', () => {
    cy.get('input[name=query]').as('search-bar')

    cy.get('form').within(() => {
      cy.get('@search-bar').type('Chicken Nuggets')
      cy.get('button[type=submit]').click()
    })

    cy.wait('@searchRequest').then(interception => {
      expect(interception.response.statusCode, 'Fetch call: ').to.equal(200)
    })
  })
})
