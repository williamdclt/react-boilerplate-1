/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable';

const HomeLoadable = Loadable({
  loader: () => import('./HomePage'),
  loading: () => null,
});

export default HomeLoadable;
