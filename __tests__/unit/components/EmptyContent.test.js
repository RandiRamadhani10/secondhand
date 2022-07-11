import React from 'react';
import {EmptyContent} from '../../../src/components';
import {render} from '@testing-library/react-native';

describe('Component: EmptyContent', () => {
  let wrapper;
  const mockOnPress = jest.fn();

  const props = {
    text: 'Test text',
  };

  beforeEach(() => {
    wrapper = render(<EmptyContent {...props} onPress={mockOnPress} />);
  });

  it('should render text', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.text);

    expect(titleElement).not.toBeNull();
  });
});
