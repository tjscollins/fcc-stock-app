/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------API----------*/
import {dateFormatter} from 'api';

/*----------Components----------*/
import Application from 'Application';

let [year, month, date] = dateFormatter();
const initialState = {
  settings: {
    startDate: [year - 1, month, date].join('-'),
    endDate: [year, month, date].join('-')
  },
  stocks: {
    list: [],
  },
};

// console.log(window.location);
const store = configureStore(initialState);
const host = window.document.location.host.replace(/:.*/, '');
const port = window.document.location.port
const ws = new WebSocket('ws://' + host + ':' + port);
ws.onopen = function() {
  // console.log('Connection open!');
};
ws.onmessage = function(event) {
  // console.log('Message: ', event.data);
  let stock = JSON.parse(event.data);
  // console.log(stock);
  if(stock.displayed) {
    store.dispatch(require('actions').updateStockData(stock.sym, stock.desc, stock.data));
  } else {
    store.dispatch(require('actions').removeStock(stock.sym));
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>, document.getElementById('react-app'));
