import React from 'react';
import { mount, shallow } from  'enzyme';
import App from  '../App';
import EventList from '../EventList';
import Event from  '../Event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mockEventsSingle } from  '../mock-events';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
defineFeature(feature, test => {

   
    test('An event element is collapsed by default', ({ given, when, then }) => {
    	given('the list of events has been loaded', () => {
    	});
        let AppWrapper;
    	when('the user opens the app', () => {
            AppWrapper = mount(< App />);
    	});

    	then('the user should see the list of events with no Details', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event')).toHaveLength(mockEventsSingle.events.length);
            expect(AppWrapper.find('.Event .show_details')).toHaveLength(0);
            AppWrapper.unmount();
    	});
    });

    test('User can expand an event to see its Details', ({ given, when, then }) => {
        let AppWrapper;
    	given('the user has opened up the app and the events details are collapsed', () => {
            AppWrapper = mount(< App />);
           
    	});

    	when('the user selects to see details for an event', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event')).toHaveLength(mockEventsSingle.events.length);
            expect(AppWrapper.find('.Event .show_details').at(0)).toHaveLength(0);
            expect(AppWrapper.find('.Event .details-button').at(0)).toHaveLength(1);
            AppWrapper.find('.Event .details-button').at(0).simulate('click');
    	});

    	then('the details for that event will be displayed', () => {
            expect(AppWrapper.find('.Event .show_details').at(0)).toHaveLength(1);
    	});
    });

    test('User can collapse an event to hide its Details', ({ given, when, then }) => {
        let EventWrapper;
    	given('the user is viewing details for an event', () => {
            EventWrapper = shallow(< Event />);
            //AppWrapper.update();
            //expect(AppWrapper.find('.Event')).toHaveLength(mockEventsSingle.events.length);
            //expect(AppWrapper.find('.Event .show_details').at(0)).toHaveLength(0);
            //expect(AppWrapper.find('.Event .details-button').at(0)).toHaveLength(1);
            //AppWrapper.find('.Event .details-button').at(0).simulate('click');
            EventWrapper.find('.Event .details-button').simulate('click');
    	});

    	when('the user selects to hide details for the event', () => {
           // AppWrapper.find('.Event details-button').at(0).simulate('click');
           EventWrapper.find('.Event .details-button').simulate('click');
    	});

    	then('the details for that event will be hidden/collapsed', () => {
            expect(EventWrapper.find('.Event .show_details')).toHaveLength(0);
    	});
    });
});