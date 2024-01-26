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

        })
})
