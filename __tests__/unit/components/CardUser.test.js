import React from 'react';
import {CardUser} from '../../../src/components';
import {render} from '@testing-library/react-native';

describe('Component: CardUser', () => {
  let wrapper;
  const mockOnPress = jest.fn();

  const props = {
    name: 'Test Name',
    city: 'Test City',
    avatar: 'https://via.placeholder.com/150',
  };

  beforeEach(() => {
    wrapper = render(<CardUser {...props} onPress={mockOnPress} />);
  });

  it('should render name', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.name);

    expect(titleElement).not.toBeNull();
  });

  it('should render city', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.city);

    expect(titleElement).not.toBeNull();
  });
});
