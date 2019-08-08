import React, { Component } from 'react';

class NumberOfEvents extends Component {
   
    state = {
        numberOfEvents: 32,
    }
  
    handleInputChanges = async (event) => {
        event.preventDefault();
        let value = event.target.value;
        value = isNaN(value) ? this.state.numberOfEvents : value;
        this.setState({ numberOfEvents: value });
        await this.props.updateNumberOfEvents(value);
    }

    render() {
        return (
            <div className="NumberOfEvents">
                <span>Show </span>
                  <input
                    type="text"
                    className="number-input"
                    id="number-input"
                    value = {this.props.numberOfEvents}
                    onChange = {this.handleInputChanges}
                />
                <span> Events</span>
            </div>
        );
    }
}

export default NumberOfEvents;