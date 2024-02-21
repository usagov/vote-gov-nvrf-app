/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate Not Needed', () => {
  beforeEach('login to app', () => {
    cy.visit('/')
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-test="dropDown"]').select(data.notNeeded)
  })
  it('Validate Workflow', () => {
    cy.get('[data-test="nextBtn"]').click()

    // Validate that state selections takes you to the not needed page
    cy.get('h1').should('contain', 'does not require voter registration before voting')

    // Validate that external links open in new tab
    cy.get('[class="usa-button"]').then(link => {
      expect(link[1]).to.have.attr('target','_blank')
    })
  })
})