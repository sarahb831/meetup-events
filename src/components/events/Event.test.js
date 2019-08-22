import React from 'react';
import { shallow } from 'enzyme';
import Event from './Event.js';


describe('<Event /> component', () => {

   
    let EventWrapper;
    beforeAll( () => {
        EventWrapper = shallow(<Event />);
    });
    
    test('render event with collapsed details', () => {
        expect(EventWrapper.find('.name')).toHaveLength(1);
        expect(EventWrapper.find('.groupName')).toHaveLength(1);
        expect(EventWrapper.find('.local_date')).toHaveLength(1);
        expect(EventWrapper.find('.local_time')).toHaveLength(1);
        expect(EventWrapper.find('description')).toHaveLength(0);
        expect(EventWrapper.find('.venueAddress_1')).toHaveLength(0);
        expect(EventWrapper.find('.venueAddress_2')).toHaveLength(0);
        expect(EventWrapper.find('.link')).toHaveLength(0);    
    });

    test('click on details button should expand details of event', () => {
        expect(EventWrapper.find('.details-button')).toHaveLength(1);
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.find('.name')).toHaveLength(1);
        expect(EventWrapper.find('.groupName')).toHaveLength(1);
        expect(EventWrapper.find('.local_date')).toHaveLength(1);
        expect(EventWrapper.find('.local_time')).toHaveLength(1);
        expect(EventWrapper.find('.description')).toHaveLength(1);
        expect(EventWrapper.find('.venueAddress_1')).toHaveLength(1);
        expect(EventWrapper.find('.venueAddress_2')).toHaveLength(1);
        expect(EventWrapper.find('.link')).toHaveLength(1);    
    });

    test('click on details button should collapse details of event', () => {
        EventWrapper.setState({ showDetails: true }); // start with details
        expect(EventWrapper.find('.details-button')).toHaveLength(1);
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.find('.name')).toHaveLength(1);
        expect(EventWrapper.find('.groupName')).toHaveLength(1);
        expect(EventWrapper.find('.local_date')).toHaveLength(1);
        expect(EventWrapper.find('.local_time')).toHaveLength(1);
        expect(EventWrapper.find('.description')).toHaveLength(0);
        expect(EventWrapper.find('.venueAddress_1')).toHaveLength(0);
        expect(EventWrapper.find('.venueAddress_2')).toHaveLength(0);
        expect(EventWrapper.find('.link')).toHaveLength(0);    
    });

});