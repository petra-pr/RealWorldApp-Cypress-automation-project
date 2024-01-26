Feature: Delete posts

    Scenario: Delete own post
        Given There is a post on the Global feed
        When I delete the post My post
        Then The post is deleted
        