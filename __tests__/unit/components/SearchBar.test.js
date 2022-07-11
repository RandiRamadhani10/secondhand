import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {SearchBar} from '../../../src/components';

describe('Component: SearchBar', () => {
  let wrapper;

  const props = {
    placeholder: 'This is Placeholder',
    value: 'Value',
  };

  beforeEach(() => {
    wrapper = render(<SearchBar {...props} onChangeText={mockOnPressChanged} />);
  });

  const mockOnPressChanged = jest.fn(() => {
    return (props.value = 'Changed');
  });

  it('should render components correctly', () => {
    const inputElement = wrapper.getByPlaceholderText(props.placeholder);

    expect(inputElement).not.toBeNull();
  });
});
