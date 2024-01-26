# QAitive JS/Cypress test automation course

## Description
This project demonstrates the setting up of a test automation suite with Cypress and Cucumber. 
Standard test automation suite structure and methodologies are employed, which includes the use of Page Object Models for storing selectors, helper files for storing custom commands, and fixture files for storing test input data.

## Installation prerequisites
- Git
- NodeJS LTS
- Access to angular-realworld-example-app (Optionally included as a submodule in this repository)

## Installation
- Clone this repository to your local machine: `git clone https://github.com/petra-pr/RealWorldApp-Cypress-automation-project.git`
- Access this repository through a terminal: `cd RealWorldApp-Cypress-automation-project`
- [Optional] Run this command to download angular-realworld-example-app: `git submodule update --init --recursive`
- In this repository's root context, run `npm install`
- [Optional] Go to the submodule repository's root context `cd angular-realworld-example-app`, run `npm install`

## Usage
- In one terminal, access the Angular application `cd angular-realworld-example-app` and run it with the command `npm start`
- In another terminal, access this repository's root `cd RealWorldApp-Cypress-automation-project` and run the tests with the command `npm run test-headless` or `npm run test-interactive`.
