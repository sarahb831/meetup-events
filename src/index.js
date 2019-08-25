import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as atatus from 'atatus-js';
require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
atatus.config('4a2c6fb75a314c8eb2705f6179f94145').install();