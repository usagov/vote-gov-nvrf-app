/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Verify Flow Within Form', () => {
  beforeEach('Complete Form', () => {
    // sign in and complete form 
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    // cy.get('[data-test="dropDown"]').select(data.inPerson)
    // cy.get('[data-test="nextBtn"]').click()
    cy.completeForm()
  })
  it('Verify Back Buttons', () => {
    // check that the form back buttons will take user back to the correct page
    cy.get('[data-test="backBtn"]').should('contain.text', 'Edit registration information')

    cy.get('[data-test="backBtn"]').click()
    cy.get('[data-test="backBtn"]').should('contain.text', 'Back to identification')

    cy.get('[data-test="backBtn"]').click()
    cy.get('[data-test="backBtn"]').should('contain.text', 'Back to address and location')

    cy.get('[data-test="backBtn"]').click()
    cy.get('[data-test="backBtn"]').should('contain.text', 'Back to personal information')

    cy.get('[data-test="backBtn"]').click()
    cy.get('[data-test="backBtn"]').should('contain.text', 'Back to registration options')

    cy.get('[data-test="backBtn"]').click()
    cy.get('[data-test="backBtn"]').should('contain.text', 'Back to state eligibility requirements')

    // cy.get('[data-test="backBtn"]').click()
    // cy.get('[data-test="backBtn"]').should('contain.text', 'Go back to state registration options')

    // cy.get('[data-test="backBtn"]').click()
    // cy.get('[data-test="backBtn"]').should('contain.text', 'Go back to select your state')

  })

  it('Verify Edit Buttons', () => {
    // personal information
    cy.get('[data-test="editBtn"]').then(editBtn => {
      cy.get(editBtn[0]).click()
      cy.get('[data-testid="form"]').find('h2').should('contain.text', 'Personal information')
      cy.get('[data-test="nextBtn"]').click().click().click().click()
    })

    // address
    cy.get('[data-test="editBtn"]').then(editBtn => {
      cy.get(editBtn[1]).click({force: true})
      cy.get('[data-testid="form"]').find('h2').should('contain.text', 'Address and location')
      cy.get('[data-test="nextBtn"]').click().click().click()
      
    })
    // identification
    cy.get('[data-test="editBtn"]').then(editBtn => {
      cy.get(editBtn[2]).click({force: true})
      cy.get('[data-testid="form"]').find('h2').should('contain.text', 'Identification')
      cy.get('h2').should('contain.text', 'Identification')
      cy.get('[data-test="nextBtn"]').click().click()
    })

    // political party 
    cy.get('[data-test="editBtn"]').then(editBtn => {
      cy.get(editBtn[3]).click({force: true})
      cy.get('[data-testid="form"]').find('h2').should('contain.text', 'Political party')
    
      cy.get('[data-test="nextBtn"]').click()
    })
  })

  it('Verify Fields are correct', () => {

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
        // cy.get(li[1]).should('contain.text', data.addressApt)
        cy.get(li[1]).should('contain.text', data.addressTown)
        cy.get(li[2]).should('contain.text', data.addressState)
        cy.get(li[3]).should('contain.text', data.addressZip)
      })
    // political party 
    cy.get(ul[7]).find('li').then(li => {
      cy.get(li[0]).should('contain.text', data.politicalParty)

  })
})
  })
})