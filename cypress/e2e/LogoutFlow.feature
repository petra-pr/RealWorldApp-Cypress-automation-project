Feature: Log out of the application

    Scenario: User logs out
    Given The user is successfully logged in
    When The user accesses the profile page
    Then The user logs out successfully
    Then The user has no access to the profile page