import React, { Component } from 'react';
import './App.css';
import EventList from  './EventList';
import CitySearch from  './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from  './api';

const updateEvents = (lat, lon) => {
  getEvents(lat, lon).then(events => this.ListeningStateChangedEvent({ events }));
};


class App extends Component {
  render() {
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents />
        <EventList />
      </div>
    );
  }
}

export default App;
