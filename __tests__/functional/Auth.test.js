import React from 'react';
import {fireEvent, render, cleanup} from '@testing-library/react-native';
import * as ReactRedux from 'react-redux';
import {Login, Daftar} from '../../src/screens';

describe('Functional: Auth Daftar & Login', () => {
  const mockOnPress = jest.fn();

  const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch');
  const useSelectorSpy = jest.spyOn(ReactRedux, 'useSelector');
  useDispatchSpy.mockReturnValue(jest.fn());
  useSelectorSpy.mockReturnValue(jest.fn());

  const userData = {
    name: 'binarusers',
    email: 'binarusers@binar.com',
    password: 'binarusers12',
  };

  afterEach(() => {
    cleanup();
  });

  it('should be able to fill out the form', async () => {
    const {getByLabelText} = render(<Daftar navigation={mockOnPress} />);

    const component = {
      name: getByLabelText('Nama'),
      email: getByLabelText('Email'),
      password: getByLabelText('Buat Password'),
    };

    fireEvent.changeText(component.name, userData.name);
    fireEvent.changeText(component.email, userData.email);
    fireEvent.changeText(component.password, userData.password);

    expect(component.name.props.value).toEqual(userData.name);
    expect(component.email.props.value).toEqual(userData.email);
    expect(component.password.props.value).toEqual(userData.password);
  });

  it('should be able to fill input "Email" and "Password" for login', async () => {
    const {getByLabelText} = render(<Login navigation={mockOnPress} />);

    const component = {
      email: getByLabelText('Email'),
      password: getByLabelText('Password'),
    };

    fireEvent.changeText(component.email, userData.email);
    fireEvent.changeText(component.password, userData.password);

    expect(component.email.props.value).toEqual(userData.email);
    expect(component.password.props.value).toEqual(userData.password);
  });
});
