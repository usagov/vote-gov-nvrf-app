/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Check ME', () => {
  beforeEach('login to app', () => {
    cy.signin(Cypress.env('username'), Cypress.env('password'))
    cy.get('[data-testid="dropdown"]').select('Maine')
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })
  })
  it('Verify Update Registration', () => {
    // check that state link opens in new tab
    cy.get('[class="usa-link usa-link--external"]').should('have.attr','target','_blank')

    // check that user CANNOT move forward with out confirming eligibility
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.get('[id="eligibility-error"]').should('be.visible').contains('Both boxes must be checked to continue.')

    // check that user CAN move forward after confirming eligibility
    cy.get('[data-testid="checkbox"]').each(checkbox => {
      cy.get(checkbox).click()
    })
  
    cy.get('[class="usa-button"]').then(btn => {
        cy.get(btn[3]).click()
      })

    // select the update registration option 
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // fill out personal information 
    cy.get('[data-testid="dropdown"]').then(dropdown => {
      // title
      cy.get(dropdown[0]).select('Mr.')
      cy.get(dropdown[0]).should('contain', 'Mr.')
      // suffix
      cy.get(dropdown[1]).select('IV')
      cy.get(dropdown[1]).should('contain', 'IV')
    })

    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[0]).type('John')
      cy.get(textBox[1]).type('Middle Name')
      cy.get(textBox[2]).type('Doe')
      cy.get(textBox[3]).type('5555555555')
      // verify text box has correct text
      cy.get(textBox[0]).should('have.value', 'John')
      cy.get(textBox[1]).should('have.value', 'Middle Name')  
      cy.get(textBox[2]).should('have.value', 'Doe')
      cy.get(textBox[3]).should('have.value', '(555) 555-5555')
    })

    cy.get('[id="date_of_birth_month"]').select('01 - January')
    cy.get('[id="date_of_birth_day"]').type('01')
    cy.get('[id="date_of_birth_year"]').type('1990')

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
      cy.get(textBox[0]).type('123 Easy Street')
      cy.get(textBox[2]).type('Test Town')
      cy.get(textBox[3]).type('12345')
      // verify text box has correct text
      cy.get(textBox[0]).should('have.value', '123 Easy Street') 
      cy.get(textBox[2]).should('have.value', 'Test Town')
      cy.get(textBox[3]).should('have.value', '12345')
    })
    // * previous address
    cy.get('[data-testid="checkbox"]').then(checkBox => {
      cy.get(checkBox[1]).click()
    })
    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[4]).type('123 Easy Street')
      cy.get(textBox[6]).type('Test Town')
      cy.get(textBox[7]).type('12345')
      // verify text box has correct text
      cy.get(textBox[4]).should('have.value', '123 Easy Street') 
      cy.get(textBox[6]).should('have.value', 'Test Town')
      cy.get(textBox[7]).should('have.value', '12345')
    })
    cy.get('[data-testid="dropdown"]').then(dropDown => {
      cy.get(dropDown[1]).select('Alaska')
    })
    
    // * mailing address
    cy.get('[data-testid="checkbox"]').then(checkBox => {
      cy.get(checkBox[2]).click()
    })
    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[8]).type('123 Easy Street')
      cy.get(textBox[10]).type('Test Town')
      cy.get(textBox[11]).type('12345')
      // verify text box has correct text
      cy.get(textBox[8]).should('have.value', '123 Easy Street') 
      cy.get(textBox[10]).should('have.value', 'Test Town')
      cy.get(textBox[11]).should('have.value', '12345')
    })
    cy.get('[data-testid="dropdown"]').then(dropDown => {
      cy.get(dropDown[2]).select('Alaska')
    })
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // identification
    // * state id number
    cy.get('[data-testid="dropdown"]').select('State ID Number')
    cy.get('[data-testid="textInput"]').type('123456789')
    
    cy.get('[class="usa-select"]').then(dropDown => {
      cy.get(dropDown[1]).select('01 - January')
      cy.get('[name="id_issue_date_day"]').type('01')
      cy.get('[name="id_issue_date_year"]').type('1990')
      cy.get(dropDown[2]).select('01 - January')
      cy.get('[name="id_expire_date_day"]').type('02')
      cy.get('[name="id_expire_date_year"]').type('3000')
    })
    // * social security number (last 4 digits)
    cy.get('[data-testid="dropdown"]').select('Social Security Number (last 4 digits)')
    cy.get('[data-testid="textInput"]').type('123456789')

    // * no id
    cy.get('[data-testid="dropdown"]').select('I do not have a valid ID number')
    cy.get('[id="main-content"]').should('contain.text', 'This option will print "none" on the PDF.')

    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // political party (required)
    cy.get('[class="required-text"]').should('be.visible')
    cy.get('[data-testid="textInput"]').type('Test')
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

  it('Verify New Registration', () => {
    // check that state link opens in new tab
    cy.get('[class="usa-link usa-link--external"]').should('have.attr','target','_blank')

    // check that user CANNOT move forward with out confirming eligibility
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.get('[id="eligibility-error"]').should('be.visible').contains('Both boxes must be checked to continue.')

    // check that user CAN move forward after confirming eligibility
    cy.get('[data-testid="checkbox"]').each(checkbox => {
      cy.get(checkbox).click()
    })
    cy.get('[class="usa-button"]').then(btn => { 
        cy.get(btn[3]).click()
      })

    // select the update registration option 
    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // fill out personal information 
    cy.get('[data-testid="dropdown"]').then(dropdown => {
      // title
      cy.get(dropdown[0]).select('Mr.')
      cy.get(dropdown[0]).should('contain', 'Mr.')
      // suffix
      cy.get(dropdown[1]).select('IV')
      cy.get(dropdown[1]).should('contain', 'IV')
    })

    cy.get('[data-testid="textInput"]').then(textBox => {
      cy.get(textBox[0]).type('John')
      cy.get(textBox[1]).type('Middle Name')
      cy.get(textBox[2]).type('Doe')
      cy.get(textBox[3]).type('5555555555')
      // verify text box has correct text
      cy.get(textBox[0]).should('have.value', 'John')
      cy.get(textBox[1]).should('have.value', 'Middle Name')  
      cy.get(textBox[2]).should('have.value', 'Doe')
      cy.get(textBox[3]).should('have.value', '(555) 555-5555')
    })

    cy.get('[id="date_of_birth_month"]').select('01 - January')
    cy.get('[id="date_of_birth_day"]').type('01')
    cy.get('[id="date_of_birth_year"]').type('1990')

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
      cy.get(textBox[0]).type('123 Easy Street')
      cy.get(textBox[2]).type('Test Town')
      cy.get(textBox[3]).type('12345')
      // verify text box has correct text
      cy.get(textBox[0]).should('have.value', '123 Easy Street') 
      cy.get(textBox[2]).should('have.value', 'Test Town')
      cy.get(textBox[3]).should('have.value', '12345')
    })

    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // identification
    // * state id number
    cy.get('[data-testid="dropdown"]').select('State ID Number')
    cy.get('[data-testid="textInput"]').type('123456789')
    
    cy.get('[class="usa-select"]').then(dropDown => {
      cy.get(dropDown[1]).select('01 - January')
      cy.get('[name="id_issue_date_day"]').type('01')
      cy.get('[name="id_issue_date_year"]').type('1990')
      cy.get(dropDown[2]).select('01 - January')
      cy.get('[name="id_expire_date_day"]').type('02')
      cy.get('[name="id_expire_date_year"]').type('3000')
    })
    // * social security number (last 4 digits)
    cy.get('[data-testid="dropdown"]').select('Social Security Number (last 4 digits)')
    cy.get('[data-testid="textInput"]').type('123456789')

    // * no id
    cy.get('[data-testid="dropdown"]').select('I do not have a valid ID number')
    cy.get('[id="main-content"]').should('contain.text', 'This option will print "none" on the PDF.')

    cy.get('[data-testid="button"]').then(btn => {
      cy.get(btn[1]).click()
    })

    // political party (required)
    cy.get('[class="required-text"]').should('be.visible')
    cy.get('[data-testid="textInput"]').type('Test')

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