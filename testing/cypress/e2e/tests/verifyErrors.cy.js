/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate Errors', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-testid="dropdown"]').select(data.inPerson)
    cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()
  })
it('Check Error Functions', () => {
// Move forward in test
cy.get('[class="usa-button next-button mobile-width"]').click()
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()
cy.get('[class="usa-checkbox__label"]').click()
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// select registration option
cy.get('[data-testid="button"]').then(btn => {
  cy.get(btn[1]).click()
})

// check errors on personal information are working
//  * testing required fields are filled out before user can move forward
cy.get('[data-testid="textInput"]').then(textBox => {
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'First name must be filled out.')
cy.get(textBox[0]).type(data.personalInformationName)
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'Last name must be filled out.')
cy.get(textBox[2]).type(data.personalInformationLast)
})
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'Date of birth must follow the format of 01 19 2000.')

cy.get('[id="date_of_birth_month"]').type(data.personalInformationMonth)
cy.get('[id="date_of_birth_day"]').type(data.personalInformationDay)
cy.get('[id="date_of_birth_year"]').type(data.personalInformationYear)

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// address and location page
// * check that errors for required fields are working
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
  cy.get('[class="error-text"]').should('contain.text', 'Street address must be filled out.')
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
  cy.get('[class="error-text"]').should('contain.text', 'City name must be filled out.')
  cy.get(textBox[2]).type(data.addressTown)
  cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
  cy.get('[class="error-text"]').should('contain.text', 'Zip code must be 5 digits.')
  cy.get(textBox[3]).type(data.addressZip)
})

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// identification
// * state driver's license number required fields are needed to move forward
cy.get('[class="usa-select"]').select("State driver's license number")
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'ID number must be filled out.')
cy.get('[data-testid="textInput"]').type(data.idNumber)
// * state id number
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'ID number must be filled out.')
cy.get('[data-testid="textInput"]').type(data.idNumber)

// * social security number (last 4 digits)
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number")
})

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'Social security number must be 4 digits.')
cy.get('[data-testid="textInput"]').type(data.ssn)
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// political party 
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'Choice of party must be filled out.')
  cy.get('[data-testid="textInput"]').type(data.politicalParty)
  cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// confirmation page
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()
cy.get('[class="error-text"]').should('contain.text', 'Checkbox must be checked to continue.')
cy.get('[id="acknowledge-check"]').click({force: true})
// * verify that error message goes away
cy.get('[class="error-text text-bold"]').should('not.exist')
})
})
