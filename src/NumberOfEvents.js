import React, { Component } from 'react';

class NumberOfEvents extends Component {
   
    state = {
        numberOfEvents: 32,
    }
  
    handleInputChanges = (event) => {
        let value = event.target.value;
        value = isNaN(value) ? this.state.numberOfEvents : value;
        console.log('in handleInputChanges(), value=',value);
        this.setState({ numberOfEvents: value });
        console.log('in handleInputChanges, calling this.props.updateNumberOfEvents() with value of ', value);
        this.props.updateNumberOfEvents(value);
    }

    render() {
        return (
            <div className="NumberOfEvents">
                  <input
                    type="text"
                    className="number-input"
                    id="number-input"
                    value = {this.props.numberOfEvents}
                    onChange = {this.handleInputChanges}
                />
            </div>
        );
    }
}

export default NumberOfEvents;