/* eslint-disable no-undef */
describe('Route handling', () => {
  beforeEach(() => {
    const apiID = Cypress.env('API_ID')
    const apiKey = Cypress.env('API_KEY')

    cy.intercept(
      'GET',
      `https://api.edamam.com/api/recipes/v2?type=public&q=Chicken%20Nuggets&app_id=${apiID}&app_key=${apiKey}`,
      { statusCode: 200, fixture: 'searchRequest.json' }
    ).as('searchRequest')

    cy.visit('http://localhost:5173/')
    cy.get('input[name=query]').as('searchBar')
    cy.get('button[type=submit]').as('submitBtn')
  })

  it('Manually navigates user to all results url for specific query', () => {
    cy.url().should('eq', 'http://localhost:5173/')

    cy.get('form').within(() => {
      cy.get('@searchBar').type('Chicken Nuggets')
      cy.get('@submitBtn').click()
    })

    cy.wait('@searchRequest').then(() => {
      cy.url().should('eq', 'http://localhost:5173/recipes/Chicken%20Nuggets')
    })
  })
})
