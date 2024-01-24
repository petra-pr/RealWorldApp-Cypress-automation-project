Feature: Create posts

    Scenario: Create a post
        Given I am logged in as "user"
        When I create a post with the title "My first post"
        Then I should see "My first post" on top in the "Global feed"
