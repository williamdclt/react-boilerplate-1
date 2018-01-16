import React from 'react';
import mountAndFind from 'tests/mountAndFind';
import AppWrapper from '../App.wrap';

jest.mock('../App', () => {
  const App = () => null;
  App.displayName = 'App';
  return App;
});

const mountWrapped = mountAndFind('App');

describe('AppWrapper', () => {
  it('should inject a saga AppRootSaga', () => {
    const { store, component } = mountWrapped(<AppWrapper />);
    expect(store.injectedSagas.AppRootSaga).toBeDefined();
  });
});
