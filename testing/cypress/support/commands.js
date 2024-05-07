/* eslint-disable no-undef */
Cypress.Commands.add('signin', (username, password) => {

  cy.visit('/', {
    onBeforeLoad (win) {
      cy.stub(win, 'open').as('open')
    }
  })
  cy.get('[id="loginUser"]').type(username)
  cy.get('[id="loginPass"]').type(password)

  cy.get('[id="loginConfirm"]').click()

});

Cypress.Commands.add('completeForm', () => {
const data = require("../fixtures/data.json");

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

cy.get('[data-test="dobMonth"]').type(data.personalInformationMonth)
cy.get('[data-test="dobDay"]').type(data.personalInformationDay)
cy.get('[data-test="dobYear"]').type(data.personalInformationYear)

cy.get('[data-testid="checkbox"]').click()

cy.get('[data-test="select"]').then(dropdown => {

  // title
  cy.get(dropdown[2]).select(data.personalInformationTitle)
  cy.get(dropdown[2]).should('contain', data.personalInformationTitle)
  // suffix
  cy.get(dropdown[3]).select(data.personalInformationSuffix)
  cy.get(dropdown[3]).should('contain', data.personalInformationSuffix)
})

cy.get('[data-test="firstName"]').type(data.personalInformationName)
cy.get('[data-test="middleName"]').type(data.personalInformationMiddle)
cy.get('[data-test="lastName"]').type(data.personalInformationLast)

cy.get('[data-test="prevFirstName"]').type(data.personalInformationName)
cy.get('[data-test="prevMiddleName"]').type(data.personalInformationMiddle)
cy.get('[data-test="prevLastName"]').type(data.personalInformationLast)

cy.get('[data-test="nextBtn"]').click()

// address and location page
// * check that current address works
cy.get('[data-test="street"]').type(data.addressStreet)
cy.get('[data-test="aptNumber"]').type(data.addressApt)
cy.get('[data-test="city"]').type(data.addressTown)
cy.get('[data-test="zip"]').type(data.addressZip)

// * check that mailing address work 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[2]).click({force: true})
})

cy.get('[data-test="mailStreet"]').type(data.addressStreet)
cy.get('[data-test="mailCity"]').type(data.addressTown)
cy.get('[data-test="mailZip"]').type(data.addressZip)

// * uncheck mailing address block
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[2]).click({force: true})
})

// * check recently moved option 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[0]).click({force: true})
})

cy.get('[data-test="prevStreet"]').type(data.addressStreet)
cy.get('[data-test="prevAptNumber"]').type(data.addressApt)
cy.get('[data-test="prevCity"]').type(data.addressTown)
cy.get('[data-test="prevZip"]').type(data.addressZip)
// * uncheck recently moved block
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[0]).click({force: true})
})

// * check does not have permanent option 
cy.get('[data-test="checkBox"]').then(checkBox => {
  cy.get(checkBox[1]).click({force: true})
})

cy.get('[data-test="mailStreet"]').type(data.addressStreet)
cy.get('[data-test="mailCity"]').type(data.addressTown)
cy.get('[data-test="mailZip"]').type(data.addressZip)
cy.get('[data-testid="Select"]').select(data.addressState)

cy.get('[data-test="nextBtn"]').click()


// identification
// * state driver's license number
cy.get('[data-test="dropDown"]').select("State driver's license number")
cy.get('[data-test="driverId"]').type(data.idNumber)
// * social security number (last 4 digits)
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number (last 4 digits)")
})
cy.get('[data-test="ssn"]').type(data.ssn)

// * no id
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("I do not have a valid ID.")
})
cy.get('p').should('contain.text', '"None" will appear on your completed form.')

// * state id number
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[data-test="stateId"]').type(data.idNumber)


cy.get('[data-test="nextBtn"]').click()

  // political party
  cy.get('[data-test="politicalParty"]').type(data.politicalParty)

  cy.get('[data-test="nextBtn"]').click()


  })
