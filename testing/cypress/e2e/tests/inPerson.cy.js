/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate In Person', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    // cy.get('[data-test="dropDown"]').select(data.inPerson)
    // cy.get('[data-test="nextBtn"]').click()
  })
it('Validate Update Registration', () => {
// go to next page
// cy.get('[data-test="nextBtn"]').click()

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

cy.get('[data-test="firstName"]').type(data.personalInformationName)
cy.get('[data-test="middleName"]').type(data.personalInformationMiddle)
cy.get('[data-test="lastName"]').type(data.personalInformationLast)
cy.get('[data-test="phoneNumber"]').type(data.personalInformationNumber)
// Validate text box has correct text
cy.get('[data-test="firstName"]').should('have.value', data.personalInformationName)
cy.get('[data-test="middleName"]').should('have.value', data.personalInformationMiddle)  
cy.get('[data-test="lastName"]').should('have.value', data.personalInformationLast)
cy.get('[data-test="phoneNumber"]').should('contain.value', data.personalInformationNumber2)

// * check previous name fields
cy.get('[data-test="checkBox"]').click({force: true})
cy.get('[data-test="prevFirstName"]').type(data.personalInformationName)
cy.get('[data-test="prevMiddleName"]').type(data.personalInformationMiddle)
cy.get('[data-test="prevLastName"]').type(data.personalInformationLast)
// Validate text box has correct text
cy.get('[data-test="prevFirstName"]').should('have.value', data.personalInformationName)
cy.get('[data-test="prevMiddleName"]').should('have.value', data.personalInformationMiddle)  
cy.get('[data-test="prevLastName"]').should('have.value', data.personalInformationLast)

// * check date of birth fields
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
cy.get('[data-test="street"]').type(data.addressStreet)
cy.get('[data-test="aptNumber"]').type(data.addressApt)
cy.get('[data-test="city"]').type(data.addressTown)
cy.get('[data-test="zip"]').type(data.addressZip)
  // Validate text box has correct text
cy.get('[data-test="street"]').should('have.value', data.addressStreet) 
cy.get('[data-test="aptNumber"]').should('have.value', data.addressApt)
cy.get('[data-test="city"]').should('have.value', data.addressTown)
cy.get('[data-test="zip"]').should('have.value', data.addressZip)

// * check that mailing address work 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
})

cy.get('[data-test="mailStreet"]').type(data.addressStreet)
cy.get('[data-test="mailCity"]').type(data.addressTown)
cy.get('[data-test="mailZip"]').type(data.addressZip)
  // Validate text box has correct text
cy.get('[data-test="mailStreet"]').should('have.value', data.addressStreet) 
cy.get('[data-test="mailCity"]').should('have.value', data.addressTown)
cy.get('[data-test="mailZip"]').should('have.value', data.addressZip)

// * uncheck mailing address block
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
})

// * check recently moved option 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[0]).click({force: true})
})

cy.get('[data-test="prevStreet"]').type(data.addressStreet)
cy.get('[data-test="prevAptNumber"]').type(data.addressApt)
cy.get('[data-test="prevCity"]').type(data.addressTown)
cy.get('[data-test="prevZip"]').type(data.addressZip)
  // Validate text box has correct text
cy.get('[data-test="prevStreet"]').should('have.value', data.addressStreet) 
cy.get('[data-test="prevAptNumber"]').should('have.value', data.addressApt)
cy.get('[data-test="prevCity"]').should('have.value', data.addressTown)
cy.get('[data-test="prevZip"]').should('have.value', data.addressZip)

  // * uncheck recently moved block
  cy.get('[data-test="checkBox"]').then(checkBox => {
    cy.get(checkBox[0]).click({force: true})
  })
  
  // * check does not have permanent option 
  cy.get('[data-test="checkBox"]').then(checkBox => {
    cy.get(checkBox[1]).click({force: true})
  })
  
    cy.get('[data-testid="Select"]').select(data.addressState)
    // Validate text box has correct text for mailing address
    cy.get('[data-test="mailStreet"]').should('have.value', data.addressStreet) 
    cy.get('[data-test="mailCity"]').should('have.value', data.addressTown)
    cy.get('[data-test="mailZip"]').should('have.value', data.addressZip)

cy.get('[data-test="nextBtn"]').click()

// identification
// * check that user can not move forward without selecting an option
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('be.visible')

// * state driver's license number
cy.get('[data-test="dropDown"]').select("State driver's license number")
cy.get('[data-test="driverId"]').type(data.idNumber)

// Validate that fields have correct data
cy.get('[data-test="driverId"]').should('have.value', data.idNumber)

// * social security number (last 4 digits)
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number (last 4 digits)")
})
cy.get('[data-test="ssn"]').type(data.ssn)
// Validate fields have correct data 
cy.get('[data-test="dropDown"]').should('have.value', data.ssnValue)
cy.get('[data-test="ssn"]').should('have.value', data.ssn)

// * no id
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("I do not have a valid ID.")
})
cy.get('p').should('contain.text', '"None" will appear on your completed form.')

cy.get('[data-test="nextBtn"]').click()

  // political party 
  cy.get('[data-test="politicalParty"]').type(data.politicalParty)

cy.get('[data-test="nextBtn"]').click()

// confirmation page
cy.get('[data-test="confirm"]').click({force: true})
cy.get('[data-test="nextBtn"]').click()

cy.get('[data-test="addressConfirm"]').should('contain.text', 'Your Alabama mail-in registration form is complete and ready to print.')
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

cy.get('[data-test="firstName"]').type(data.personalInformationName)
cy.get('[data-test="middleName"]').type(data.personalInformationMiddle)
cy.get('[data-test="lastName"]').type(data.personalInformationLast)
cy.get('[data-test="phoneNumber"]').type(data.personalInformationNumber)
// Validate text box has correct text
cy.get('[data-test="firstName"]').should('have.value', data.personalInformationName)
cy.get('[data-test="middleName"]').should('have.value', data.personalInformationMiddle)  
cy.get('[data-test="lastName"]').should('have.value', data.personalInformationLast)
cy.get('[data-test="phoneNumber"]').should('contain.value', data.personalInformationNumber2)

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
cy.get('[data-test="street"]').type(data.addressStreet)
cy.get('[data-test="aptNumber"]').type(data.addressApt)
cy.get('[data-test="city"]').type(data.addressTown)
cy.get('[data-test="zip"]').type(data.addressZip)
  // Validate text box has correct text
cy.get('[data-test="street"]').should('have.value', data.addressStreet) 
cy.get('[data-test="aptNumber"]').should('have.value', data.addressApt)
cy.get('[data-test="city"]').should('have.value', data.addressTown)
cy.get('[data-test="zip"]').should('have.value', data.addressZip)

// * check that mailing address work 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
})
cy.get('[data-test="mailStreet"]').type(data.addressStreet)
cy.get('[data-test="mailCity"]').type(data.addressTown)
cy.get('[data-test="mailZip"]').type(data.addressZip)
  // Validate text box has correct text
cy.get('[data-test="mailStreet"]').should('have.value', data.addressStreet) 
cy.get('[data-test="mailCity"]').should('have.value', data.addressTown)
cy.get('[data-test="mailZip"]').should('have.value', data.addressZip)

// * uncheck mailing address block
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
})

// * check does not have permanent option 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[0]).click({force: true})
})

cy.get('[data-test="mailStreet"]').type(data.addressStreet)
cy.get('[data-test="mailCity"]').type(data.addressTown)
cy.get('[data-test="mailZip"]').type(data.addressZip)
  cy.get('[class="usa-select radius-md"]').select(data.addressState)

  // Validate text box has correct text
cy.get('[data-test="mailStreet"]').should('have.value', data.addressStreet) 
cy.get('[data-test="mailCity"]').should('have.value', data.addressTown)
cy.get('[data-test="mailZip"]').should('have.value', data.addressZip)

cy.get('[data-test="nextBtn"]').click()

// identification
// * check that user can not move forward without selecting an option
cy.get('[data-test="nextBtn"]').click().click()
cy.get('[data-test="errorText"]').should('be.visible')

// * state driver's license number
cy.get('[data-test="dropDown"]').select("State driver's license number")
cy.get('[data-test="driverId"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-test="driverId"]').should('have.value', data.idNumber)
// * state id number
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[data-test="stateId"]').type(data.idNumber)

// Validate that fields have correct data
  cy.get('[data-test="stateId"]').should('have.value', data.idNumber)
// * social security number (last 4 digits)
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number (last 4 digits)")
})
cy.get('[data-test="ssn"]').type(data.ssn)
// Validate fields have correct data 
cy.get('[data-test="dropDown"]').should('have.value', data.ssnValue)
cy.get('[data-test="ssn"]').should('have.value', data.ssn)

// * no id
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("I do not have a valid ID.")
})
cy.get('p').should('contain.text', '"None" will appear on your completed form.')

cy.get('[data-test="nextBtn"]').click()

  // political party
  cy.get('[data-test="politicalParty"]').type(data.politicalParty)

  cy.get('[data-test="nextBtn"]').click()

// confirmation page
cy.get('[data-test="confirm"]').click({force: true})
cy.get('[data-test="nextBtn"]').click()


cy.get('[data-test="addressConfirm"]').should('contain.text', 'Your Alabama mail-in registration form is complete and ready to print.')
// * check that download opens in new window
cy.get('[data-test="pdfBtn"]').click()
cy.get('@open').should('have.been.calledOnce')

  })
})
