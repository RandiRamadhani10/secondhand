import React from 'react';
import {render} from '@testing-library/react-native';
import {TabItem} from '../../../src/components';
import {Provider} from 'react-redux';
import {store} from '../../../src/store';

describe('Component: TabItem', () => {
  let wrapper;
  const mockOnPress = jest.fn();

  const props = {
    title: 'Home',
  };

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <TabItem {...props} onPress={mockOnPress} />
      </Provider>,
    );
  });

  it('should render button text', () => {
    const {getByText} = wrapper;

    const buttonElement = getByText(props.title);

    expect(buttonElement).not.toBeNull();
  });

  it('should become disabled the button', () => {
    const {getByTestId} = wrapper;

    const buttonElement = getByTestId('tab-item');

    expect(buttonElement).toBeTruthy();
  });
});
