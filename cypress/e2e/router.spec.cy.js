/* eslint-disable no-undef */
describe('Route Handling', () => {
  beforeEach(() => {
    const apiID = Cypress.env('API_ID')
    const apiKey = Cypress.env('API_KEY')

    cy.intercept(
      'GET',
      `https://api.edamam.com/api/recipes/v2?type=public&q=Chicken%20Nuggets&app_id=${apiID}&app_key=${apiKey}`,
      { statusCode: 200, fixture: 'searchRequest.json' }
    ).as('searchRequest')

    cy.intercept(
      'GET',
      `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_b5e1c34c9042a35a534069f438ec86f&app_id=${apiID}&app_key=${apiKey}`,
      { statusCode: 200, fixture: 'searchRequest.json' }
    ).as('recipeDetailRequest')

    cy.visit('http://localhost:5173/')
    cy.get('input[name=query]').as('searchBar')
    cy.get('button[type=submit]').as('submitBtn')
  })

  it('Navigates user to all results url for specific query', () => {
    cy.url().should('eq', 'http://localhost:5173/')

    cy.get('form').within(() => {
      cy.get('@searchBar').type('Chicken Nuggets')
      cy.get('@submitBtn').click()
    })

    cy.wait('@searchRequest').then(() => {
      cy.url().should('eq', 'http://localhost:5173/recipes/Chicken%20Nuggets')
    })
  })

  it('Navigate user to unique url for the single recipe details page', () => {
    cy.get('form').within(() => {
      cy.get('@searchBar').type('Chicken Nuggets')
      cy.get('@submitBtn').click()
    })

    cy.wait('@searchRequest').then(() => {
      cy.url().should('eq', 'http://localhost:5173/recipes/Chicken%20Nuggets')
    })

    cy.get('.results-container').children().first().find('.recipe-img').click()
    cy.wait('@recipeDetailRequest').then(() => {
      cy.url().should(
        'eq',
        'http://localhost:5173/recipe/http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_b5e1c34c9042a35a534069f438ec86f'
      )
    })
  })
})

describe('Bad Route Handling', () => {
  it("Provides helpful message if user navigates to path that doesn't exist", () => {
    cy.visit('http://localhost:5173/gibberish')
    cy.contains(
      "We couldn't find anything here. Please try searching for a valid keyword."
    )
  })
})
