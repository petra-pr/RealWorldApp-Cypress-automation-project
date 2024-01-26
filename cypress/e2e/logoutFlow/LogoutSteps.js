import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { logoutSettingsButton, logoutButton, logoutNavbarItems } from './LogoutPage'
import { displayedUsername } from '../../support/commonSelectors';

Given('The user is successfully logged in', () => {
    cy.loginApi('/')

    cy.get(displayedUsername) //The user's username is displayed in the navbar
})

When('The user accesses the profile page', () => {
    cy.get(displayedUsername) //The user's username is displayed in the navbar
        .should('contain', Cypress.env('userName'))
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
    
    cy.get(displayedUsername)
        .should('not.exist')
    cy.get(logoutNavbarItems)
        .should('have.length', 3)
})

Then('The user has no access to the settings page', () => {
    cy.visit('/settings')
    cy.url()
        .should('eq', Cypress.config().baseUrl)
    cy.get(displayedUsername)
        .should('not.exist')
})
