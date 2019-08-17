import React, { Component } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, } from 'recharts';

class Event extends Component {

    state = {
        showDetails: false,
    };

    handleDetailsButtonClicked = () => {
        this.setState( { showDetails: !this.state.showDetails });
    }
    getAttendance = (event) => {
        const rsvps = event.yes_rsvp_count;
        const freeSlots = event.rsvp_limit - rsvps;
        const attendance = [
            { name: 'Reservations', value: rsvps},
            { name: 'Free Slots', value: freeSlots }
        ];
        return attendance;
    }

    render() {
        const { event } = this.props;
        return (
            <div className="Event">
                <p>
                    <span className="local_time">{(event && event.local_time) ? event.local_time : null} - </span>
                    <span className="local_date">{(event && event.local_date) ? event.local_date : null}</span>
                </p>
                 <p className="name">{(event && event.name) ? event.name : null}</p>
              
                <p className="groupName">GROUP: {(event && event.group && event.group.name) ? event.group.name : null}</p>
                {event && event.rsvp_limit &&
                <ResponsiveContainer height={150}>
                    <PieChart> 
                        <Pie label 
                            dataKey="value" 
                            isAnimationActive={false} 
                            data={this.getAttendance(event)} 
                            cx={100}  
                            outerRadius={40} 
                            fill="#a67d98" />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                }
                {event && !event.rsvp_limit &&
                    <p className="yes_rsvp_count">{(event && event.yes_rsvp_count) ? event.yes_rsvp_count : null}
                    {(event && event.yes_rsvp_count) ? " people are going" : ""}</p>
                }
                {this.state.showDetails &&
                <div className="show_details">
                    <p className="description">{(event && event.description) ? event.description : null}</p>
                    <p className="venueAddress_1">{(event && event.venue.address_1) ? event.venue.address_1 : null}</p>
                    <p className="venueAddress_2">{(event && event.venue.address_2) ? event.venue.address_2 : null}</p>
                    <p className="localized_location">{(event && event.localized_location) ? event.localized_location : null}</p>
                    <p className="link">{(event && event.link) ? event.link : null}</p>
                </div>
                }
                <button className="details-button"  onClick = {this.handleDetailsButtonClicked}>
                    { this.state.showDetails ? 'Hide Details' : 'Show Details' }
                </button>
            </div>
        );
    }
}

export default Event;