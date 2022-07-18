import React from 'react';
import {create} from 'react-test-renderer';
import {createStore} from 'redux';

import {Home} from '../../../src/screens';
import ContainerTesting from '../../../src/utils/containerTesting/reduxTesting';
import {productsData} from '../../../src/utils/ProductData';

describe('Unit: List Search Product', () => {
  it('should render list search product with length 2', () => {
    const productState = (state = productsData, action) => {
      switch (action.type) {
        default:
          return state;
      }
    };

    const store = createStore(productState);

    const {root, toJSON} = create(ContainerTesting(<Home />, store));

    const compJSON = toJSON();

    const state = root.props.store.getState();
    expect(root.props.store).toBeTruthy();
    expect(state).toHaveLength(6);
    expect(compJSON).toMatchSnapshot();
  });

  it('should render empty list search product with length 0', () => {
    const productState = (state = [], action) => {
      switch (action.type) {
        default:
          return state;
      }
    };

    const store = createStore(productState);

    const {root, toJSON} = create(ContainerTesting(<Home />, store));

    const compJSON = toJSON();

    const state = root.props.store.getState();
    expect(root.props.store).toBeTruthy();
    expect(state).toHaveLength(0);
    expect(compJSON).toMatchSnapshot();
  });
});
