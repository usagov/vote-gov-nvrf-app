/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");
import {pageObjects} from '../../support/pageObjects.js'


describe('Validate In Person', () => {
  beforeEach('login to app', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('open')
      }
    })
  })

  it('Validate Update Registration', () => {
    // check eligibility page
    // verify that user CANNOT move forward with out checking box
    pageObjects
      .nextBtn().click()
    pageObjects
      .errorText().should('contain.text', 'Confirm eligibility to continue.')

    // verify user CAN move forward after checking box
    pageObjects
      .checkBox().click()
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
    // * check that user can not move forward without filling out fields
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('exist')

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
    // Validate text box has correct text
    pageObjects
      .firstName().should('have.value', data.personalInformationName)
    pageObjects
      .middleName().should('have.value', data.personalInformationMiddle)
    pageObjects
      .lastName().should('have.value', data.personalInformationLast)
    pageObjects
      .phoneNumber().should('contain.value', data.personalInformationNumber2)

    // * check previous name fields
    pageObjects
      .checkBox().click()
    pageObjects
      .prevFirstName().type(data.personalInformationName)
    pageObjects
      .prevMiddleName().type(data.personalInformationMiddle)
    pageObjects
      .prevLastName().type(data.personalInformationLast)
    // Validate text box has correct text
    pageObjects
      .prevFirstName().should('have.value', data.personalInformationName)
    pageObjects
      .prevMiddleName().should('have.value', data.personalInformationMiddle)
    pageObjects
      .prevLastName().should('have.value', data.personalInformationLast)

    // * check date of birth fields
    pageObjects
      .dobMonth().type(data.personalInformationMonth)
    pageObjects
      .dobDay().type(data.personalInformationDay)
    pageObjects
      .dobYear().type(data.personalInformationYear)
    // Validate text box has correct text
    pageObjects
      .dobMonth().should('have.value', data.personalInformationDay)
    pageObjects
      .dobDay().should('have.value', data.personalInformationDay)
    pageObjects
      .dobYear().should('have.value', data.personalInformationYear)

    pageObjects
      .nextBtn().click()

    // address and location page
    // * check that user can not move forward without filling out fields
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('be.visible')

    // * check that current address works
    pageObjects
      .street().type(data.addressStreet)
    pageObjects
      .aptNumber().type(data.addressApt)
    pageObjects
      .city().type(data.addressTown)
    pageObjects
      .zip().type(data.addressZip)
    // Validate text box has correct text
    pageObjects
      .street().should('have.value', data.addressStreet)
    pageObjects
      .aptNumber().should('have.value', data.addressApt)
    pageObjects
      .city().should('have.value', data.addressTown)
    pageObjects
      .zip().should('have.value', data.addressZip)

    // * check that mailing address work
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[1]).click({force: true})
    })

    pageObjects
      .mailStreet().type(data.addressStreet)
    pageObjects
      .mailCity().type(data.addressTown)
    pageObjects
      .mailZip().type(data.addressZip)
    // Validate text box has correct text
    pageObjects
      .mailStreet().should('have.value', data.addressStreet)
    pageObjects
      .mailCity().should('have.value', data.addressTown)
    pageObjects
      .mailZip().should('have.value', data.addressZip)

    // * uncheck mailing address block
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[1]).click({force: true})
    })

    // * check recently moved option
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[0]).click({force: true})
    })

    pageObjects
      .prevStreet().type(data.addressStreet)
    pageObjects
      .prevAptNumber().type(data.addressApt)
    pageObjects
      .prevCity().type(data.addressTown)
    pageObjects
      .prevZip().type(data.addressZip)
    // Validate text box has correct text
    pageObjects
      .prevStreet().should('have.value', data.addressStreet)
    pageObjects
      .prevAptNumber().should('have.value', data.addressApt)
    pageObjects
      .prevCity().should('have.value', data.addressTown)
    pageObjects
      .prevZip().should('have.value', data.addressZip)

    // * uncheck recently moved block
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[0]).click({force: true})
    })

    // * check does not have permanent option
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[1]).click({force: true})
    })
    pageObjects
      .select().select(data.addressState)
    // Validate text box has correct text for mailing address
    pageObjects
      .mailStreet().should('have.value', data.addressStreet)
    pageObjects
      .mailCity().should('have.value', data.addressTown)
    pageObjects
      .mailZip().should('have.value', data.addressZip)

    pageObjects
      .nextBtn().click()

    // identification
    // * check that user can not move forward without selecting an option
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('be.visible')

    // * state driver's license number
    pageObjects
      .dropDown().select("State driver's license number")
    pageObjects
      .driverId().type(data.idNumber)

    // Validate that fields have correct data
    pageObjects
      .driverId().should('have.value', data.idNumber)

    // * social security number (last 4 digits)
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("Social security number (last 4 digits)")
    })
    pageObjects
      .ssn().type(data.ssn)
    // Validate fields have correct data
    pageObjects
      .dropDown().should('have.value', data.ssnValue)
    pageObjects
      .ssn().should('have.value', data.ssn)

    // * no id
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("I do not have a valid ID.")
    })
    cy.get('p').should('contain.text', '"None" will appear on your completed form.')

    pageObjects
      .nextBtn().click()

    // political party
    pageObjects
      .politicalParty().type(data.politicalParty)

    pageObjects
      .nextBtn().click()

    // confirmation page
    pageObjects
      .confirm().click()
    pageObjects
      .nextBtn().click()

    pageObjects
      .addressConfirm().should('contain.text', 'Your Alabama mail-in registration form is complete and ready to print.')
    // * check that download opens in new window
    pageObjects
      .pdfBtnNewTab().click()
    cy.get('@open').should('have.been.calledOnce')

  })

  it('Validate New Registration', () => {
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
      .checkBox().click()

    pageObjects
      .nextBtn().click()

    // select registration option
    pageObjects
      .pathBtn().then(btn => {
      cy.get(btn[1]).click({force: true})
    })

    // fill out personal information
    // * check that user can not move forward without filling out fields
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('exist')

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
    // Validate text box has correct text
    pageObjects
      .firstName().should('have.value', data.personalInformationName)
    pageObjects
      .middleName().should('have.value', data.personalInformationMiddle)
    pageObjects
      .lastName().should('have.value', data.personalInformationLast)
    pageObjects
      .phoneNumber().should('contain.value', data.personalInformationNumber2)

    pageObjects
      .dobMonth().type(data.personalInformationMonth)
    pageObjects
      .dobDay().type(data.personalInformationDay)
    pageObjects
      .dobYear().type(data.personalInformationYear)
    // Validate text box has correct text
    pageObjects
      .dobMonth().should('have.value', data.personalInformationDay)
    pageObjects
      .dobDay().should('have.value', data.personalInformationDay)
    pageObjects
      .dobYear().should('have.value', data.personalInformationYear)

    pageObjects
      .nextBtn().click()


    // address and location page
    // * check that user can not move forward without filling out fields
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('be.visible')

    // * check that current address works
    pageObjects
      .street().type(data.addressStreet)
    pageObjects
      .aptNumber().type(data.addressApt)
    pageObjects
      .city().type(data.addressTown)
    pageObjects
      .zip().type(data.addressZip)
    // Validate text box has correct text
    pageObjects
      .street().should('have.value', data.addressStreet)
    pageObjects
      .aptNumber().should('have.value', data.addressApt)
    pageObjects
      .city().should('have.value', data.addressTown)
    pageObjects
      .zip().should('have.value', data.addressZip)

    // * check that mailing address work
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[1]).click({force: true})
    })
    pageObjects
      .mailStreet().type(data.addressStreet)
    pageObjects
      .mailCity().type(data.addressTown)
    pageObjects
      .mailZip().type(data.addressZip)
    // Validate text box has correct text
    pageObjects
      .mailStreet().should('have.value', data.addressStreet)
    pageObjects
      .mailCity().should('have.value', data.addressTown)
    pageObjects
      .mailZip().should('have.value', data.addressZip)

    // * uncheck mailing address block
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[1]).click({force: true})
    })

    // * check does not have permanent option
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[0]).click({force: true})
    })

    pageObjects
      .mailStreet().type(data.addressStreet)
    pageObjects
      .mailCity().type(data.addressTown)
    pageObjects
      .mailZip().type(data.addressZip)
    cy.get('[class="usa-select radius-md"]').select(data.addressState)

    // Validate text box has correct text
    pageObjects
      .mailStreet().should('have.value', data.addressStreet)
    pageObjects
      .mailCity().should('have.value', data.addressTown)
    pageObjects
      .mailZip().should('have.value', data.addressZip)

    pageObjects
      .nextBtn().click()

    // identification
    // * check that user can not move forward without selecting an option
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('be.visible')

    // * state driver's license number
    pageObjects
      .dropDown().select("State driver's license number")
    pageObjects
      .driverId().type(data.idNumber)

    // Validate that fields have correct data
    pageObjects
      .driverId().should('have.value', data.idNumber)
    // * state id number
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("State non-driver ID")
    })

    pageObjects
      .stateId().type(data.idNumber)

    // Validate that fields have correct data
    pageObjects
      .stateId().should('have.value', data.idNumber)
    // * social security number (last 4 digits)
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("Social security number (last 4 digits)")
    })
    pageObjects
      .ssn().type(data.ssn)
    // Validate fields have correct data
    pageObjects
      .dropDown().should('have.value', data.ssnValue)
    pageObjects
      .ssn().should('have.value', data.ssn)

    // * no id
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("I do not have a valid ID.")
    })
    cy.get('p').should('contain.text', '"None" will appear on your completed form.')

    pageObjects
      .nextBtn().click()

    // political party
    pageObjects
      .politicalParty().type(data.politicalParty)

    pageObjects
      .nextBtn().click()

    // confirmation page
    pageObjects
      .confirm().click()
    pageObjects
      .nextBtn().click()

    pageObjects
      .addressConfirm().should('contain.text', 'Your Alabama mail-in registration form is complete and ready to print.')
    // * check that download opens in new window
    pageObjects
      .pdfBtnNewTab().click()
    cy.get('@open').should('have.been.calledOnce')

  })

  it('Validate New Registration', () => {
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
      .checkBox().click()

    pageObjects
      .nextBtn().click()

    // select registration option
    pageObjects
      .pathBtn().then(btn => {
      cy.get(btn[1]).click({force: true})
    })

    // fill out personal information
    // * check that user can not move forward without filling out fields
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('exist')

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
    // Validate text box has correct text
    pageObjects
      .firstName().should('have.value', data.personalInformationName)
    pageObjects
      .middleName().should('have.value', data.personalInformationMiddle)
    pageObjects
      .lastName().should('have.value', data.personalInformationLast)
    pageObjects
      .phoneNumber().should('contain.value', data.personalInformationNumber2)

    pageObjects
      .dobMonth().type(data.personalInformationMonth)
    pageObjects
      .dobDay().type(data.personalInformationDay)
    pageObjects
      .dobYear().type(data.personalInformationYear)
    // Validate text box has correct text
    pageObjects
      .dobMonth().should('have.value', data.personalInformationDay)
    pageObjects
      .dobDay().should('have.value', data.personalInformationDay)
    pageObjects
      .dobYear().should('have.value', data.personalInformationYear)

    pageObjects
      .nextBtn().click()


    // address and location page
    // * check that user can not move forward without filling out fields
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('be.visible')

    // * check that current address works
    pageObjects
      .street().type(data.addressStreet)
    pageObjects
      .aptNumber().type(data.addressApt)
    pageObjects
      .city().type(data.addressTown)
    pageObjects
      .zip().type(data.addressZip)
    // Validate text box has correct text
    pageObjects
      .street().should('have.value', data.addressStreet)
    pageObjects
      .aptNumber().should('have.value', data.addressApt)
    pageObjects
      .city().should('have.value', data.addressTown)
    pageObjects
      .zip().should('have.value', data.addressZip)

    // * check that mailing address work
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[1]).click({force: true})
    })
    pageObjects
      .mailStreet().type(data.addressStreet)
    pageObjects
      .mailCity().type(data.addressTown)
    pageObjects
      .mailZip().type(data.addressZip)
    // Validate text box has correct text
    pageObjects
      .mailStreet().should('have.value', data.addressStreet)
    pageObjects
      .mailCity().should('have.value', data.addressTown)
    pageObjects
      .mailZip().should('have.value', data.addressZip)

    // * uncheck mailing address block
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[1]).click({force: true})
    })

    // * check does not have permanent option
    pageObjects
      .checkBox().then(checkBox => {
      cy.get(checkBox[0]).click({force: true})
    })

    pageObjects
      .mailStreet().type(data.addressStreet)
    pageObjects
      .mailCity().type(data.addressTown)
    pageObjects
      .mailZip().type(data.addressZip)
    cy.get('[class="usa-select radius-md"]').select(data.addressState)

    // Validate text box has correct text
    pageObjects
      .mailStreet().should('have.value', data.addressStreet)
    pageObjects
      .mailCity().should('have.value', data.addressTown)
    pageObjects
      .mailZip().should('have.value', data.addressZip)

    pageObjects
      .nextBtn().click()

    // identification
    // * check that user can not move forward without selecting an option
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('be.visible')

    // * state driver's license number
    pageObjects
      .dropDown().select("State driver's license number")
    pageObjects
      .driverId().type(data.idNumber)

    // Validate that fields have correct data
    pageObjects
      .driverId().should('have.value', data.idNumber)
    // * state id number
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("State non-driver ID")
    })

    pageObjects
      .stateId().type(data.idNumber)

    // Validate that fields have correct data
    pageObjects
      .stateId().should('have.value', data.idNumber)
    // * social security number (last 4 digits)
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("Social security number (last 4 digits)")
    })
    pageObjects
      .ssn().type(data.ssn)
    // Validate fields have correct data
    pageObjects
      .dropDown().should('have.value', data.ssnValue)
    pageObjects
      .ssn().should('have.value', data.ssn)

    // * no id
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("I do not have a valid ID.")
    })
    cy.get('p').should('contain.text', '"None" will appear on your completed form.')

    pageObjects
      .nextBtn().click()

    // political party
    pageObjects
      .politicalParty().type(data.politicalParty)

    pageObjects
      .nextBtn().click()

    // confirmation page
    pageObjects
      .confirm().click()
    pageObjects
      .nextBtn().click()


    pageObjects
      .addressConfirm().should('contain.text', 'Your Alabama mail-in registration form is complete and ready to print.')
    // * check that download opens in new window
    pageObjects
      .pdfBtnNewTab().click()
    cy.get('@open').should('have.been.calledOnce')

  })
})