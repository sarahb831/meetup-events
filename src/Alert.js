import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
        };
    }

    render() {
        return (
            <div className = "Alert">
                <p style={ this.getStyle() }>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color='blue';
    }

    getStyle = () => {
        return {
            color: this.color,
            lineHeight: 1.6,
            fontWeight: 700,
        };
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color='orange';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color='red';
    }

    getStyle = () => {
        return {
            color: this.color,
            lineHeight: 1.6,
            fontWeight: 900,
        };
    }
}

export { InfoAlert, WarningAlert, ErrorAlert };