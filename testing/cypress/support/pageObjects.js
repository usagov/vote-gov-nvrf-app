class PageObjects {

  nextBtn() {
    return cy.get('[data-test="nextBtn"]')
  }

  errorText() {
    return cy.get('[data-test="errorText"]')
  }

  checkBox() {
    return cy.get('[data-test="checkBox"]')
  }

  pathBtn() {
    return cy.get('[data-test="pathBtn"]')
  }

  select() {
    return cy.get('[data-test="select"]')
  }

  firstName() {
    return cy.get('[data-test="firstName"]')
  }

  middleName() {
    return cy.get('[data-test="middleName"]')
  }

  lastName() {
    return cy.get('[data-test="lastName"]')
  }

  phoneNumber() {
    return cy.get('[data-test="phoneNumber"]')
  }

  checkBox() {
    return cy.get('[data-test="checkBox"]')
  }

  prevFirstName() {
    return cy.get('[data-test="prevFirstName"]')
  }

  prevMiddleName() {
    return cy.get('[data-test="prevMiddleName"]')
  }

  prevLastName() {
    return cy.get('[data-test="prevLastName"]')
  }

  dobMonth() {
    return cy.get('[data-test="dobMonth"]')
  }

  dobDay() {
    return cy.get('[data-test="dobDay"]')
  }

  dobYear() {
    return cy.get('[data-test="dobYear"]')
  }

  street() {
    return cy.get('[data-test="street"]')
  }

  aptNumber() {
    return cy.get('[data-test="aptNumber"]')
  }

  city() {
    return cy.get('[data-test="city"]')
  }

  zip() {
    return cy.get('[data-test="zip"]')
  }

  mailStreet() {
    return cy.get('[data-test="mailStreet"]')
  }

  mailCity() {
    return cy.get('[data-test="mailCity"]')
  }

  mailZip() {
    return cy.get('[data-test="mailZip"]')
  }

  prevStreet() {
    return cy.get('[data-test="prevStreet"]')
  }

  prevCity() {
    return cy.get('[data-test="prevCity"]')
  }

  prevZip() {
    return cy.get('[data-test="prevZip"]')
  }

  prevAptNumber() {
    return cy.get('[data-test="prevAptNumber"]')
  }

  dropDown() {
    return cy.get('[data-test="dropDown"]')
  }

  driverId() {
    return cy.get('[data-test="driverId"]')
  }

  stateId() {
    return cy.get(('[data-test="stateId"]'))
  }

  ssn() {
    return cy.get('[data-test="ssn"]')
  }

  politicalParty() {
    return cy.get('[data-test="politicalParty"]')
  }

  confirm() {
    return cy.get('[data-test="confirm"]')
  }

  addressConfirm() {
    return cy.get('[data-test="addressConfirm"]')
  }

  pdfBtnNewTab() {
    return cy.get('[data-test="pdfBtnNewTab"]')
  }

  backBtn() {
    return cy.get('[data-test="backBtn"]')
  }

  editBtn() {
    return cy.get('[data-test="editBtn"]')
  }

}

export const pageObjects = new PageObjects()