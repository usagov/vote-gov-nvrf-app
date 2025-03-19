/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");
import {pageObjects} from '../../support/pageObjects.js'

describe('Validate Errors', () => {
  beforeEach('login to app', () => {
    cy.visit('/')
  })
  it('Check Error Functions', () => {
    // Move forward in test
    pageObjects
      .nextBtn().click()
    pageObjects
      .nextBtn().click()
    pageObjects
      .checkBoxEligibility().click({force: true})
    pageObjects
      .nextBtn().click()

    // select registration option
    pageObjects
      .pathBtn().then(btn => {
      cy.get(btn[1]).click()
    })

    // check errors on personal information are working
    //  * testing required fields are filled out before user can move forward
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'First name must be filled out.')
    pageObjects
      .firstName().type(data.personalInformationName)
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'Last name must be filled out.')
    pageObjects
      .lastName().type(data.personalInformationLast)

    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'Error: This field is required.')

    pageObjects
      .dobMonth().type(data.personalInformationMonth)
    pageObjects
      .dobDay().type(data.personalInformationDay)
    pageObjects
      .dobYear().type(data.personalInformationYear)

    pageObjects
      .nextBtn().click()

    // address and location page
    // * check that errors for required fields are working
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'Street address must be filled out.')
    pageObjects
      .street().type(data.addressStreet)
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'City name must be filled out.')
    pageObjects
      .city().type(data.addressTown)
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'ZIP code must be 5 digits.')
    pageObjects
      .zip().type(data.addressZip)

    pageObjects
      .nextBtn().click()

    // identification
    // * state driver's license number required fields are needed to move forward
    pageObjects
      .dropDown().select("State driver's license number")
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'ID number must be filled out.')
    pageObjects
      .driverId().type(data.idNumber)
    // * state id number
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("State non-driver ID")
    })
    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'ID number must be filled out.')
    pageObjects
      .stateId().type(data.idNumber)

    // * social security number (last 4 digits)
    pageObjects
      .dropDown().then(dropDown => {
      cy.get(dropDown[0]).select("Social security number (last 4 digits)")
    })

    pageObjects
      .nextBtn().click().click()
    pageObjects
      .errorText().should('contain.text', 'Social security number must be 4 digits.')
    pageObjects
      .ssn().type(data.ssn)
    pageObjects
      .nextBtn().click()

    // political party
    pageObjects
      .nextBtn().click()

    // confirmation page
    pageObjects
      .nextBtn().click()
    pageObjects
      .errorText().should('contain.text', 'Checkbox must be checked to continue.')
    pageObjects
      .checkBoxConfirm().click({force: true})
  })
})
