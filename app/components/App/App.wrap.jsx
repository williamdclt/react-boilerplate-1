import injectSaga from 'utils/injectSaga';
import rootSaga from 'modules/sagas';
import App from './App';

const AppWrapper = injectSaga({ key: 'AppRootSaga', saga: rootSaga })(App);

export default AppWrapper;
