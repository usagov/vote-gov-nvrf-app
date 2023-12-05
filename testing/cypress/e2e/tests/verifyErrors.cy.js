/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate Errors', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-testid="dropdown"]').select(data.inPerson)
    cy.get('[class="usa-button next-button margin-top-5"]').click()
  })
it('Check Error Functions', () => {
// Move forward in test
cy.get('[class="usa-button next-button margin-top-5"]').click()
cy.get('[class="usa-button next-button margin-top-5"]').click()
cy.get('[class="usa-checkbox__label"]').click()
cy.get('[class="usa-button next-button margin-top-5"]').click()

// select registration option
cy.get('[data-testid="button"]').then(btn => {
  cy.get(btn[1]).click()
})

// check errors on personal information are working
//  * testing required fields are filled out before user can move forward
cy.get('[data-testid="textInput"]').then(textBox => {
cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'First name must be filled out.')
cy.get(textBox[0]).type(data.personalInformationName)
cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'Last name must be filled out.')
cy.get(textBox[2]).type(data.personalInformationLast)
})
cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text text-bold"]').should('contain.text', 'Date of Birth must follow the format of 01 19 2000.')

cy.get('[id="date_of_birth_month"]').type(data.personalInformationMonth)
cy.get('[id="date_of_birth_day"]').type(data.personalInformationDay)
cy.get('[id="date_of_birth_year"]').type(data.personalInformationYear)

cy.get('[class="usa-button next-button margin-top-5"]').click()

// address and location page
// * check that errors for required fields are working
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get('[class="usa-button next-button margin-top-5"]').click().click()
  cy.get('[class="error-text"]').should('contain.text', 'Street Address must be filled out.')
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get('[class="usa-button next-button margin-top-5"]').click().click()
  cy.get('[class="error-text"]').should('contain.text', 'City name must be filled out.')
  cy.get(textBox[2]).type(data.addressTown)
  cy.get('[class="usa-button next-button margin-top-5"]').click().click()
  cy.get('[class="error-text text-bold"]').should('contain.text', 'Zip Code must be 5 digits.')
  cy.get(textBox[3]).type(data.addressZip)
})

cy.get('[class="usa-button next-button margin-top-5"]').click()

// identification
// * state driver's license number required fields are needed to move forward
cy.get('[class="usa-select"]').select("State Driver's License Number")
cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'ID number must be filled out.')
cy.get('[data-testid="textInput"]').type(data.idNumber)
cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text text-bold"]').should('contain.text', 'Issue Date must follow the format of January 19 2000.')
cy.get('[id="id_issue_date_month"]').type(data.idMonth)
cy.get('[id="id_issue_date_day"]').type(data.idDay)
cy.get('[id="id_issue_date_year"]').type(data.idYear)
cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text text-bold"]').should('contain.text', 'Expire Date must follow the format of January 19 2000 and be in the future.')
cy.get('[id="id_expire_date_month"]').type(data.idMonth)
cy.get('[id="id_expire_date_day"]').type(data.idExpireDay)
cy.get('[id="id_expire_date_year"]').type(data.idExpireYear)
// * state id number
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("State Identification Number")
})
cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('contain.text', 'ID number must be filled out.')
cy.get('[data-testid="textInput"]').type(data.idNumber)

// * social security number (last 4 digits)
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social Security Number")
})

cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text text-bold"]').should('contain.text', 'Social Security Number must be 4 digits.')
cy.get('[data-testid="textInput"]').type(data.ssn)
cy.get('[class="usa-button next-button margin-top-5"]').click()

// political party 
cy.get('[class="usa-button next-button margin-top-5"]').click().click()
cy.get('[class="error-text text-bold"]').should('contain.text', 'Choice of party must be filled out.')
  cy.get('[data-testid="textInput"]').type(data.politicalParty)
  cy.get('[class="usa-button next-button margin-top-5"]').click()

// confirmation page
cy.get('[class="usa-button next-button margin-top-5"]').click()
cy.get('[class="error-text text-bold"]').should('contain.text', 'Checkbox must be checked to continue.')
cy.get('[id="acknowledge-check"]').click({force: true})
// * verify that error message goes away
cy.get('[class="error-text text-bold"]').should('not.exist')
})
})
