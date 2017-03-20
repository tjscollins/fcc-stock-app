/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------API----------*/
import {dateFormatter} from 'api';
import WebSocket from 'ws';
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

console.log(window.location);

const ws = new WebSocket(`ws://localhost:8080/echo/websocket/`);
ws.on('open', () => {
  console.log('WebSocket connection open');
  ws.send('Testing 1 2 3');
});
ws.on('message', (data, flags) => {
  console.log('Message received: ', data, flags);
});

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <Application />
  </Provider>, document.getElementById('react-app'));
