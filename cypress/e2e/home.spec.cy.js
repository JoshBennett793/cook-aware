/* eslint-disable no-undef */
describe('Home page DOM content', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('Renders semantic heading', () => {
    cy.get('.app-name-heading')
      .should('have.prop', 'tagName', 'H1')
      .and('include.text', 'Cook Aware')
  })

  it('Renders properly structured form', () => {
    cy.get('.query-input-label')
      .should('exist')
      .and('have.prop', 'ariaLabel', 'Search input')

    cy.get('#queryInput')
      .should('exist')
      .and('have.prop', 'placeholder', 'Search by keyword...')

    cy.get('button[type=submit]')
      .should('exist')
      .and('include.text', 'Search')
    
    cy.get('.recipe-heading')
      .should('exist')
      .and('include.text', 'Recipes')
  })
})
