// For Ignore Warning
import './ignoreWarnings';
import React from 'react';
import Router from './src/router';

import {Provider} from 'react-redux';

import {store, persistor} from './src/store';

import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
