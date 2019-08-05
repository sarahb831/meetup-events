import React, { Component } from 'react';

class NumberOfEvents extends Component {
    
    state = {
        numberOfEvents: 32,
    }
  
    handleInputChanges = (event) => {
        const value = event.target.value;
        this.setState({ numberOfEvents: value });
    }

    render() {
        return (
            <div className="NumberOfEvents">
                  <input
                    type="text"
                    className="number-input"
                    id="number-input"
                    value = {this.state.numberOfEvents}
                    onChange = {this.handleInputChanges}
                />
            </div>
        );
    }
}

export default NumberOfEvents;