/* eslint-disable no-undef */
describe('Single Recipe Detail Component', () => {
  beforeEach(() => {
    const apiID = Cypress.env('API_ID')
    const apiKey = Cypress.env('API_KEY')

    cy.intercept(
      'GET',
      `https://api.edamam.com/api/recipes/v2?type=public&q=Chicken%20Nuggets&app_id=${apiID}&app_key=${apiKey}`,
      { statusCode: 200, fixture: 'searchRequest.json' }
    )

    cy.intercept(
      'GET',
      `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_b5e1c34c9042a35a534069f438ec86f&app_id=${apiID}&app_key=${apiKey}`,
      { statusCode: 200, fixture: 'searchRequest.json' }
    )

    cy.visit('http://localhost:5173/recipes/Chicken%20Nuggets')
    cy.get('.results-container').children().first().find('.recipe-img').click()
  })

  it('Should display the correct recipe title', () => {
    cy.get('.recipe-detail-label')
      .should('be.visible')
      .and('include.text', "Popeye Tso's Chicken Recipe")
  })

  it('Should display the correct image source and alt text', () => {
    cy.get('.recipe-detail-img')
      .should('be.visible')
      .and('have.attr', 'src', 'thumbnail-img-url')
      .and('have.attr', 'alt', "Popeye Tso's Chicken Recipe")
  })

  it("Should have a link to the recipe's source", () => {
    cy.get('.recipe-link')
      .should('be.visible')
      .and('have.text', 'Serious Eats')
      .and(
        'have.attr',
        'href',
        'http://www.seriouseats.com/recipes/2011/10/popeye-tsos-chicken-general-tsos-chicken-made-with-popeyes-chicken-nuggets-recipe.html'
      )
  })

  it('Should display the "See full recipe on:" text', () => {
    cy.get('.full-recipe-link')
      .should('be.visible')
      .and('include.text', 'See full recipe on:')
  })

  it('Should display the correct number of ingredients', () => {
    cy.get('.recipe-detail-ingredients h3')
      .should('be.visible')
      .and('include.text', '14 Ingredients')
  })

  it('Should display a list of ingredients with checkboxes', () => {
    cy.get('.ingredients-list')
      .should('be.visible')
      .within(() => {
        cy.get('li').should('include.lengthOf', 14)

        cy.get('li')
          .eq(0)
          .should('include.text', '1/4 cup low sodium chicken stock')
          .find('input')
          .should('not.be.checked')

        cy.get('li')
          .eq(13)
          .should('include.text', '3 scallion greens, sliced')
          .find('input')
          .should('not.be.checked')
      })
  })

  it('Should display the correct Nutrition section title', () => {
    cy.get('.recipe-detail-nutrition h3')
      .should('be.visible')
      .and('include.text', 'Nutrition')
  })

  it('Should display the correct calorie information', () => {
    cy.get('.calories')
      .should('be.visible')
      .and('include.text', '507CAL/SERV')
  })

  it('Should display the correct daily value percentage', () => {
    cy.get('.calories-daily-value')
      .should('be.visible')
      .and('include.text', '101 %DAILY VALUE')
  })

  it('Should display the correct health labels', () => {
    cy.get('.recipe-detail-health-labels')
      .should('be.visible')
      .and(
        'include.text',
        'Dairy-Free, Egg-Free, Peanut-Free, Tree-Nut-Free, Fish-Free, Pork-Free, Crustacean-Free, Celery-Free, Mustard-Free, Lupine-Free, Mollusk-Free, Alcohol-Free, Kosher'
      )
  })

  it('Should display the correct column titles', () => {
    cy.get('.column-titles')
      .should('be.visible')
      .and('include.text', 'Macro')
      .and('include.text', 'Amount')
      .and('include.text', 'D/V')
  })

  it('Should display the correct macro information', () => {
    cy.get('.fat-macros')
      .should('be.visible')
      .within(() => {
        cy.get('.macro-grid')
          .eq(0)
          .should('include.text', 'Fat')
          .and('include.text', '80g')
          .and('include.text', '123%')
        cy.get('.macro-grid')
          .eq(4)
          .should('include.text', 'Polyunsaturated')
          .should('include.text', '32g')
      })
  })

  it('Should display the correct carbohydrate information', () => {
    cy.get('.carb-macros')
      .should('be.visible')
      .within(() => {
        cy.get('.macro-grid')
          .eq(0)
          .should('include.text', 'Carbs')
          .should('include.text', '243g')
          .should('include.text', '81%')
        cy.get('.macro-grid')
          .eq(4)
          .should('include.text', 'Sugars, added')
          .should('include.text', '37g')
      })
  })

  it('Should display the correct remaining macro information', () => {
    cy.get('.remaining-macros')
      .should('be.visible')
      .within(() => {
        cy.get('.macro-grid')
          .eq(0)
          .should('include.text', 'Protein')
          .should('include.text', '91g')
          .should('include.text', '181%')
        cy.get('.macro-grid')
          .eq(11)
          .should('include.text', 'Thiamin (B1)')
          .should('include.text', '1mg')
          .should('include.text', '117%')
        cy.get('.macro-grid')
          .eq(22)
          .should('include.text', 'Water')
          .should('include.text', '1119g')
      })
  })
})
