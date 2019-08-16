import React, { Component } from 'react';
import './App.css';
import EventList from  './EventList';
import CitySearch from  './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from  './api';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';

class App extends Component {
   
  state = {
    events: [],
    numberOfEvents: 32,
    lat: null,
    lon: null
}

  async componentDidMount() {
    await this.updateEvents(this.state.lat, this.state.lon);
  }

  componentWillUnmount() {
    axios.CancelToken.source().cancel('API is cancelled');
  }

  updateEvents = async (lat, lon) => {
    this.setState( { lat, lon });
    await getEvents(lat, lon, this.state.numberOfEvents).then(events => this.setState({ events }));
  };

  updateNumberOfEvents = async (numberOfEvents) => {
    this.setState({ numberOfEvents });
    await getEvents(this.state.lat, this.state.lon, numberOfEvents).then(events => this.setState({ events }));
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark" fixed="top"
          className="sticky-navbar">
            <Navbar.Brand>Meetup Events</Navbar.Brand>
            <br></br>
        </Navbar>
       
        <CitySearch updateEvents={this.updateEvents} />
      
        <NumberOfEvents updateNumberOfEvents = {this.updateNumberOfEvents} numberOfEvents={this.state.numberOfEvents}/>
       
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
