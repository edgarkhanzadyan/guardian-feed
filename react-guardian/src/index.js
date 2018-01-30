import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/components/App';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './js/reducers';

import { PersistGate } from 'redux-persist/lib/integration/react';

import configureStore from './js/store/configureStore';
let { store, persistor } = configureStore();

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);