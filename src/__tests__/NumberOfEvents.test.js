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
        const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
        expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(numberOfEvents);
    });


    test('change state when text input changes',() => {
        const eventObject = { target: { value: 5}};
        NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(5);
    });

/*
    test('render list of suggestions correctly', () => {
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length);
        for (let i = 0; i < suggestions.length; i +=1 ) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i].name_string);
        }
    });

    test('click on suggestions should change query state', () => {
        CitySearchWrapper.setState({
            suggestions: [
                {
                    city: 'Munich',
                    country: 'de',
                    localized_country_name: 'Germany',
                    name_string: 'Munich, Germany',
                    zip: 'meetup3',
                    lat: 48.14,
                    lon: 11.58
                },
                {
                    city: 'Munich',
                    country: 'us',
                    localized_country_name: 'USA',
                    state: 'ND',
                    name_string: 'Munich, North Dakota, USA',
                    zip: '58352',
                    lat: 48.66,
                    lon: -98.85
                }
            ] 
        });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe('Munich, Germany');
    });
    */
});