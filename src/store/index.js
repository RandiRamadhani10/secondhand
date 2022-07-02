import {configureStore, combineReducers} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';

import usersSlice from './usersSlice';
import buyerSlice from './buyerSlice';
import notificationSlice from './notificationSlice';

const rootReducer = combineReducers({
  users: usersSlice,
  buyer: buyerSlice,
  notification: notificationSlice,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});

store.subscribe(() => store.getState());

export const persistor = persistStore(store);
