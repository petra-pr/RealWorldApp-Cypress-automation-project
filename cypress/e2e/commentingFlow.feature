Feature: Leave comments

    Scenario: Leave a comment on a post
        Given I am on the homepage
        When I comment on a post
        Then I should see This is a comment posted below the article
        
