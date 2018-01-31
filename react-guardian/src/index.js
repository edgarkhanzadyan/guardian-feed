import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import './css/index.css';
import App from './js/components/App';
import configureStore from './js/store/configureStore';

const { store, persistor } = configureStore();
// let store = createStore(allReducers);
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
