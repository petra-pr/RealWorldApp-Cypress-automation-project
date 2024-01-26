// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Result: The user is logged in with user credentials from Cypress.env.json and the specified URL is opened
//Parameters: 1. The URL to open after the user is logged in
Cypress.Commands.add('loginApi', (url) => {
    const userCredentials = {
        "user": {
            "email": Cypress.env('username'),
            "password": Cypress.env('password')
        }
    }

    cy.request('POST', 'https://api.realworld.io/api/users/login', userCredentials)
        .its('body')
        .then(body => {
            const token = body.user.token
            cy.visit(url, {
                onBeforeLoad (win) {
                    win.localStorage.setItem('jwtToken', token)
                }
            })

            //Set the username into a environment variable
            Cypress.env('userName', body.user.username)
        })
})

//Result: The specified number of articles is created
//Parameters: 1. Body of the article
Cypress.Commands.add('createArticle', (bodyObject) => {
    cy.request({
        url: 'https://api.realworld.io/api/articles',
        headers: { Authorization: "Token " + localStorage.getItem('jwtToken') },
        method: 'POST',
        body: bodyObject
    }).then(response => {
        expect(response.status).to.equal(201)
    })

    //Verify that the created article exists
    cy.request({
        url: 'https://api.realworld.io/api/articles?limit=10&offset=0',
        headers: {'Authorization': "Token " + localStorage.getItem('jwtToken') },
        method: 'GET'
    }).its('body')
    .then(body => {
        expect(body.articles[0].title).to.equal(bodyObject.article.title)
        })
})

Cypress.Commands.add('deleteArticle', (articleTitle) => {
    cy.intercept('GET', 'https://api.realworld.io/api/articles?limit=10&offset=0').as('getArticles')
    cy.wait('@getArticles')
        .then(allArticles => {
            allArticles.response.body.articles.forEach((article) => {
                if(article.title.includes(articleTitle)) {
                    cy.request({
                        method: 'DELETE', 
                        url: 'https://api.realworld.io/api/articles/' + article.slug,
                        headers: { Authorization: "Token " + localStorage.getItem('jwtToken') }
                    })
                }
            })
        })
})

Cypress.Commands.add('loadHomepage', () => {
    cy.intercept('GET', '**/api/tags').as('loadHomepage')
    cy.visit('/')
    cy.wait('@loadHomepage')
})
