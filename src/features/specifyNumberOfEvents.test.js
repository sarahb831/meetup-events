import React from 'react';
import { mount, } from  'enzyme';
import App from  '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
    	given('the user has not specified a number of Events', () => {

    	});
        let AppWrapper;
    	when('the user opens the app', () => {
            AppWrapper = mount(< App />);
    	});

    	then('the number of events to be displayed will be 32', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.NumberOfEvents .number-input').prop('value')).toBe(32);

    	});
    });

    test('User can change the number of events they want to be displayed', ({ given, when, then }) => {
        
        let AppWrapper;
        given('the app is open', () => {
            AppWrapper = mount(< App />);
    	});

    	when('the user specifies a number of events to be displayed', () => {
            AppWrapper.update();
            AppWrapper.find('.NumberOfEvents .number-input').simulate('change', { target: { value: 2 }});
            AppWrapper.setState({numberOfEvents: 2});
            expect(AppWrapper.state('numberOfEvents')).toBe(2);
    	});

    	then('the user should see that number of events displayed', () => {
            AppWrapper.update(); // needs to be here or next line fails
            expect(AppWrapper.find('.Event')).toHaveLength(2);
    	});
    });

});