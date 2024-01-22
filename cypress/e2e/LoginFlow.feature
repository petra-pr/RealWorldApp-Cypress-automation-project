Feature: Log in to the application

    Scenario: User logs in with credentials that do not allow access

    Given The user accesses the login page
    When The user types in incorrect credentials
    Then The user is denied entry into the application

    Scenario: User logs in with credentials that allow access

    Given The user accesses the login page
    When The user types in correct credentials
    Then The user accesses the application
    Then The user is taken to the home page
    Then The user sees their user name on the home page
