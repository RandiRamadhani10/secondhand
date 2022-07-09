import React from 'react';
import {render} from '@testing-library/react-native';
import {TabItem} from '../../../src/components';

describe('Component: TabItem', () => {
  const title = 'Test Button';
  const mockOnPress = jest.fn();

  it('should render button text', () => {
    const {getByText} = render(<TabItem title={title} onPress={mockOnPress} />);

    const buttonElement = getByText(title);

    expect(buttonElement).not.toBeNull();
  });

  it('should become disabled the button', () => {
    const {getByTestId} = render(<BaseButton title={title} disable={true} onPress={mockOnPress} />);

    const buttonElement = getByTestId('base-button');

    expect(buttonElement).toBeDisabled();
  });
});
