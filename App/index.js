import React from 'react';
import Reactdom from 'react-dom';
require('./index.css');
import App from "./App/App";

Reactdom.render(
    <App/>,
    document.getElementById('app')
)