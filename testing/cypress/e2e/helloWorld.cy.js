/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Check login', () => {
  beforeEach('login to app', () => {
    cy.visit('/')
    cy.signin(Cypress.env('username'), Cypress.env('password'))
  })
  it('login', () => {
    cy.get('[data-test="main-header"]').should('be.visible')
  })
})