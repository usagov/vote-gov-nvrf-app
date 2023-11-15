/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Verify Flow Within Form', () => {
  beforeEach('Complete Form', () => {
    // sign in and complete form 
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-testid="dropdown"]').select(data.inPerson)
    cy.completeForm()
  })
  it('Verify Back Buttons', () => {
    // check that the form back buttons will take user back to the correct page
    cy.get('[class="usa-button usa-button--outline back-button"]').click()

    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Edit registration information')

    cy.get('[class="usa-button usa-button--outline back-button"]').click()
    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Back to identification')


    cy.get('[class="usa-button usa-button--outline back-button"]').click()
    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Back to address and location')


    cy.get('[class="usa-button usa-button--outline back-button"]').click()
    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Back to personal information')


    cy.get('[class="usa-button usa-button--outline back-button"]').click()
    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Back to registration options')

    cy.get('[class="usa-button usa-button--outline back-button"]').click()
    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Back to State Eligibility Requirements')

    cy.get('[class="usa-button usa-button--outline back-button"]').click()
    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Back to State Registration Options')

    cy.get('[class="usa-button usa-button--outline back-button"]').click()
    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Go back to select your state')

    cy.get('[class="usa-button usa-button--outline back-button"]').click()
    cy.get('[class="usa-button usa-button--outline back-button"]').should('contain.text', 'Go back to Vote.gov')

  })

  it('Verify Edit Buttons', () => {
    cy.get('[class="usa-button usa-button--outline back-button"]').click()

    // personal information
    cy.get('[class="usa-button usa-button--unstyled"]').then(editBtn => {
      cy.get(editBtn[0]).click()
      cy.get('h2').should('contain.text', 'Personal Information')
      cy.get('[class="usa-button next-button"]').click().click().click().click()
    })

    // address
    cy.get('[class="usa-button usa-button--unstyled"]').then(editBtn => {
      cy.get(editBtn[1]).click({force: true})
      cy.get('h3').should('contain.text', 'Address & Location Information')
      cy.get('[class="usa-button next-button"]').click().click().click()
      
    })
    // identification
    cy.get('[class="usa-button usa-button--unstyled"]').then(editBtn => {
      cy.get(editBtn[2]).click({force: true})
      cy.get('h2').should('contain.text', 'Identification')
      cy.get('[class="usa-button next-button"]').click().click()
    })

    // political party 
    cy.get('[class="usa-button usa-button--unstyled"]').then(editBtn => {
      cy.get(editBtn[3]).click({force: true})
      cy.get('h2').should('contain.text', 'Choice of Political Party')
      cy.get('[class="usa-button next-button"]').click()
    })
  })

  it('Verify Fields are correct', () => {
    cy.get('[class="usa-button usa-button--outline back-button"]').click()

    // verify that fields on confirmation page have the expected information
    cy.get('[class="confirm-info"]').find('ul').then(ul => {
      // current name
      cy.get(ul[0]).find('li').then(li => {
        cy.get(li[0]).should('contain.text', data.personalInformationTitle)
        cy.get(li[1]).should('contain.text', data.personalInformationName)
        cy.get(li[2]).should('contain.text', data.personalInformationMiddle)
        cy.get(li[3]).should('contain.text', data.personalInformationLast)
        cy.get(li[4]).should('contain.text', data.personalInformationSuffix)
      })
      // previous name
      cy.get(ul[1]).find('li').then(li => {
        cy.get(li[0]).should('contain.text', data.personalInformationTitle)
        cy.get(li[1]).should('contain.text', data.personalInformationName)
        cy.get(li[2]).should('contain.text', data.personalInformationMiddle)
        cy.get(li[3]).should('contain.text', data.personalInformationLast)
        cy.get(li[4]).should('contain.text', data.personalInformationSuffix)
      })
      // other information
      cy.get(ul[2]).find('li').then(li => {
        cy.get(li[0]).should('contain.text', data.personalInformationYear)
        cy.get(li[1]).should('contain.text', data.personalInformationNumber2)
        cy.get(li[2]).should('contain.text', 'Not required for your state')
      })
      // address
      cy.get(ul[5]).find('li').then(li => {
        cy.get(li[0]).should('contain.text', data.addressStreet)
        cy.get(li[1]).should('contain.text', data.addressApt)
        cy.get(li[2]).should('contain.text', data.addressTown)
        cy.get(li[3]).should('contain.text', data.addressState)
        cy.get(li[4]).should('contain.text', data.addressZip)
      })
      // other identification
      cy.get(ul[6]).find('li').then(li => {
        cy.get(li[0]).should('contain.text', data.idNumber)
        cy.get(li[1]).should('contain.text', data.idYear)
        cy.get(li[2]).should('contain.text', data.idExpireYear)
    })
    // political party 
    cy.get(ul[7]).find('li').then(li => {
      cy.get(li[0]).should('contain.text', data.politicalParty)

  })
})
  })
})