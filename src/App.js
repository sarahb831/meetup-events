import React, { Component } from 'react';
import './App.css';
import EventList from  './EventList';
import CitySearch from  './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from  './api';
import Axios from 'axios';

class App extends Component {
   
  state = {
    events: [],
    numberOfEvents: 32,
    lat: null,
    lon: null
}

  componentDidMount() {
    console.log('in componentDidMount(), this.state.numberOfEvents=', this.state.numberOfEvents);
    this.updateEvents(this.state.lat, this.state.lon);
  }

  componentWillUnmount() {
    console.log('in componentWillUnmount()');
    Axios.CancelToken.source().cancel('API is cancelled');
  }

  updateEvents = (lat, lon) => {
    this.setState( { lat, lon });
    getEvents(lat, lon, this.state.numberOfEvents).then(events => this.setState({ events }));
  };

  updateNumberOfEvents = (numberOfEvents) => {
    console.log('in updateNumberOfEvents(), value=',numberOfEvents, ' this.state.numberOfEvents before setState is ',this.state.numberOfEvents);
    this.setState({ numberOfEvents });
    console.log('in updateNumberOfEvents, after setState numberOfEvents is ',numberOfEvents, ' and this.state.numberOfEvents=', this.state.numberOfEvents);
    getEvents(this.state.lat, this.state.lon, numberOfEvents).then(events => this.setState({ events }));
  }

  render() {
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents = {this.updateNumberOfEvents} numberOfEvents={this.state.numberOfEvents}/>
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
