// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("@rails/activestorage").start();
require("channels");
require("trix")
require("@rails/actiontext")

import 'jquery/dist/jquery.js'
import 'popper.js/dist/popper.js'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './css/trix.css'

window.jQuery = $;
window.$ = $;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'

ReactDOM.render(<App />, document.querySelector('#react_app'));
