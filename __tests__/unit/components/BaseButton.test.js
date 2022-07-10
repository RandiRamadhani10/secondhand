import React from 'react';
import {render} from '@testing-library/react-native';
import {BaseButton} from '../../../src/components';

describe('Component: BaseButton', () => {
  const title = 'Test Button';
  const mockOnPress = jest.fn();

  it('should render button text', () => {
    const {getByText} = render(
      <BaseButton title={title} onPress={mockOnPress} />,
    );

    const buttonElement = getByText(title);

    expect(buttonElement).not.toBeNull();
  });

  it('should become disabled the button', () => {
    const {getByTestId} = render(<BaseButton title={title} disable={true} onPress={mockOnPress} />);

    const buttonElement = getByTestId('base-button');

    expect(buttonElement).toBeDisabled();
  });

  it('should render loading indicator', () => {
    const {getByTestId, getByLabelText} = render(<BaseButton disable={true} isLoading={true} onPress={mockOnPress} />);

    const buttonElement = getByTestId('base-button');

    const loadingElement = getByLabelText('loading');

    expect(buttonElement).toContainElement(loadingElement);
  });
});
