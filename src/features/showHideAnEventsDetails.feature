Feature: show/Hide An Events Details

Scenario: An event element is collapsed by default
Given the list of events has been loaded
When the user opens the app
Then the user should see the list of events with no Details

Scenario: User can expand an event to see its Details
Given the user has opened up the app and the events details are collapsed
When the user selects to see details for an event
Then the details for that event will be displayed

Scenario: User can collapse an event to hide its Details
Given the user is viewing details for an event
When the user selects to hide details for the event
Then the details for that event will be hidden/collapsed