import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from  '../EventList';
import CitySearch from  '../CitySearch';
import NumberOfEvents from  '../NumberOfEvents';
import { mockEventsSingle, mockEvents } from '../mock-events';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  })

  test('render NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

});

describe('<App /> integration', () => {

  test('get list of events after user selects a city', async() => {
    const AppWrapper = mount(<App />);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClicked('value', 1.1, 1.2);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents). toHaveBeenCalledWith(1.1, 1.2);
    AppWrapper.unmount();
  });

  /*******
   * 
   */
  test('change state after get number of events to display', () => {
    const AppWrapper = mount(<App />);
    console.log('in change state');
    AppWrapper.instance().updateNumberOfEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 3}};
    console.log('in change state, calling handleInputChanges() with value of 3');
    NumberOfEventsWrapper.instance().handleInputChanges(eventObject);
    expect(AppWrapper.instance().updateNumberOfEvents).toHaveBeenCalledWith(3);
/****/    expect(AppWrapper.state('numberOfEvents')).toBe(3);
  });

  /*******
   * 
   */
  test('get and display specified number of events', async() => {
    console.log('in test get and display...');
    const AppWrapper = mount(<App />);
    console.log('assigning jest()');
    AppWrapper.instance().updateNumberOfEvents = jest.fn();
    console.log('calling forceUpdate');
    AppWrapper.instance().forceUpdate();
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 2 }};
    console.log('calling handleInputChanges() with eventObject');
    NumberOfEventsWrapper.instance().handleInputChanges(eventObject);
    console.log('checking state of number of Events');
/****/    expect(AppWrapper.state('numberOfEvents')).toBe(2);
    console.log('checking EventListWrapper and Event now');
    //const EventListWrapper = AppWrapper.find(EventList);
    //expect(EventListWrapper.find('Event')).toHaveLength(2);
    expect(AppWrapper.find('Event')).toHaveLength(2);
    console.log('calling 2 expects()');
    expect(AppWrapper.instance().updateNumberOfEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateNumberOfEvents).toHaveBeenCalledWith(2);

    AppWrapper.unmount();
  });

  test('change state after get list of events', async () => {
      const AppWrapper = shallow(<App />);
      AppWrapper.instance().updateEvents(1.1, 1.2);
      await AppWrapper.update();
      expect(AppWrapper.state('events')).toEqual(mockEventsSingle.events);
    });

    test('render correct list of events', () => {
      const AppWrapper = mount(<App />);
      AppWrapper.setState({'events':[ {id:1}, {id:2}, {id:3}, {id: 4} ]});
      expect(AppWrapper.find('Event')).toHaveLength(4);
      AppWrapper.unmount();
    });

    test('change state when number input changes',() => {
      const AppWrapper = mount(<App />);
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      const eventObject = { target: { value: 2}};
      NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
      expect(AppWrapper.state('numberOfEvents')).toBe(2);
    });

  });