Feature: Browse posts

    Scenario: Users can browse posts
        Given I am logged in as "user"
        When I access the homepage
        Then I should see "Global feed"
        And I should see all posts
        And I should be able to see the earliest post
        