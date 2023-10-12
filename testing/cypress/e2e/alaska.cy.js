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

    // check that user CANNOT move forward with out confirming eligibility
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[2]).click()
    })
    cy.get('[id="eligibility-error"]').should('be.visible').contains('Both boxes must be checked to continue.')

    // check that user CAN move forward after confirming eligibility
    cy.get('[data-testid="checkbox"]').each(checkbox => {
      cy.get(checkbox).click()
    })
    
    // ! come back to fix this
    // cy.get('[class="usa-button"]').then(btn => {
      
      //   cy.get(btn[4]).click()
      // })
      
      // select the update registration option 
      
        cy.pause()
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[2]).click()
    })

    // fill out personal information 
    cy.get('[data-testid="dropdown"]').then(dropdown => {
      // title
      cy.get(dropdown[0]).select('Mr.')
      cy.get(dropdown[0]).should('contain', 'Mr.')
      // suffix
      cy.get(dropdown[1]).select('IV')
      cy.get(dropdown[1]).should('contain', 'IV')
    })

    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[0]).type('John')
      cy.get(textBox[1]).type('Middle Name')
      cy.get(textBox[2]).type('Doe')
      cy.get(textBox[3]).type('5555555555')
      // verify text box has correct text
      cy.get(textBox[0]).should('have.value', 'John')
      cy.get(textBox[1]).should('have.value', 'Middle Name')  
      cy.get(textBox[2]).should('have.value', 'Doe')
      cy.get(textBox[3]).should('have.value', '(555) 555-5555')
    })

    cy.get('[id="date_of_birth_month"]').select('01 - January')
    cy.get('[id="date_of_birth_day"]').type('01')
    cy.get('[id="date_of_birth_year"]').type('1990')

    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // address and location page
    // * check that rural option takes away options
    cy.get('[data-testid="checkbox"]').click()
    cy.get('[data-testid="form"]').should('not.contain', 'Home Address')
    // * uncheck option
    cy.get('[data-testid="checkbox"]').click()

  })
})