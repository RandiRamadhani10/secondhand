import React from 'react';
import {fireEvent, render, cleanup} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../../src/store';
import {Login, Daftar} from '../../src/screens';
import '../../ignoreWarnings';

describe('Functional: Auth Daftar & Login', () => {
  const mockOnPress = jest.fn();

  const userData = {
    name: 'binarusers',
    email: 'binarusers@binar.com',
    password: 'binarusers12',
  };

  afterEach(() => {
    cleanup();
  });

  it('should be able to fill out the form', async () => {
    const wrapper = render(
      <Provider store={store}>
        <Daftar navigation={mockOnPress} />
      </Provider>,
    );

    const component = {
      name: wrapper.getByPlaceholderText('Nama Lengkap'),
      email: wrapper.getByPlaceholderText('Contoh: johndee@gmail.com'),
      password: wrapper.getByPlaceholderText('Buat Password'),
    };

    fireEvent.changeText(component.name, userData.name);
    fireEvent.changeText(component.email, userData.email);
    fireEvent.changeText(component.password, userData.password);

    expect(component.name.props.value).toEqual(userData.name);
    expect(component.email.props.value).toEqual(userData.email);
    expect(component.password.props.value).toEqual(userData.password);
  });

  it('should be able to fill input "Email" and "Password" for login', async () => {
    const wrapper = render(
      <Provider store={store}>
        <Login navigation={mockOnPress} />
      </Provider>,
    );

    const component = {
      email: wrapper.getByPlaceholderText('Contoh: johndee@gmail.com'),
      password: wrapper.getByPlaceholderText('Masukkan Password'),
    };

    fireEvent.changeText(component.email, userData.email);
    fireEvent.changeText(component.password, userData.password);

    expect(component.email.props.value).toEqual(userData.email);
    expect(component.password.props.value).toEqual(userData.password);
  });
});
