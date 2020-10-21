/// <reference types="Cypress" />

describe('default behavior', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('can escape the trap by pressing esc', () => {
    cy.get('#basic .trap')
      .should('not.have.class', 'is-active')
      .get('#basic > p > button')
      .click()
      .get('#basic .trap')
      .should('have.class', 'is-active')
      .focused()
      .should('have.class', 'trap')
      .type('{esc}')
      .focused()
      .should('not.have.class', 'trap')
      .get('#basic .trap')
      .should('not.have.class', 'is-active')
  })

  it('can escape the trap by using the button', () => {
    cy.get('#basic .trap')
      .get('#basic > p > button')
      .click()
      .get('#basic .trap')
      .should('have.class', 'is-active')
      .get('#basic .trap button')
      .click()
      .focused()
      .should('not.have.class', 'trap')
      .get('#basic .trap')
      .should('not.have.class', 'is-active')
  })

  it('can escape the trap by clicking outside of the bounds of the focus trap', () => {
    cy.get('#ocd .trap')
      .get('#ocd > p > button')
      .click()
      .get('#ocd .trap')
      .should('have.class', 'is-active')
      .get('body')
      .click()
      .focused()
      .should('not.have.class', 'trap')
      .get('#ocd .trap')
      .should('not.have.class', 'is-active')
  })
})
