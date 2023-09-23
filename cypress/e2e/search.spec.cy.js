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
    cy.intercept(
      'GET',
      `https://api.edamam.com/api/recipes/v2?type=public&q=Chicken&app_id=${apiID}&app_key=${apiKey}`,
      req => {
        req.reply({
          statusCode: 200,
          fixture: 'searchRequest.json',
          delay: 500
        })
      }
    ).as('delayedRequest')
    cy.visit('http://localhost:5173')
    cy.get('input[name=query]').as('searchBar')
    cy.get('button[type=submit]').as('submitBtn')
  })

  it('User can type in text input', () => {
    cy.get('form').within(() => {
      cy.get('@searchBar').type('Chicken Nuggets')
      cy.get('@searchBar').should('have.value', 'Chicken Nuggets')
    })
  })

  it('Receives good response status from network request', () => {
    cy.get('form').within(() => {
      cy.get('@searchBar').type('Chicken Nuggets')
      cy.get('@submitBtn').click()
    })

    cy.wait('@searchRequest').then(interception => {
      expect(interception.response.statusCode, 'Fetch call: ').to.equal(200)
    })
  })

  it('Shows helpful loading state message until results display', () => {
    cy.get('form').within(() => {
      cy.get('@searchBar').type('Chicken')
      cy.get('@submitBtn').click()
    })
    
    cy.get('.loading-state')
    .should('exist')
    .and('include.text', 'Loading Chicken recipes...')

    cy.wait('@delayedRequest')

    cy.get('loading-state').should('not.exist')
  })

  it('Renders recipe card DOM content after fetch call', () => {
    cy.get('form').within(() => {
      cy.get('@searchBar').type('Chicken Nuggets')
      cy.get('@submitBtn').click()
    })

    cy.wait('@searchRequest').then(() => {
      cy.get('.recipe-card').each(($card, index) => {
        cy.wrap($card).within(() => {
          if (index === 0) {
            cy.get('.recipe-img').should('have.attr', 'src', 'small-img-url')
            cy.get('.recipe-img').should(
              'have.attr',
              'alt',
              "Popeye Tso's Chicken Recipe"
            )

            cy.get('.recipe-label').should('have.text', "Popeye Tso's Chicken")

            cy.get('.recipe-calories').should('include.text', 507)
            cy.get('.recipe-calories').should('include.text', 'Calories')

            cy.get('.divider').should('have.text', '|')

            cy.get('.recipe-ingredients-num').should('include.text', 14)
            cy.get('.recipe-ingredients-num').should(
              'include.text',
              'Ingredients'
            )
          } else if (index === 1) {
            cy.get('.recipe-img').should('have.attr', 'src', 'small-img-url')
            cy.get('.recipe-img').should(
              'have.attr',
              'alt',
              'Grilled Chicken Nuggets Recipe'
            )

            cy.get('.recipe-label').should(
              'have.text',
              'Grilled Chicken Nuggets'
            )

            cy.get('.recipe-calories').should('include.text', 311)
            cy.get('.recipe-calories').should('include.text', 'Calories')

            cy.get('.divider').should('have.text', '|')

            cy.get('.recipe-ingredients-num').should('include.text', 7)
            cy.get('.recipe-ingredients-num').should(
              'include.text',
              'Ingredients'
            )
          }
        })
      })
    })
  })
})

describe('Error handling', () => {
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
      `https://api.edamam.com/api/recipes/v2?type=public&q=qwertyuiop&app_id=${apiID}&app_key=${apiKey}`,
      { statusCode: 200, fixture: 'emptyResults.json' }
    ).as('emptyResults')
    cy.visit('http://localhost:5173')
    cy.get('input[name=query]').as('searchBar')
    cy.get('button[type=submit]').as('submitBtn')
  })

  it('Prevents user from searching for a keyword that contains symbols', () => {
    cy.get('form').within(() => {
      cy.get('@searchBar').type('gibberish!@#$')
      cy.get('@submitBtn').click()

      cy.contains('The search keyword may only contain letters and numbers')
    })
  })

  it('Prevents user from submitting blank form', () => {
    cy.get('form').within(() => {
      cy.get('@submitBtn').click()

      cy.get('.err-msg')
        .should('exist')
        .and('include.text', 'The search query cannot be blank')
    })
  })

  it('Error message goes away if user re-searches for valid query', () => {
    cy.get('form').within(() => {
      cy.get('@searchBar').type('gibberish!@#$')
      cy.get('@submitBtn').click()

      cy.get('.err-msg')
        .should('exist')
        .and(
          'include.text',
          'The search keyword may only contain letters and numbers'
        )
    })

    cy.get('form').within(() => {
      cy.get('@searchBar').clear()
      cy.get('@searchBar').type('Chicken Nuggets')
      cy.get('@submitBtn').click()

      cy.wait('@searchRequest').then(() => {
        cy.get('.err-msg').should('not.exist')
      })
    })
  })

  it('Shows helpful message if results come back empty', () => {
    cy.get('form').within(() => {
      cy.get('@searchBar').type('qwertyuiop')
      cy.get('@submitBtn').click()
    })
    cy.wait('@emptyResults').then(() => {
      cy.get('.err-msg')
        .should('exist')
        .and(
          'include.text',
          'Your search did not produce any results. Please try a different search'
        )
    })
  })
})
