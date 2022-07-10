import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {BaseInput} from '../../../src/components';

describe('Component: BaseInput', () => {
  let wrapper;

  const props = {
    label: 'Test Input',
    placeholder: 'This is Placeholder',
    value: 'Value',
    type: 'password',
  };

  beforeEach(() => {
    wrapper = render(<BaseInput {...props} onChangeText={mockOnPressChanged} />);
  });

  const mockOnPressChanged = jest.fn(() => {
    return (props.value = 'Changed');
  });

  it('should render components correctly', () => {
    const inputElement = wrapper.getByPlaceholderText(props.placeholder);

    expect(inputElement).not.toBeNull();
  });

  it('should show plain text type for password', () => {
    const inputElement = wrapper.getByPlaceholderText(props.placeholder);
    const iconToggle = wrapper.getByLabelText('icon-toggle-password');

    fireEvent.press(iconToggle);

    expect(inputElement.props.secureTextEntry).toEqual(false);
  });
});
