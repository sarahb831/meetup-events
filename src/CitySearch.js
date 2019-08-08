import React, { Component } from 'react';
import { getSuggestions } from './api.js';


class CitySearch extends Component {
    
    state = {
        query: '',
        suggestions: [],
    }

    handleInputChanges = (event) => {
        const value = event.target.value;
        this.setState({ query: value });
        getSuggestions(value).then(suggestions => this.setState({ suggestions }));
    }

    handleItemClicked = (value, lat, lon) => {
        this.setState( { query: value, suggestions: [] });
        this.props.updateEvents(lat, lon);
    }
   
    render() {
        return (
            <div className="CitySearch">
                <input
                    type="text"
                    className="city"
                    placeholder="City"
                    id="city-input"
                    value = {this.state.query}
                    onChange = {this.handleInputChanges}
                />
                <ul className="suggestions">
                    {this.state.suggestions.map(city =>
                        <li key={city.name_string} onClick={() => this.handleItemClicked(city.name_string, city.lat, city.lon)}>
                        {city.name_string}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default CitySearch;