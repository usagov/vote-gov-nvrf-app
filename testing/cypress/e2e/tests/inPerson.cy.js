/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate In Person', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-test="dropDown"]').select(data.inPerson)
    cy.get('[data-test="nextBtn"]').click()
  })
it('Validate Update Registration', () => {
// go to next page
cy.get('[data-test="nextBtn"]').click()

// check eligibility page
// verify that user CANNOT move forward with out checking box
cy.get('[data-test="nextBtn"]').click()
cy.get('[data-test="errorText"]').should('contain.text', 'Confirm eligibility to continue.')

// verify user CAN move forward after checking box
cy.get('[data-test="checkBox"]').click()
// todo: come back after fix 
// cy.get('[data-test="errorText"]').should('not.exist')

cy.get('[data-test="nextBtn"]').click()

// select registration option
cy.get('[data-test="pathBtn"]').then(btn => {
  cy.get(btn[0]).click({force: true})
})

// fill out personal information 
// * check that user can not move forward without filling out fields
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('exist')

cy.get('[data-test="select"]').then(dropdown => {
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

cy.get('[data-test="dobMonth"]').type(data.personalInformationMonth)
cy.get('[data-test="dobDay"]').type(data.personalInformationDay)
cy.get('[data-test="dobYear"]').type(data.personalInformationYear)
// Validate text box has correct text
cy.get('[data-test="dobMonth"]').should('have.value', data.personalInformationDay)
cy.get('[data-test="dobDay"]').should('have.value', data.personalInformationDay)
cy.get('[data-test="dobYear"]').should('have.value', data.personalInformationYear)

cy.get('[data-test="nextBtn"]').click()

// address and location page
// * check that user can not move forward without filling out fields
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('be.visible')

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
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
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
// * uncheck mailing address block
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
})

// * check recently moved option 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[0]).click({force: true})
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
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[0]).click({force: true})
})

// * check does not have permanent option 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get('[data-testid="Select"]').select(data.addressState)
  // Validate text box has correct text for mailing address
  cy.get(textBox[0]).should('have.value', data.addressStreet) 
  cy.get(textBox[1]).should('have.value', data.addressTown)
  cy.get(textBox[2]).should('have.value', data.addressZip)
})

cy.get('[data-test="nextBtn"]').click()

// identification
// * check that user can not move forward without selecting an option
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('be.visible')

// * state driver's license number
cy.get('[data-test="dropDown"]').select("State driver's license number")
cy.get('[data-testid="textInput"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-testid="textInput"]').should('have.value', data.idNumber)

// Validate that fields have correct data
  cy.get('[data-testid="textInput"]').should('have.value', data.idNumber)
// * social security number (last 4 digits)
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number (last 4 digits)")
})
cy.get('[data-testid="textInput"]').type(data.ssn)
// Validate fields have correct data 
cy.get('[data-test="dropDown"]').should('have.value', data.ssnValue)
cy.get('[data-testid="textInput"]').should('have.value', data.ssn)

// * no id
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("I do not have a valid ID number.")
})
cy.get('p').should('contain.text', '"None" will appear on your completed form.')

cy.get('[data-test="nextBtn"]').click()

  // political party 
  cy.get('[data-testid="textInput"]').type(data.politicalParty)

cy.get('[data-test="nextBtn"]').click()

// confirmation page
cy.get('[data-test="confirm"]').click({force: true})
cy.get('[data-test="nextBtn"]').click()

cy.get('[data-test="addressConfirm"]').should('contain.text', 'Your Delaware mail-in registration form is complete and ready to print.')
// * check that download opens in new window
cy.get('[data-test="pdfBtn"]').click()
cy.get('@open').should('have.been.calledOnce')

})

it('Validate New Registration', () => {
// go to next page
cy.get('[data-test="nextBtn"]').click()

// check eligibility page
// verify that user CANNOT move forward with out checking box
cy.get('[data-test="nextBtn"]').click()
cy.get('[data-test="errorText"]').should('contain.text', 'Confirm eligibility to continue.')

// verify user CAN move forward after checking box
cy.get('[data-test="checkBox"]').click()
// todo: come back when fixed
// cy.get('[data-test="errorText"]').should('not.exist')


cy.get('[data-test="nextBtn"]').click()

// select registration option
cy.get('[data-test="pathBtn"]').then(btn => {
  cy.get(btn[1]).click({force: true})
})

// fill out personal information 
// * check that user can not move forward without filling out fields
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('exist')

cy.get('[data-test="select"]').then(dropdown => {
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

cy.get('[data-test="dobMonth"]').type(data.personalInformationMonth)
cy.get('[data-test="dobDay"]').type(data.personalInformationDay)
cy.get('[data-test="dobYear"]').type(data.personalInformationYear)
// Validate text box has correct text
cy.get('[data-test="dobMonth"]').should('have.value', data.personalInformationDay)
cy.get('[data-test="dobDay"]').should('have.value', data.personalInformationDay)
cy.get('[data-test="dobYear"]').should('have.value', data.personalInformationYear)

cy.get('[data-test="nextBtn"]').click()


// address and location page
// * check that user can not move forward without filling out fields
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('be.visible')

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
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
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
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
})

// * check does not have permanent option 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[0]).click({force: true})
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

cy.get('[data-test="nextBtn"]').click()

// identification
// * check that user can not move forward without selecting an option
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('be.visible')

// * state driver's license number
cy.get('[data-test="dropDown"]').select("State driver's license number")
cy.get('[data-testid="textInput"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-testid="textInput"]').should('have.value', data.idNumber)
// * state id number
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[data-testid="textInput"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-testid="textInput"]').should('have.value', data.idNumber)
// * social security number (last 4 digits)
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number (last 4 digits)")
})
cy.get('[data-testid="textInput"]').type(data.ssn)
// Validate fields have correct data 
cy.get('[data-test="dropDown"]').should('have.value', data.ssnValue)
cy.get('[data-testid="textInput"]').should('have.value', data.ssn)

// * no id
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("I do not have a valid ID number.")
})
cy.get('p').should('contain.text', '"None" will appear on your completed form.')

cy.get('[data-test="nextBtn"]').click()

  // political party
  cy.get('[data-testid="textInput"]').type(data.politicalParty)

  cy.get('[data-test="nextBtn"]').click()

// confirmation page
cy.get('[data-test="confirm"]').click({force: true})
cy.get('[data-test="nextBtn"]').click()


cy.get('[data-test="addressConfirm"]').should('contain.text', 'Your Delaware mail-in registration form is complete and ready to print.')
// * check that download opens in new window
cy.get('[data-test="pdfBtn"]').click()
cy.get('@open').should('have.been.calledOnce')

  })
})
