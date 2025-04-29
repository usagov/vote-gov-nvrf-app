import {pageObjects} from './pageObjects'

/* eslint-disable no-undef */
Cypress.Commands.add('signin', (username, password) => {

  cy.visit('/', {
    onBeforeLoad(win) {
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
  pageObjects
    .nextBtn().click()

// check eligibility page
// verify that user CANNOT move forward with out checking box
  pageObjects
    .nextBtn().click()
  pageObjects
    .errorText().should('contain.text', 'Confirm eligibility to continue.')

// verify user CAN move forward after checking box
  pageObjects
    .checkBoxEligibility().click({force: true})
// todo: come back after fix
// pageObjects
// .errorText().should('not.exist')

  pageObjects
    .nextBtn().click()

// select registration option
  pageObjects
    .pathBtn().then(btn => {
    cy.get(btn[0]).click({force: true})
  })

// fill out personal information
  pageObjects
    .select().then(dropdown => {
    // title
    cy.get(dropdown[0]).select(data.personalInformationTitle)
    cy.get(dropdown[0]).should('contain', data.personalInformationTitle)
    // suffix
    cy.get(dropdown[1]).select(data.personalInformationSuffix)
    cy.get(dropdown[1]).should('contain', data.personalInformationSuffix)
  })

  pageObjects
    .firstName().type(data.personalInformationName)
  pageObjects
    .middleName().type(data.personalInformationMiddle)
  pageObjects
    .lastName().type(data.personalInformationLast)
  pageObjects
    .phoneNumber().type(data.personalInformationNumber)

  pageObjects
    .dobMonth().type(data.personalInformationMonth)
  pageObjects
    .dobDay().type(data.personalInformationDay)
  pageObjects
    .dobYear().type(data.personalInformationYear)

  pageObjects
    .checkBoxPrevName().click({force: true})

  pageObjects
    .select().then(dropdown => {

    // title
    cy.get(dropdown[3]).select(data.personalInformationTitle)
    cy.get(dropdown[3]).should('contain', data.personalInformationTitle)
    // suffix
    cy.get(dropdown[4]).select(data.personalInformationSuffix)
    cy.get(dropdown[4]).should('contain', data.personalInformationSuffix)
  })

  pageObjects
    .firstName().type(data.personalInformationName)
  pageObjects
    .middleName().type(data.personalInformationMiddle)
  pageObjects
    .lastName().type(data.personalInformationLast)

  pageObjects
    .prevFirstName().type(data.personalInformationName)
  pageObjects
    .prevMiddleName().type(data.personalInformationMiddle)
  pageObjects
    .prevLastName().type(data.personalInformationLast)

  pageObjects
    .nextBtn().click()

// address and location page
// * check that current address works
  pageObjects
    .street().type(data.addressStreet)
  pageObjects
    .aptNumber().type(data.addressApt)
  pageObjects
    .city().type(data.addressTown)
  pageObjects
    .zip().type(data.addressZip)

// * check that mailing address work
  pageObjects
    .checkBoxMailAddress().click({force: true})

  pageObjects
    .mailStreet().type(data.addressStreet)
  pageObjects
    .mailCity().type(data.addressTown)
  pageObjects
    .mailZip().type(data.addressZip)

// * uncheck mailing address block
  pageObjects
    .checkBoxMailAddress().click({force: true})

// * check recently moved option
  pageObjects
    .checkBoxPrevAddress().click({force: true})

  pageObjects
    .prevStreet().type(data.addressStreet)
  pageObjects
    .prevAptNumber().type(data.addressApt)
  pageObjects
    .prevCity().type(data.addressTown)
  pageObjects
    .prevZip().type(data.addressZip)
// * uncheck recently moved block
  pageObjects
    .checkBoxPrevAddress().click({force: true})

// * check does not have permanent option
  pageObjects
    .checkBoxNoAddress().click({force: true})

  pageObjects
    .mailStreet().type(data.addressStreet)
  pageObjects
    .mailCity().type(data.addressTown)
  pageObjects
    .mailZip().type(data.addressZip)
  pageObjects
    .select().select(data.addressState)

  pageObjects
    .nextBtn().click()


// identification
// * state driver's license number
  pageObjects
    .dropDown().select("State driver's license number")
  pageObjects
    .driverId().type(data.idNumber)
// * social security number (last 4 digits)
  pageObjects
    .dropDown().then(dropDown => {
    cy.get(dropDown[0]).select("Social security number (last 4 digits)")
  })
  pageObjects
    .ssn().type(data.ssn)

// * no id
  pageObjects
    .dropDown().then(dropDown => {
    cy.get(dropDown[0]).select("I do not have a valid ID.")
  })
  cy.get('p').should('contain.text', '"None" will appear on your completed form.')

// * state id number
  pageObjects
    .dropDown().then(dropDown => {
    cy.get(dropDown[0]).select("State non-driver ID")
  })
  pageObjects
    .stateId().type(data.idNumber)


  pageObjects
    .nextBtn().click()

  // political party
  pageObjects
    .politicalParty().type(data.politicalParty)

  pageObjects
    .nextBtn().click()

})