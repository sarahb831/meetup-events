import React from  'react';
import { shallow } from 'enzyme';
import NumberOfEvents from  '../NumberOfEvents';

describe('<NumberofEvents /> component', () => {

    let NumberOfEventsWrapper;
    beforeAll( () => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });
    
    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
    });

    test('render default text input correctly',() => {
        const numberOfEvents = NumberOfEventsWrapper.prop('numberOfEvents');
        expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(numberOfEvents);
    });

});