import React from 'react';
import {BaseUploadPhoto} from '../../../src/components';
import {render} from '@testing-library/react-native';

describe('Component: BaseUploadPhoto', () => {
  let wrapper;
  const mockOnPress = jest.fn();

  const props = {
    label: 'Test Category',
  };

  beforeEach(() => {
    wrapper = render(<BaseUploadPhoto {...props} onPress={mockOnPress} />);
  });

  it('should render label', () => {
    const {getByText} = wrapper;

    const titleElement = getByText(props.label);

    expect(titleElement).not.toBeNull();
  });
});
