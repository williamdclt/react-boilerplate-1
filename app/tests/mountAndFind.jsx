import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const mockStore = configureStore(middlewares);

const mountAndFind = target => Wrapper => {
  const store = {
    ...mockStore({}),
    runSaga: jest.fn(),
    injectedReducers: {},
    injectedSagas: {},
  };
  const component = mount(<Provider store={store}>{Wrapper}</Provider>).find(
    target,
  );

  return {
    component,
    store,
  };
};
export default mountAndFind;
