import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([
    // Add here the sagas you want to be run at app start, eg:
    // spawn(loginSaga),
  ]);
}

export default rootSaga;
