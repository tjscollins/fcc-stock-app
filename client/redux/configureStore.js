import * as redux from 'redux';
import thunk from 'redux-thunk';
import {stocksReducer, settingsReducer} from 'reducers';

const configureStore = (initialState = {}) => {
  let combinedReducer = redux.combineReducers({
    settings: settingsReducer,
    stocks: stocksReducer,
  });
  let store = redux.createStore(combinedReducer, initialState, redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f));
  return store;
};

export default configureStore;
