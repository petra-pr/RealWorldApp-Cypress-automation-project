# QAitive JS/Cypress test automation course

## Description
This project demonstrates the setting up of a test automation suite with Cypress and Cucumber. 
Standard test automation suite structure and methodologies are employed, which includes the use of Page Object Models for storing selectors, helper files for storing custom commands, and fixture files for storing test input data.

## Installation prerequisites
- Git
- NodeJS v18.13.0^
- Access to angular-realworld-example-app (Optionally included as a submodule in this repository. If you don't already have it, follow the Submodule steps below!)
- Username and password for angular-realworld-example-app

## Installation
- Clone this repository to your local machine: `git clone https://github.com/petra-pr/RealWorldApp-Cypress-automation-project.git`
- Access this repository through a terminal: `cd RealWorldApp-Cypress-automation-project`
- [Submodule] Run this command to download angular-realworld-example-app: `git submodule update --init --recursive`
- In this repository's root context, run `npm install`
- [Submodule] Go to the submodule repository's root context `cd angular-realworld-example-app`, run `npm install`

## Usage
- In one terminal, access the Angular application `cd angular-realworld-example-app` and run it with the command `npm start`
- In another terminal, access this repository's root `cd RealWorldApp-Cypress-automation-project` and run the tests with the command `npm run test-headless` or `npm run test-interactive`
- The script will ask for your angular-realworld-example-app username and password to use in the tests
- The tests will run on their own after you type in your credentials, and you will find a report in `cypress\reports\html\index.html`!
