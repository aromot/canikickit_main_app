import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

console.log("Running Main App (mode="+process.env.ENV+")");

ReactDOM.render(<App />, document.getElementById('app'));