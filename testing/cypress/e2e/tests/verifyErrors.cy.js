/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate Errors', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-test="dropDown"]').select(data.inPerson)
    cy.get('[data-test="nextBtn"]').click()
  })
it('Check Error Functions', () => {
// Move forward in test
cy.get('[data-test="nextBtn"]').click()
cy.get('[data-test="nextBtn"]').click()
cy.get('[data-test="checkBox"]').click()
cy.get('[data-test="nextBtn"]').click()

// select registration option
cy.get('[data-testid="button"]').then(btn => {
  cy.get(btn[1]).click()
})

// check errors on personal information are working
//  * testing required fields are filled out before user can move forward
cy.get('[data-testid="textInput"]').then(textBox => {
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'First name must be filled out.')
cy.get(textBox[0]).type(data.personalInformationName)
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'Last name must be filled out.')
cy.get(textBox[2]).type(data.personalInformationLast)
})
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'Date of birth must follow the format of 01 19 2000.')

cy.get('[id="date_of_birth_month"]').type(data.personalInformationMonth)
cy.get('[id="date_of_birth_day"]').type(data.personalInformationDay)
cy.get('[id="date_of_birth_year"]').type(data.personalInformationYear)

cy.get('[data-test="nextBtn"]').click()

// address and location page
// * check that errors for required fields are working
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get('[data-test="nextBtn"]').click().click()
  cy.get('[data-test="errorText"]').should('contain.text', 'Street address must be filled out.')
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get('[data-test="nextBtn"]').click().click()
  cy.get('[data-test="errorText"]').should('contain.text', 'City name must be filled out.')
  cy.get(textBox[2]).type(data.addressTown)
  cy.get('[data-test="nextBtn"]').click().click()
  cy.get('[data-test="errorText"]').should('contain.text', 'Zip code must be 5 digits.')
  cy.get(textBox[3]).type(data.addressZip)
})

cy.get('[data-test="nextBtn"]').click()

// identification
// * state driver's license number required fields are needed to move forward
cy.get('[data-test="dropDown"]').select("State driver's license number")
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'ID number must be filled out.')
cy.get('[data-testid="textInput"]').type(data.idNumber)
// * state id number
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'ID number must be filled out.')
cy.get('[data-testid="textInput"]').type(data.idNumber)

// * social security number (last 4 digits)
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number (last 4 digits)")
})

cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'Social security number must be 4 digits.')
cy.get('[data-testid="textInput"]').type(data.ssn)
cy.get('[data-test="nextBtn"]').click()

// political party 
  cy.get('[data-test="nextBtn"]').click()

// confirmation page
cy.get('[data-test="nextBtn"]').click()
cy.get('[data-test="errorText"]').should('contain.text', 'Checkbox must be checked to continue.')
cy.get('[data-test="confirm"]').click({force: true})
// * verify that error message goes away
// todo: come back when fixed
cy.get('[data-test="errorText"]').should('not.exist')
})
})
