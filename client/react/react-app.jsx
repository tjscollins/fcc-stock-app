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

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <Application />
  </Provider>, document.getElementById('react-app'));
