/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './commands';
import 'cypress-mochawesome-reporter/register';
import 'cypress-axe';

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
return false;});