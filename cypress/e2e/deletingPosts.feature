Feature: Delete posts

    Scenario: Delete own post
        Given I am logged in as "user"
        And I have a post "My post"
        When I delete the post "My post"
        Then I should see "Post deleted"

    Scenario: Delete someone else's post
        Given I am logged in as "user"
        And I have a post "My post" by "other"
        When I delete the post "My post"
        Then I should see "missing authorization credentials"
        