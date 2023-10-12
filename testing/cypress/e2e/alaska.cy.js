/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Check AK', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-testid="dropdown"]').select('Alaska')
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })
  })
  it('Verify Update Registration', () => {
    // check that state link opens in new tab
    cy.get('[class="usa-link usa-link--external"]').should('have.attr','target','_blank')

    // // check that user CANNOT move forward with out confirming eligibility
    // cy.get('[data-testid="button"]').then(btn => {
    //   cy.get(btn[2]).click()
    // })
    // cy.get('[id="eligibility-error"]').should('be.visible').contains('Both boxes must be checked to continue.')

    // check that user CAN move forward after confirming eligibility
    cy.get('[data-testid="checkbox"]').each(checkbox => {
      cy.get(checkbox).click()
    })
    
    cy.get('[class="usa-button"]').then(btn => {
      cy.pause()

      cy.get(btn[4]).click()
    })
  })
})