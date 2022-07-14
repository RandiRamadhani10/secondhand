import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {store, persistor} from '../../store';

export default function ContainerTesting(component, Store = store, Persistor = persistor) {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        {component}
      </PersistGate>
    </Provider>
  );
}
