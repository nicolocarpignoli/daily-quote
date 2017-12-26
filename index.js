import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { connect } from "react-redux"
import store from "./stores/store.js"


import App from './components/App'
import quoteApp from './reducers/index'

import * as ons from 'onsenui';

// Onsen UI Styling and Icons
require('onsenui/css/onsenui.css')
require('onsenui/css/onsen-css-components.css')

// document.addEventListener('deviceready', ()=>{
//   Cordova sensitive stuff (like plugin usage)
// })

if(!window.device){
  window.setTimeout(function() {
    var e = document.createEvent('Events')
    e.initEvent("deviceready", true, false)
    document.dispatchEvent(e)
  }, 100)
}

ons.ready(() => {
  const rootElement = document.getElementById('root')
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  )
});
