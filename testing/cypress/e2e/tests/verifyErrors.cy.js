/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate Errors', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    // cy.get('[data-test="dropDown"]').select(data.inPerson)
    // cy.get('[data-test="nextBtn"]').click()
  })
it('Check Error Functions', () => {
// Move forward in test
cy.get('[data-test="nextBtn"]').click()
cy.get('[data-test="nextBtn"]').click()
cy.get('[data-test="checkBox"]').click()
cy.get('[data-test="nextBtn"]').click()

// select registration option
cy.get('[data-test="pathBtn"]').then(btn => {
  cy.get(btn[1]).click()
})

// check errors on personal information are working
//  * testing required fields are filled out before user can move forward
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'First name must be filled out.')
cy.get('[data-test="firstName"]').type(data.personalInformationName)
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'Last name must be filled out.')
cy.get('[data-test="lastName"]').type(data.personalInformationLast)

cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'Date of birth must follow the format of 01 19 2000.')

cy.get('[data-test="dobMonth"]').type(data.personalInformationMonth)
cy.get('[data-test="dobDay"]').type(data.personalInformationDay)
cy.get('[data-test="dobYear"]').type(data.personalInformationYear)

cy.get('[data-test="nextBtn"]').click()

// address and location page
// * check that errors for required fields are working
  cy.get('[data-test="nextBtn"]').click().click()
  cy.get('[data-test="errorText"]').should('contain.text', 'Street address must be filled out.')
  cy.get('[data-test="street"]').type(data.addressStreet)
  cy.get('[data-test="nextBtn"]').click().click()
  cy.get('[data-test="errorText"]').should('contain.text', 'City name must be filled out.')
  cy.get('[data-test="city"]').type(data.addressTown)
  cy.get('[data-test="nextBtn"]').click().click()
  cy.get('[data-test="errorText"]').should('contain.text', 'ZIP code must be 5 digits.')
  cy.get('[data-test="zip"]').type(data.addressZip)

cy.get('[data-test="nextBtn"]').click()

// identification
// * state driver's license number required fields are needed to move forward
cy.get('[data-test="dropDown"]').select("State driver's license number")
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'ID number must be filled out.')
cy.get('[data-test="driverId"]').type(data.idNumber)
// * state id number
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'ID number must be filled out.')
cy.get('[data-test="stateId"]').type(data.idNumber)

// * social security number (last 4 digits)
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number (last 4 digits)")
})

cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('contain.text', 'Social security number must be 4 digits.')
cy.get('[data-test="ssn"]').type(data.ssn)
cy.get('[data-test="nextBtn"]').click()

// political party 
  cy.get('[data-test="nextBtn"]').click()

// confirmation page
cy.get('[data-test="nextBtn"]').click()
cy.get('[data-test="errorText"]').should('contain.text', 'Checkbox must be checked to continue.')
cy.get('[data-test="confirm"]').click({force: true})
})
})
