import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { articleContainer } from '../../support/commonSelectors';
import { deleteArticleButton } from './deleteArticlePage';

const myPost = {
    article : {
        title: "My post",
        description: "Description of my post",
        body: "Body of my post",
        tagList: ["Tag1", "Tag2", "Tag3"]
    }
}

before(() => {
    //Log in
    cy.loginApi('/')

    //Delete previously created articles
    cy.deleteArticle(myPost.article.title)

    //Create a post with the title My post
    cy.createArticle(myPost)
})

Given('There is a post on the Global feed', () => {
    cy.loadHomepage()
    cy.get(articleContainer)
        .first()
        .should('contain', myPost.article.title)
        .and('contain', Cypress.env('userName'))
})

When('I delete the post My post', () => {
    cy.intercept('GET', '**/api/articles/*').as('getArticle')
    cy.intercept('DELETE', '**/api/articles/*').as('deleteArticle')

    //Delete the post
    cy.get(articleContainer)
        .contains(myPost.article.title)
        .click()
    cy.wait('@getArticle')
    cy.get(deleteArticleButton)
        .contains('Delete Article')
        .first()
        .click()
    cy.wait('@deleteArticle')
        .its('response.statusCode')
        .should('eq', 204)
})

Then('The post is deleted', () => {
    //The user is returned to the home page
    cy.url()
        .should('eq', Cypress.config().baseUrl)
    cy.wait('@getArticles')
    //The post is no longer visible
    cy.get(articleContainer)
        .should('not.contain', myPost.article.title)
})