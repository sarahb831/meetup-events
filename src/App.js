import React, { Component } from 'react';
import './App.css';
import EventList from  './components/events/EventList';
import CitySearch from  './components/city-search/CitySearch';
import NumberOfEvents from './components/number-of-events/NumberOfEvents';
import { getEvents } from  './components/api/api';
import axios from 'axios';
import moment from 'moment';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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

  countEventsOnADate = (date) => {
    let count = 0;
    for (let i=0; i < this.state.events.length; i+=1) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
    }
    return count;
  }

  getData = () => {
    const next7Days = []; //create empty array for next 7 days of data
    const currentDate = moment();

    // loop for next 7 days of events
    for (let i=0; i<7; i+=1) {
      currentDate.add(1, 'days');
      const dateString = currentDate.format('YYYY-MM-DD');
      const count=this.countEventsOnADate(dateString);
      next7Days.push({ date:dateString, number:count });
    }
    return next7Days;
  }

  render() {
    return (
      <div className="App">
        <div id="navbar"
          className="sticky-navbar">
          <h1>Meetup Events</h1>    
          <CitySearch updateEvents={this.updateEvents} />
          <NumberOfEvents updateNumberOfEvents = {this.updateNumberOfEvents} numberOfEvents={this.state.numberOfEvents}/>
        </div>
        <div className="content">
        <p>Events For Next 7 Days</p>
        <ResponsiveContainer height={400}>
          <ScatterChart 
            margin={{ right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="date" name="date" />
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#552867" />
          </ScatterChart>
        </ResponsiveContainer>

        <EventList events={this.state.events}/>
        </div>
      </div>
    );
  }
}

export default App;
