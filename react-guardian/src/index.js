import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './js/reducers';

const store = createStore(allReducers);

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);