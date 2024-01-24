Feature: Create articles

    Scenario: Create an article
        Given I am logged in as user with no articles from previous runs
        When I create a post with the title My first article
        Then I should see My first article on top in the Global feed
