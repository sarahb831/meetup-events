import React, { Component } from 'react';

class CitySearch extends Component {
    
    state = {
        query: 'Munich',
        suggestions: [],
    }

    handleInputChanges = (event) => {
        const value = event.target.value;
        this.setState({ query: value });
    }

    handleItemClicked = (value) => {
        this.setState( { query: value });
    }
   
    render() {
        return (
            <div className="CitySearch">
                <input
                    type="text"
                    className="city"
                    value = {this.state.query}
                    onChange = {this.handleInputChanges}
                />
                <ul className="suggestions">
                    {this.state.suggestions.map(city =>
                        <li key={city.name_string}
                            onClick = {() => this.handleItemClicked(city.name_string)}
                        >
                            {city.name_string}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default CitySearch;