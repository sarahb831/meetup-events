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

  test('change state after get number of events to display', () => {
    const AppWrapper = mount(<App />);
    const spy = jest.spyOn(AppWrapper.instance(), 'updateNumberOfEvents');
    //AppWrapper.instance().updateNumberOfEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const NumberOfEventsWrapper = AppWrapper.find('.number-input');
    const eventObject = { target: { value: 3}};
    NumberOfEventsWrapper.simulate('change', eventObject);
    expect(spy).toHaveBeenCalledWith(3);
    expect(AppWrapper.state('numberOfEvents')).toBe(3);
  });

  test('get and display specified number of events', async() => {
    const AppWrapper = mount(<App />);
    const spy = jest.spyOn(AppWrapper.instance(), 'updateNumberOfEvents');
    AppWrapper.instance().forceUpdate();
    const NumberOfEventsWrapper = AppWrapper.find('.number-input');
    const eventObject = { target: { value: 2 }};
    await NumberOfEventsWrapper.simulate('change', eventObject);
    AppWrapper.setState({numberOfEvents: 2});
    expect(AppWrapper.state('numberOfEvents')).toBe(2);
    expect(AppWrapper.find('Event')).toHaveLength(2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(2);

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