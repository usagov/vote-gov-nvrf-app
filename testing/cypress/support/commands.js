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
cy.get('[class="usa-checkbox__label"]').click()
// cy.pause()

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

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.personalInformationName)
  cy.get(textBox[1]).type(data.personalInformationMiddle)
  cy.get(textBox[2]).type(data.personalInformationLast)
  cy.get(textBox[3]).type(data.personalInformationNumber)
})

cy.get('[data-test="dobMonth"]').type(data.personalInformationMonth)
cy.get('[data-test="dobDay"]').type(data.personalInformationDay)
cy.get('[data-test="dobYear"]').type(data.personalInformationYear)

cy.get('[class="usa-checkbox__label"]').click()
cy.get('[data-test="select"]').then(dropdown => {

  // cy.get(dropdown[1])
  // title
  cy.get(dropdown[2]).select(data.personalInformationTitle)
  cy.get(dropdown[2]).should('contain', data.personalInformationTitle)
  // suffix
  cy.get(dropdown[3]).select(data.personalInformationSuffix)
  cy.get(dropdown[3]).should('contain', data.personalInformationSuffix)
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[5]).type(data.personalInformationName)
  cy.get(textBox[6]).type(data.personalInformationMiddle)
  cy.get(textBox[7]).type(data.personalInformationLast)
})

cy.get('[data-test="nextBtn"]').click()

// address and location page
// * check that current address works
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get(textBox[1]).type(data.addressApt)
  cy.get(textBox[2]).type(data.addressTown)
  cy.get(textBox[3]).type(data.addressZip)
})

// * check that mailing address work 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[2]).click()
})
cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[4]).type(data.addressStreet)
  cy.get(textBox[5]).type(data.addressTown)
  cy.get(textBox[6]).type(data.addressZip)
})
// * uncheck mailing address block
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[2]).click()
})

// * check recently moved option 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[0]).click()
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[4]).type(data.addressStreet)
  cy.get(textBox[5]).type(data.addressApt)
  cy.get(textBox[6]).type(data.addressTown)
  cy.get(textBox[7]).type(data.addressZip)
})
// * uncheck recently moved block
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[0]).click()
})

// * check does not have permanent option 
cy.get('[class="usa-checkbox__label"]').then(checkBox => {
  cy.get(checkBox[1]).click()
})

cy.get('[data-testid="textInput"]').then(textBox => {
  cy.get(textBox[0]).type(data.addressStreet)
  cy.get(textBox[1]).type(data.addressTown)
  cy.get(textBox[2]).type(data.addressZip)
  cy.get('[data-testid="Select"]').select(data.addressState)
})

cy.get('[data-test="nextBtn"]').click()


// identification
// * state driver's license number
cy.get('[data-test="dropDown"]').select("State driver's license number")
cy.get('[data-testid="textInput"]').type(data.idNumber)
// * social security number (last 4 digits)
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("Social security number (last 4 digits)")
})
cy.get('[data-testid="textInput"]').type(data.ssn)

// * no id
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("I do not have a valid ID number.")
})
cy.get('p').should('contain.text', '"None" will appear on your completed form.')

// * state id number
cy.get('[data-test="dropDown"]').then(dropDown => {
  cy.get(dropDown[0]).select("State non-driver ID")
})
cy.get('[data-testid="textInput"]').type(data.idNumber)


cy.get('[data-test="nextBtn"]').click()

  // political party
  cy.get('[data-testid="textInput"]').type(data.politicalParty)

  cy.get('[data-test="nextBtn"]').click()


  })
