import React from 'react';
import {BaseNotif} from '../../../src/components';
import {render} from '@testing-library/react-native';

describe('Component: BaseNotif', () => {
  let wrapper;
  const mockOnPress = jest.fn();

  const props = {
    status: 'success',
    title: 'Test Title',
    image: 'https://via.placeholder.com/150',
    price: '$100',
    bid: '$200',
  };

  beforeEach(() => {
    wrapper = render(<BaseNotif {...props} onPress={mockOnPress} />);
  });

  it('should render status', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.status);

    expect(titleElement).not.toBeNull();
  });

  it('should render price', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.price);

    expect(titleElement).not.toBeNull();
  });

  it('should render bid', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.bid);

    expect(titleElement).not.toBeNull();
  });
});
