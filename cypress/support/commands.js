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

Cypress.Commands.add('loginApi', (url) => {
    const userCredentials = {
        "user": {
            "email": "vurdobidru@gufum.com",
            "password": "vurdobidru@gufum" //fixtures todo
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
        })
})
