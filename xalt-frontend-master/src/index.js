import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from 'lib/redux/store';

import App from 'containers/App';

import './assets/scss/main.scss';

export const store = createStore().store;
const persistor = createStore().persistor;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector('#root'),
);

module.hot.accept();
