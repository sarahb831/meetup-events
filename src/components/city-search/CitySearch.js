import React, { Component } from 'react';
import { getSuggestions } from '../api/api.js';
import { InfoAlert } from  '../alert/Alert';


class CitySearch extends Component {
    
    state = {
        query: '',
        suggestions: [],
        infoText: ' ',
    }

    handleInputChanges = (event) => {
        const value = event.target.value;
        this.setState({ query: value });
        getSuggestions(value).then(suggestions => {
            this.setState({ suggestions });
            if (value && suggestions.length === 0) {
                this.setState({
                    infoText: 'We cannot find the city you are looking for. Please try another city',
                });
            } else {
                this.setState({
                    infoText: '',
                });
            }
        });
    }

    handleItemClicked = (value, lat, lon) => {
        this.setState( { query: value, suggestions: [] });
        this.props.updateEvents(lat, lon);
    }
   
    render() {
        return (
            <div className="CitySearch">
                <InfoAlert text={this.state.infoText} />
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