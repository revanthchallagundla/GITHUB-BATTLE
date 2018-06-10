var React = require('react');
var Reactdom = require('react-dom');
require('./index.css');
var App = require("./App/App");

Reactdom.render(
    <App/>,
    document.getElementById('app')
)