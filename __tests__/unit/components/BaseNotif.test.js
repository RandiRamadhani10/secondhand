import React from 'react';
import {BaseNotif} from '../../../src/components';
import {render} from '@testing-library/react-native';

describe('Component: BaseNotif', () => {
  let wrapper;
  const mockOnPress = jest.fn();

  const props = {
    status: 'bid',
    title: 'Test Title',
    image: '../../../src/assets/images/img-dummy-product.png',
    price: '$100',
    bid: '$200',
  };

  beforeEach(() => {
    wrapper = render(<BaseNotif {...props} onPress={mockOnPress} />);
  });

  it('should render title', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.title);

    expect(titleElement).not.toBeNull();
  });

  it('uses correct src', () => {
    const {getByTestId} = wrapper;

    const imageElement = getByTestId('productava');

    expect(imageElement).toHaveProp('source', {uri: props.image});
  });
});
