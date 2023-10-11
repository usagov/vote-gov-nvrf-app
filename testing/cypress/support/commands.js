/* eslint-disable no-undef */
Cypress.Commands.add('signin', (username, password) => {

  cy.visit('/')
  cy.get('[id="loginUser"]').type(username)
  cy.get('[id="loginPass"]').type(password)

  cy.get('[id="loginConfirm"]').click()

});