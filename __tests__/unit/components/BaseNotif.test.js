import React from 'react';
import {BaseNotif} from '../../../src/components';
import {render} from '@testing-library/react-native';

describe('Component: BaseNotif', () => {
  let wrapper;

  const props = {
    status: 'success',
    title: 'Test Title',
    image: 'https://via.placeholder.com/150',
    price: '$100',
    bid: '$200',
  };

  beforeEach(() => {
    wrapper = render(<BaseNotif {...props} />);
  });

  it('should render title', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.title);

    expect(titleElement).not.toBeNull();
  });
});
