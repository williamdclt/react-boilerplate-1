import HomePageLoadable from '../Loadable';
import HomePageWrapper from '../HomePage.wrap';

describe('HomePageWrapper', () => {
  it('does not change the wrapped component', () => {
    expect(HomePageWrapper).toBe(HomePageLoadable);
  });
});
