/* eslint-disable no-undef */
/// <reference types="cypress" />
import { pageObjects } from "../../support/pageObjects.js";

function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`,
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }),
  );

  cy.task("table", violationData);
}

describe("Run Axe on form pages", () => {
  beforeEach("login to app", () => {
    cy.visit("/");
    cy.completeForm();
  });
  it("Check A11y", () => {
    pageObjects.backBtn().click().click().click().click();

    // Personal Info
    cy.injectAxe();
    cy.configureAxe({
      runOnly: {
        values: ["wcag2aa"],
      },
    });
    cy.checkA11y(null, null, terminalLog);

    // Address
    pageObjects.nextBtn().click();
    cy.injectAxe();
    cy.configureAxe({
      runOnly: {
        values: ["wcag2aa"],
      },
    });
    cy.checkA11y(null, null, terminalLog);

    // Identification
    pageObjects.nextBtn().click();
    cy.injectAxe();
    cy.configureAxe({
      runOnly: {
        values: ["wcag2aa"],
      },
    });
    cy.checkA11y(null, null, terminalLog);

    // Political Party
    pageObjects.nextBtn().click();
    cy.injectAxe();
    cy.configureAxe({
      runOnly: {
        values: ["wcag2aa"],
      },
    });
    cy.checkA11y(null, null, terminalLog);

    // Confirm
    pageObjects.nextBtn().click();
    cy.injectAxe();
    cy.configureAxe({
      runOnly: {
        values: ["wcag2aa"],
      },
    });
    cy.checkA11y(null, null, terminalLog);
  });
});
