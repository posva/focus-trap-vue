/// <reference types="Cypress" />

function assertDeactivatedTrap(id) {
  cy.focused()
    .should('not.have.class', 'trap')
    .get(`${id} .trap`)
    .should('not.have.class', 'is-active')
}

function activateTrapWithButton(id) {
  cy.get(`${id} .trap`)
    .should('not.have.class', 'is-active')
    .get(`${id} > p > button`)
    .click()
}

function assertActivatedTrap(id) {
  cy.get(`${id} .trap`).should('have.class', 'is-active')
}

describe('focus trap vue', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('default behavior', () => {
    it('can escape the trap by pressing esc', () => {
      activateTrapWithButton('#basic')
      assertActivatedTrap('#basic')
      cy.focused().should('have.class', 'trap').type('{esc}')

      assertDeactivatedTrap('#basic')
    })

    it('can escape the trap by using the button', () => {
      activateTrapWithButton('#basic')
      assertActivatedTrap('#basic')

      cy.get(`#basic > p > button`)
        .click()
        .get(`#basic .trap`)
        .should('have.class', 'is-active')
        .get(`#basic .trap button`)
        .click()

      assertDeactivatedTrap('#basic')
    })
  })

  describe('With Transitioning Element', () => {
    it('should activate/deactivate trap', () => {
      cy.get(`#vif .trap`).should('not.exist').get(`#vif > p > button`).click()
      assertActivatedTrap('#vif')
      cy.get(`#vif > p > button`)
        .click()
        .get(`#vif .trap`)
        .should('have.class', 'is-active')
        .get(`#vif .trap button`)
        .click()
      cy.focused()
        .should('not.have.class', 'trap')
        .get(`#vif .trap`)
        .should('not.exist')
    })
  })

  describe('Initial Focus / No escape', () => {
    it('should activate with initial focus', () => {
      activateTrapWithButton('#iene')
      assertActivatedTrap('#iene')
      cy.focused().should($el => {
        expect($el.is('input')).to.be.true
      })
      cy.get(`#iene > p > button`)
        .click()
        .get(`#iene .trap`)
        .should('have.class', 'is-active')
        .get(`#iene .trap button`)
        .click()
      assertDeactivatedTrap('#iene')
    })

    it('should prevent escape', () => {
      activateTrapWithButton('#iene')
      assertActivatedTrap('#iene')
      cy.focused().type('{esc}')
      assertActivatedTrap('#iene')
    })
  })

  describe('Outside clicks deactivates', () => {
    it('can escape the trap by clicking outside of the bounds of the focus trap', () => {
      activateTrapWithButton('#ocd')
      assertActivatedTrap('#ocd')
      cy.get('body').click()
      assertDeactivatedTrap('#ocd')
    })
  })
})
