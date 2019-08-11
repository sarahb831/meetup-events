Feature: Specify Number of Events

Scenario: When user hasn't specified a number, 32 is the default number
Given the user has not specified a number of Events
When the user opens the app
Then the number of events to be displayed will be 32

Scenario: User can change the number of events they want to be displayed
Given the app is open
When the user specifies a number of events to be displayed
Then the user should see that number of events displayed