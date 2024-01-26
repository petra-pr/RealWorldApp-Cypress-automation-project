import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { articleContainer } from "../../support/commonSelectors";
import { commentForm, commentSubmitButton, comments } from "./commentingPage";

before(() => {
    //Log in
    cy.loginApi("/");
})

Given('I am on the homepage', () => {
  cy.loadHomepage()

});

When('I comment on a post', () => {
    cy.intercept('GET', '**/api/articles/*').as('getArticle')
    cy.intercept('POST', '**/api/articles/*/comments').as('postComment')

    //Open the last article
    cy.get(articleContainer)
        .last()
        .scrollIntoView()
        .should('not.contain', Cypress.env('userName'))
        .click()
    cy.wait('@getArticle')

    //Fill in the comment form and submit
    cy.get(commentForm)
        .type('This is a comment')
    cy.get(commentSubmitButton)
        .click()
    cy.wait('@postComment')
        .its('response.statusCode')
        .should('eq', 200)
})

Then('I should see This is a comment posted below the article', () => {
    cy.get(comments)
        .should('contain', 'This is a comment')
        .and('contain', Cypress.env('userName'))
})