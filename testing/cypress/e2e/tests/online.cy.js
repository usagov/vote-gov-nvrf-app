/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate Online', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-testid="dropdown"]').select(data.online)
    cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()
  })
it('Validate Update Registration', () => {
  // check that state link opens in new tab
  // * will need to add this back in when links are updated
  // cy.get('[class="usa-link usa-link--external"]').should('have.attr','target','_blank')

// go to next page
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// check eligibility page
// verify that user CANNOT move forward with out checking box
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()
cy.get('[class="error-text"]').should('contain.text', 'Confirm eligibility to continue.')

// verify user CAN move forward after checking box
cy.get('[class="usa-checkbox__label"]').click()
cy.get('[class="error-text"]').should('not.exist')

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// select registration option
cy.get('[data-testid="button"]').then(btn => {
  cy.get(btn[1]).click()
})

// fill out personal information 
// * check that user can not move forward without filling out fields
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('be.visible')

cy.get('[data-testid="dropdown"]').then(dropdown => {
  // title
  cy.get(dropdown[0]).select(data.personalInformationTitle)
  cy.get(dropdown[0]).should('contain', data.personalInformationTitle)
  // suffix
  cy.get(dropdown[1]).select(data.personalInformationSuffix)
  cy.get(dropdown[1]).should('contain', data.personalInformationSuffix)
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.personalInformationName)
  cy.get(textBox[1]).type(data.personalInformationMiddle)
  cy.get(textBox[2]).type(data.personalInformationLast)
  cy.get(textBox[3]).type(data.personalInformationNumber)
  // Validate text box has correct text
  cy.get(textBox[0]).should('have.value', data.personalInformationName)
  cy.get(textBox[1]).should('have.value', data.personalInformationMiddle)  
  cy.get(textBox[2]).should('have.value', data.personalInformationLast)
  cy.get(textBox[3]).should('contain.value', data.personalInformationNumber2)
})

cy.get('[id="date_of_birth_month"]').type(data.personalInformationMonth)
cy.get('[id="date_of_birth_day"]').type(data.personalInformationDay)
cy.get('[id="date_of_birth_year"]').type(data.personalInformationYear)
// Validate text box has correct text
cy.get('[id="date_of_birth_month"]').should('have.value', data.personalInformationDay)
cy.get('[id="date_of_birth_day"]').should('have.value', data.personalInformationDay)
cy.get('[id="date_of_birth_year"]').should('have.value', data.personalInformationYear)

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()


// address and location page
// * check that user can not move forward without filling out fields
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('be.visible')

// * check that current address works
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get(textBox[1]).type(data.addressApt)
  cy.get(textBox[2]).type(data.addressTown)
  cy.get(textBox[3]).type(data.addressZip)
  // Validate text box has correct text
  cy.get(textBox[0]).should('have.value', data.addressStreet) 
  cy.get(textBox[1]).should('have.value', data.addressApt)
  cy.get(textBox[2]).should('have.value', data.addressTown)
  cy.get(textBox[3]).should('have.value', data.addressZip)
})
// * check that mailing address work 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[2]).click()
})
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[4]).type(data.addressStreet)
  cy.get(textBox[5]).type(data.addressTown)
  cy.get(textBox[6]).type(data.addressZip)
  // Validate text box has correct text
  cy.get(textBox[4]).should('have.value', data.addressStreet) 
  cy.get(textBox[5]).should('have.value', data.addressTown)
  cy.get(textBox[6]).should('have.value', data.addressZip)
})
// * uncheck mailing address block
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[2]).click()
})

// * check recently moved option 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[0]).click()
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[4]).type(data.addressStreet)
  cy.get(textBox[5]).type(data.addressApt)
  cy.get(textBox[6]).type(data.addressTown)
  cy.get(textBox[7]).type(data.addressZip)
  // Validate text box has correct text
  cy.get(textBox[4]).should('have.value', data.addressStreet) 
  cy.get(textBox[5]).should('have.value', data.addressApt)
  cy.get(textBox[6]).should('have.value', data.addressTown)
  cy.get(textBox[7]).should('have.value', data.addressZip)
})
// * uncheck recently moved block
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[0]).click()
})

// * check does not have permanent option 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[1]).click()
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get(textBox[1]).type(data.addressTown)
  cy.get(textBox[2]).type(data.addressZip)
  cy.get('[class="usa-select radius-md"]').select(data.addressState)

  // Validate text box has correct text
  cy.get(textBox[0]).should('have.value', data.addressStreet) 
  cy.get(textBox[1]).should('have.value', data.addressTown)
  cy.get(textBox[2]).should('have.value', data.addressZip)
})

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// identification
// * check that user can not move forward without selecting an option
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text text-bold"]').should('be.visible')

// * state driver's license number
// ! come back and fix when this bug is fixed
cy.get('[class="usa-select"]').select("State driver&#039;s license number")
cy.get('[data-testid="textInput"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-testid="textInput"]').should('have.value', data.idNumber)
// * state id number
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[data-testid="textInput"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-testid="textInput"]').should('have.value', data.idNumber)
// * social security number (last 4 digits)
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number")
})
cy.get('[data-testid="textInput"]').type(data.ssn)
// Validate fields have correct data 
cy.get('[data-testid="dropdown"]').should('have.value', data.ssnValue)
cy.get('[data-testid="textInput"]').should('have.value', data.ssn)

// * no id
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("I do not have a valid ID number.")
})
cy.get('[id="main-content"]').should('contain.text', '"None" will appear on your completed form.')

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

  // political party 
  cy.get('[data-testid="textInput"]').type(data.politicalParty)

  cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// confirmation page
cy.get('[id="acknowledge-check"]').click({force: true})
cy.get('[data-testid="button"]').then(btn => {
  cy.get(btn[5]).click()
})

cy.get('[class="grid-col-11 usa-prose"]').should('contain.text', 'Your Alaska mail-in registration form is complete and ready to print.')
// * check that download opens in new window
cy.get('[class="usa-button"]').then(btn => {
  cy.get(btn[1]).click()
})
cy.get('@open').should('have.been.calledOnce')

})

it('Validate New Registration', () => {
      // check that state link opens in new tab
  // * will need to add this back in when links are updated
  // cy.get('[class="usa-link usa-link--external"]').should('have.attr','target','_blank')

// go to next page
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// check eligibility page
// verify that user CANNOT move forward with out checking box
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()
cy.get('[class="error-text"]').should('contain.text', 'Confirm eligibility to continue.')

// verify user CAN move forward after checking box
cy.get('[class="usa-checkbox__label"]').click()
cy.get('[class="error-text"]').should('not.exist')

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// select registration option
cy.get('[data-testid="button"]').then(btn => {
  cy.get(btn[2]).click()
})

// fill out personal information 
// * check that user can not move forward without filling out fields
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('be.visible')

cy.get('[data-testid="dropdown"]').then(dropdown => {
  // title
  cy.get(dropdown[0]).select(data.personalInformationTitle)
  cy.get(dropdown[0]).should('contain', data.personalInformationTitle)
  // suffix
  cy.get(dropdown[1]).select(data.personalInformationSuffix)
  cy.get(dropdown[1]).should('contain', data.personalInformationSuffix)
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.personalInformationName)
  cy.get(textBox[1]).type(data.personalInformationMiddle)
  cy.get(textBox[2]).type(data.personalInformationLast)
  cy.get(textBox[3]).type(data.personalInformationNumber)
  // Validate text box has correct text
  cy.get(textBox[0]).should('have.value', data.personalInformationName)
  cy.get(textBox[1]).should('have.value', data.personalInformationMiddle)  
  cy.get(textBox[2]).should('have.value', data.personalInformationLast)
  cy.get(textBox[3]).should('contain.value', data.personalInformationNumber2)
})

cy.get('[id="date_of_birth_month"]').type(data.personalInformationMonth)
cy.get('[id="date_of_birth_day"]').type(data.personalInformationDay)
cy.get('[id="date_of_birth_year"]').type(data.personalInformationYear)
// Validate text box has correct text
cy.get('[id="date_of_birth_month"]').should('have.value', data.personalInformationDay)
cy.get('[id="date_of_birth_day"]').should('have.value', data.personalInformationDay)
cy.get('[id="date_of_birth_year"]').should('have.value', data.personalInformationYear)

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()


// address and location page
// * check that user can not move forward without filling out fields
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text"]').should('be.visible')

// * check that current address works
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get(textBox[1]).type(data.addressApt)
  cy.get(textBox[2]).type(data.addressTown)
  cy.get(textBox[3]).type(data.addressZip)
  // Validate text box has correct text
  cy.get(textBox[0]).should('have.value', data.addressStreet) 
  cy.get(textBox[1]).should('have.value', data.addressApt)
  cy.get(textBox[2]).should('have.value', data.addressTown)
  cy.get(textBox[3]).should('have.value', data.addressZip)
})
// * check that mailing address work 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[1]).click()
})
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[4]).type(data.addressStreet)
  cy.get(textBox[5]).type(data.addressTown)
  cy.get(textBox[6]).type(data.addressZip)
  // Validate text box has correct text
  cy.get(textBox[4]).should('have.value', data.addressStreet) 
  cy.get(textBox[5]).should('have.value', data.addressTown)
  cy.get(textBox[6]).should('have.value', data.addressZip)
})
// * uncheck mailing address block
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[1]).click()
})

// * check recently moved option 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[0]).click()
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get(textBox[1]).type(data.addressTown)
  cy.get(textBox[2]).type(data.addressZip)
  // Validate text box has correct text
  cy.get(textBox[0]).should('have.value', data.addressStreet) 
  cy.get(textBox[1]).should('have.value', data.addressTown)
  cy.get(textBox[2]).should('have.value', data.addressZip)
})
// * uncheck recently moved block
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[0]).click()
})

// * check does not have permanent option 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[0]).click()
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get('[class="usa-select radius-md"]').select(data.addressState)

  // Validate text box has correct text
  cy.get(textBox[0]).should('have.value', data.addressStreet) 
  cy.get(textBox[1]).should('have.value', data.addressTown)
  cy.get(textBox[2]).should('have.value', data.addressZip)
})

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// identification
// * check that user can not move forward without selecting an option
cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click().click()
cy.get('[class="error-text text-bold"]').should('be.visible')

// * state driver's license number
// ! come back and fix when this bug is fixed
cy.get('[class="usa-select"]').select("State driver&#039;s license number")
cy.get('[data-testid="textInput"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-testid="textInput"]').should('have.value', data.idNumber)
// * state id number
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[data-testid="textInput"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-testid="textInput"]').should('have.value', data.idNumber)
// * social security number (last 4 digits)
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number")
})
cy.get('[data-testid="textInput"]').type(data.ssn)
// Validate fields have correct data 
cy.get('[data-testid="dropdown"]').should('have.value', data.ssnValue)
cy.get('[data-testid="textInput"]').should('have.value', data.ssn)

// * no id
cy.get('[class="usa-select"]').then(dropDown => {
  cy.get(dropDown[0]).select("I do not have a valid ID number.")
})
cy.get('[id="main-content"]').should('contain.text', '"None" will appear on your completed form.')

cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

  // political party
  cy.get('[data-testid="textInput"]').type(data.politicalParty)

  cy.get('[class="usa-button next-button mobile-width margin-top-5"]').click()

// confirmation page
cy.get('[id="acknowledge-check"]').click({force: true})
cy.get('[data-testid="button"]').then(btn => {
  cy.get(btn[5]).click()
})

cy.get('[class="grid-col-11 usa-prose"]').should('contain.text', 'Your Alaska mail-in registration form is complete and ready to print.')

// * check that download opens in new window
cy.get('[class="usa-button"]').then(btn => {
  cy.get(btn[1]).click()
})
cy.get('@open').should('have.been.calledOnce')

  })
})
