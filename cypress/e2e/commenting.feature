Feature: Leave comments

    Scenario: Leave a comment on a post
        Given I am logged in as "user"
        And I am on the homepage
        When I open a post to see its "Comments"
        And I fill in "comment_body" with "This is a comment"
        And I press "Submit"
        Then I should see "This is a comment"
        
