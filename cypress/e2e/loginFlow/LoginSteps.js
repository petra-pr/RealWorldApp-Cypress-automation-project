import { When, Then, Given} from "@badeball/cypress-cucumber-preprocessor";
import { loginEmail, loginPassword, loginButton, loginErrorMessage, loginUsername } from "./LoginPage";

Given('The user accesses the login page', () => {
    cy.visit('/login')
})

When('The user types in incorrect credentials', () => {
    cy.get(loginEmail)
        .type('vurdobidru@gufum.com') //fixtures todo
    cy.get(loginPassword)
        .type('vurdobidru') //fixtures todo
    cy.get(loginButton)
        .click()
})

When('The user types in correct credentials', () => {
    cy.get(loginEmail) //commands todo
        .type('vurdobidru@gufum.com')
    cy.get(loginPassword)
        .type('vurdobidru@gufum')
    cy.get(loginButton)
        .click()
})

Then('The user is denied entry into the application', () => {
    cy.intercept('POST', 'https://api.realworld.io/api/users/login').as('loginDenied')

    cy.wait('@loginDenied')
        .its('response.statusCode')
        .should('eq', 403)

    cy.get(loginErrorMessage)
        .should('be.visible')
        .and('have.text', "email or password is invalid")
})

Then('The user accesses the application', () => {
    cy.intercept('POST', 'https://api.realworld.io/api/users/login').as('loginApproved')

    cy.wait('@loginApproved')
        .its('response.statusCode')
        .should('eq', 200)
})

Then('The user is taken to the home page', () => {
    cy.url()
        .should('eq', Cypress.config().baseUrl)
})

Then('The user sees their user name on the home page', () => {
    cy.get(loginUsername)
        .should('be.visible')
        .and('contain', 'vurdo bidru') //fixtures todo
})