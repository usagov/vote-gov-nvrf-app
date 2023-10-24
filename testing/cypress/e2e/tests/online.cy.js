/* eslint-disable no-undef */
/// <reference types="cypress" />
const data = require("../../fixtures/data.json");

describe('Validate Online', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-testid="dropdown"]').select(data.online)
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })
  })
  it('Validate Update Registration', () => {
    // check that state link opens in new tab
    cy.get('[class="usa-link usa-link--external"]').should('have.attr','target','_blank')

    // check that user CANNOT move forward with out confirming eligibility
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[2]).click()
    })
    cy.get('[id="eligibility-error"]').should('be.visible').contains('Both boxes must be checked to continue.')

    // check that user CAN move forward after confirming eligibility
    cy.get('[data-testid="checkbox"]').each(checkbox => {
      cy.get(checkbox).click()
    })
    cy.get('[class="usa-button"]').then(btn => {
        cy.get(btn[4]).click()
      })
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // fill out personal information 
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
    
    cy.get('[id="date_of_birth_month"]').select(data.personalInformationMonth)
    cy.get('[id="date_of_birth_day"]').type(data.personalInformationDay)
    cy.get('[id="date_of_birth_year"]').type(data.personalInformationYear)
    // Validate text box has correct text
    cy.get('[id="date_of_birth_month"]').should('have.value', data.personalInformationDay)
    cy.get('[id="date_of_birth_day"]').should('have.value', data.personalInformationDay)
    cy.get('[id="date_of_birth_year"]').should('have.value', data.personalInformationYear)
    
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // address and location page
    // * check that rural option takes away options
    cy.get('[data-testid="checkbox"]').then(checkBox => {
      cy.get(checkBox[0]).click()
    })
    cy.get('[data-testid="form"]').should('not.contain', 'Home Address')
    // * uncheck option
    cy.get('[data-testid="checkbox"]').click()
    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[0]).type(data.addressStreet)
      cy.get(textBox[2]).type(data.addressTown)
      cy.get(textBox[3]).type(data.addressZip)
      // Validate text box has correct text
      cy.get(textBox[0]).should('have.value', data.addressStreet) 
      cy.get(textBox[2]).should('have.value', data.addressTown)
      cy.get(textBox[3]).should('have.value', data.addressZip)
    })
    // * previous address
    cy.get('[data-testid="checkbox"]').then(checkBox => {
      cy.get(checkBox[1]).click()
    })
    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[6]).type(data.addressTown)
      cy.get(textBox[4]).type(data.addressStreet)
      cy.get(textBox[7]).type(data.addressZip)
      // Validate text box has correct text
      cy.get(textBox[4]).should('have.value', data.addressStreet) 
      cy.get(textBox[6]).should('have.value', data.addressTown)
      cy.get(textBox[7]).should('have.value', data.addressZip)
    })
    cy.get('[data-testid="dropdown"]').then(dropDown => {
      cy.get(dropDown[1]).select(data.addressAK)
    })
    
    // * mailing address
    cy.get('[data-testid="checkbox"]').then(checkBox => {
      cy.get(checkBox[2]).click()
    })
    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[8]).type(data.addressStreet)
      cy.get(textBox[10]).type(data.addressTown)
      cy.get(textBox[11]).type(data.addressZip)
      // Validate text box has correct text
      cy.get(textBox[8]).should('have.value', data.addressStreet) 
      cy.get(textBox[10]).should('have.value', data.addressTown)
      cy.get(textBox[11]).should('have.value', data.addressZip)
    })
    cy.get('[data-testid="dropdown"]').then(dropDown => {
      cy.get(dropDown[2]).select(data.addressAK)
    })
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // identification
    // * state id number
    cy.get('[data-testid="dropdown"]').select('State ID Number')
    cy.get('[data-testid="textInput"]').type('123456789')
    
    cy.get('[class="usa-select"]').then(dropDown => {
      cy.get(dropDown[1]).select(data.idMonth)
      cy.get('[name="id_issue_date_day"]').type(data.idDay)
      cy.get('[name="id_issue_date_year"]').type(data.idYear)
      cy.get(dropDown[2]).select(data.idMonth)
      cy.get('[name="id_expire_date_day"]').type(data.idExpireDay)
      cy.get('[name="id_expire_date_year"]').type(data.idExpireYear)
    })
    // Validate that fields have correct data
    cy.get('[class="usa-select"]').then(dropDown => {
      cy.get(dropDown[1]).should('have.value', data.idDay)
      cy.get('[name="id_issue_date_day"]').should('have.value', data.idDay)
      cy.get('[name="id_issue_date_year"]').should('have.value', data.idYear)
      cy.get(dropDown[2]).should('have.value', data.idDay)
      cy.get('[name="id_expire_date_day"]').should('have.value', data.idExpireDay)
      cy.get('[name="id_expire_date_year"]').should('have.value', data.idExpireYear)
    })
    // * social security number (last 4 digits)
    cy.get('[data-testid="dropdown"]').select('Social Security Number (last 4 digits)')
    cy.get('[data-testid="textInput"]').type(data.ssn)
    // Validate fields have correct data 
    cy.get('[data-testid="dropdown"]').should('have.value', data.ssnValue)
    cy.get('[data-testid="textInput"]').should('have.value', data.ssn)

    // * no id
    cy.get('[data-testid="dropdown"]').select('I do not have a valid ID number')
    cy.get('[id="main-content"]').should('contain.text', 'This option will print "none" on the PDF.')

    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // political party (optional)
    cy.get('[data-testid="textInput"]').type(data.politicalParty)

    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // confirmation page
    cy.get('[id="acknowledge-check"]').click({force: true})
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[5]).click()
    })

    // * check that download opens in new window
    cy.get('@open').should('have.been.calledOnce')
  })

  it('Validate New Registration', () => {
    // check that state link opens in new tab
    cy.get('[class="usa-link usa-link--external"]').should('have.attr','target','_blank')

    // check that user CANNOT move forward with out confirming eligibility
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[2]).click()
    })
    cy.get('[id="eligibility-error"]').should('be.visible').contains('Both boxes must be checked to continue.')

    // check that user CAN move forward after confirming eligibility
    cy.get('[data-testid="checkbox"]').each(checkbox => {
      cy.get(checkbox).click()
    })
    cy.get('[class="usa-button"]').then(btn => {
        cy.get(btn[4]).click()
      })
    // select the update registration option 
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[2]).click()
    })

    // fill out personal information 
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
    
    cy.get('[id="date_of_birth_month"]').select(data.personalInformationMonth)
    cy.get('[id="date_of_birth_day"]').type(data.personalInformationDay)
    cy.get('[id="date_of_birth_year"]').type(data.personalInformationYear)
    // Validate text box has correct text
    cy.get('[id="date_of_birth_month"]').should('have.value', data.personalInformationDay)
    cy.get('[id="date_of_birth_day"]').should('have.value', data.personalInformationDay)
    cy.get('[id="date_of_birth_year"]').should('have.value', data.personalInformationYear)
    
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // address and location page
    // * check that rural option takes away options
    cy.get('[data-testid="checkbox"]').then(checkBox => {
      cy.get(checkBox[0]).click()
    })
    cy.get('[data-testid="form"]').should('not.contain', 'Home Address')
    // * uncheck option
    cy.get('[data-testid="checkbox"]').click()
    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[0]).type(data.addressStreet)
      cy.get(textBox[2]).type(data.addressTown)
      cy.get(textBox[3]).type(data.addressZip)
      // Validate text box has correct text
      cy.get(textBox[0]).should('have.value', data.addressStreet) 
      cy.get(textBox[2]).should('have.value', data.addressTown)
      cy.get(textBox[3]).should('have.value', data.addressZip)
    })
    
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // identification
    // * state id number
    cy.get('[data-testid="dropdown"]').select('State ID Number')
    cy.get('[data-testid="textInput"]').type('123456789')
    
    cy.get('[class="usa-select"]').then(dropDown => {
      cy.get(dropDown[1]).select(data.idMonth)
      cy.get('[name="id_issue_date_day"]').type(data.idDay)
      cy.get('[name="id_issue_date_year"]').type(data.idYear)
      cy.get(dropDown[2]).select(data.idMonth)
      cy.get('[name="id_expire_date_day"]').type(data.idExpireDay)
      cy.get('[name="id_expire_date_year"]').type(data.idExpireYear)
    })
    // Validate that fields have correct data
    cy.get('[class="usa-select"]').then(dropDown => {
      cy.get(dropDown[1]).should('have.value', data.idDay)
      cy.get('[name="id_issue_date_day"]').should('have.value', data.idDay)
      cy.get('[name="id_issue_date_year"]').should('have.value', data.idYear)
      cy.get(dropDown[2]).should('have.value', data.idDay)
      cy.get('[name="id_expire_date_day"]').should('have.value', data.idExpireDay)
      cy.get('[name="id_expire_date_year"]').should('have.value', data.idExpireYear)
    })
    // * social security number (last 4 digits)
    cy.get('[data-testid="dropdown"]').select('Social Security Number (last 4 digits)')
    cy.get('[data-testid="textInput"]').type(data.ssn)
    // Validate fields have correct data 
    cy.get('[data-testid="dropdown"]').should('have.value', data.ssnValue)
    cy.get('[data-testid="textInput"]').should('have.value', data.ssn)

    // * no id
    cy.get('[data-testid="dropdown"]').select('I do not have a valid ID number')
    cy.get('[id="main-content"]').should('contain.text', 'This option will print "none" on the PDF.')

    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // political party (optional)
    cy.get('[data-testid="textInput"]').type(data.politicalParty)

    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // confirmation page
    cy.get('[id="acknowledge-check"]').click({force: true})
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[5]).click()
    })

    // * check that download opens in new window
    cy.get('@open').should('have.been.calledOnce')

  })
})