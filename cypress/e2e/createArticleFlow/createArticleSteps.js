import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
import { displayedUsername, articleContainer } from '../../support/commonSelectors';
import { newArticle, articleTitle, articleDesc, articleBody, articleTags } from './articlePage';

const myFirstArticle = {
    title: "My first article",
    description: "This is my first article",
    body: "This is my first article (body)",
    tags: "tag1"
}

Given('I am logged in as user with no articles from previous runs', () => {
    cy.intercept('GET', '**/api/articles*').as('getArticles')
    cy.loginApi('/')

    cy.get(displayedUsername) //The user's username is displayed in the navbar
    cy.wait('@getArticles')
        .then(allArticles => {
            allArticles.response.body.articles.forEach((article) => {
                if(article.title.includes(myFirstArticle.title)) {
                    cy.request({
                        method: 'DELETE', 
                        url: 'https://api.realworld.io/api/articles/' + article.slug,
                        headers: { Authorization: "Token " + localStorage.getItem('jwtToken') }
                    })
                }
            })
        })
})

When('I create a post with the title My first article', () => {
    cy.intercept('POST', '**/api/articles').as('postArticle')
    cy.intercept('GET', '**/api/articles/**').as('getArticle')

    cy.get(newArticle)
        .contains('New Article')
        .click()
    cy.get(articleTitle)
        .type(myFirstArticle.title)
    cy.get(articleDesc)
        .type(myFirstArticle.description)
    cy.get(articleBody)
        .type(myFirstArticle.body)
    cy.get(articleTags)
        .type(myFirstArticle.tags)
    cy.get('button')
        .contains('Publish Article')
        .click()

    cy.wait('@postArticle')
        .its('response.statusCode')
        .should('eq', 201)
    cy.wait('@getArticle')
        .its('response.statusCode')
        .should('eq', 200)

    cy.contains(myFirstArticle.title)
    cy.contains(myFirstArticle.body)
    cy.contains(myFirstArticle.tags)
})

Then('I should see My first article on top in the Global feed', () => {
    cy.intercept('GET', '**/api/articles?limit=10&offset=0').as('getArticles')

    cy.loadHomepage() 
    cy.contains("Global Feed")
        .click()
    cy.wait('@getArticles')
        .its('response.statusCode')
        .should('eq', 200)
           
    cy.get(articleContainer)
        .first()
        .contains(myFirstArticle.title)
        .contains(myFirstArticle.description)
})
