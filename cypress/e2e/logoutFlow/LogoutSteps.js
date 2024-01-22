import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { logoutUsername, logoutSettingsButton, logoutButton, logoutNavbarItems } from './LogoutPage'

Given('The user is successfully logged in', () => {
    cy.request( //command todo
        'POST', 
        'https://api.realworld.io/api/users/login',
        {user:{email:"vurdobidru@gufum.com",password:"vurdobidru@gufum"}} //fixtures todo
    )

    cy.visit('/')
    cy.get(logoutUsername)
        .should('contain.text', 'vurdo bidru')
    cy.pause()
})

When('The user accesses the profile page', () => {
    cy.get(logoutUsername)
        .should('contain.text', 'vurdo bidru') //fixtures todo
    cy.get(logoutNavbarItems)
        .should('have.length', 4)
    cy.get(logoutSettingsButton)
        .click()
    cy.url()
        .should('include', '/settings/')
        
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