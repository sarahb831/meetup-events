import React, { Component } from 'react';
import Event from './Event.js';
import { WarningAlert } from  '../alert/Alert';


export default class EventList extends Component {
   
    render() {
        return (
            <ul className="EventList">
                { !navigator.onLine && <WarningAlert text="No internet connection, events may not be up to date"/>}
                {this.props.events.map(event => 
                    <li key = {event.id}>
                        <Event event={event} />
                    </li>
                )}
            </ul>
        );
    };
}
