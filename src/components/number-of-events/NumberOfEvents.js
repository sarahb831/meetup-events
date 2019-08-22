import React, { Component } from 'react';
import { ErrorAlert } from  '../alert/Alert';

class NumberOfEvents extends Component {
   
    state = {
        numberOfEvents: 32,
        infoText: ' ',
    }
  
    handleInputChanges = async (event) => {
        event.preventDefault();
        let value = event.target.value;
        value = isNaN(value) ? this.state.numberOfEvents : value;
        if (value < 1) {
            this.setState({
                infoText: 'Number should be at least 1',
            });
        } else {
            this.setState({
                infoText: ' ',
            });
        }
        this.setState({ numberOfEvents: value });
        await this.props.updateNumberOfEvents(value);
    }

    render() {
        return (
            <div className="NumberOfEvents">
                <ErrorAlert text = {this.state.infoText} />
                <span>Show </span>
                  <input
                    type="text"
                    className="number-input"
                    placeholder="Number of Events"
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