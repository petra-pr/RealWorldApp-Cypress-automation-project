import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { logoutUsername, logoutSettingsButton, logoutButton, logoutNavbarItems } from './LogoutPage'

Given('The user is successfully logged in', () => {
    cy.loginApi('/')

    cy.get(logoutUsername)
        .should('contain.text', 'vurdo bidru')
})

When('The user accesses the profile page', () => {
    cy.get(logoutUsername)
        .should('contain.text', 'vurdo bidru') //fixtures todo
    cy.get(logoutNavbarItems)
        .should('have.length', 4)
    cy.get(logoutSettingsButton)
        .click()
    cy.url()
        .should('include', '/settings')
        
})

Then('The user logs out successfully', () => {
    cy.get(logoutButton)
        .should('contain', 'logout')
        .click()
    
    cy.get(logoutUsername)
        .should('not.exist')
    cy.get(logoutNavbarItems)
        .should('have.length', 3)
})

Then('The user has no access to the profile page', () => {
    cy.visit('/profiles/vurdobidru') //fixtures todo
    cy.url()
        .should('eq', Cypress.config().baseUrl)
    cy.get(logoutUsername)
        .should('not.exist')
})