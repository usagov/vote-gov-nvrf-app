/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Check ND', () => {
  beforeEach('login to app', () => {
    cy.visit('/')
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-testid="dropdown"]').select('North Dakota')
  })
  it('Verify Workflow', () => {
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })
    // verify that state selections takes you to the not needed page 
    cy.get('[id="root"]').should('contain', 'does not have voter registration.')

    // verify that external links open in new tab
    cy.get('[class="usa-link usa-link--external"]').each(link => {
      expect(link).to.have.attr('target','_blank')
    })
  })
})