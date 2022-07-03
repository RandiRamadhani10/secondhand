/* eslint-disable no-undef */

jest.mock('redux-persist', () => {
    const real = jest.requireActual('redux-persist');
    return {
      ...real,
      persistReducer: jest
        .fn()
        .mockImplementation((config, reducers) => reducers),
    };
  });
  

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
    hide: jest.fn()
}));
