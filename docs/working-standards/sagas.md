# How to use sagas

## The bad way

A common way to use sagas is to have a `rootSaga` that register all the other sagas. Somewhere in your app, the saga middleware will only run this `rootSaga`.

This way, when you create a new saga, you simply add it to the `rootSaga` and you do not have to dive deep into the mecanisms of your React app. This implementation could look like this:

```
// login.js

function* login(action) {
    // ... your login login here
}

export function* loginSaga() {
    yield takeEvery('LOGIN', login);
}
```

```
// rootSaga.js

// ...
import { loginSaga } from "redux/login/login.saga";

export function* run() {
    yield all([
        // ...
        loginSaga(),
    ]);
}
```

```
// app.js

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)
```

### Why is it a bad idea

In three words: this is spaghetti. You have dozens of sagas listening for events at any point of your application. Your user may be already logged, you'll still be listening for the 'LOGIN' event. For an ecommerce website, no reason to be listening for a 'ADD_TO_BASKET" event when the user is on the checkout. In summary, the sagas running depend on what the user is doing, they shouldn't all run concurrently!

## The better way

This boilerplate allows you to attach sagas to components.

What does this means in practice? That the `loginSaga` should be started when your LoginPage component is mounted, and should be cancelled when it is unmounted. The goal here is that your application should be *coherent* at any point: the components displayed, the store, the reducers and the sagas running in background are consistent with each other, you control exactly what's happening in your application in a very precise way. If something (such as a saga) is running, this is because you want it to.

Attaching sagas to pages is the common pattern, but you can attach a saga to any sort of component.

## In practice

In practice, we'll use the `injectSaga` higher-order component.

Imagine you have a `Login` page, you want your `loginSaga` to run when this page component is mounted and to be cancelled when it is unmounted. You will wrap your LoginPage component in the `injectSaga` higher-order component:

```
// LoginPageWrapper.jsx
import injectSaga from 'utils/injectSaga';
import { loginSaga } from 'modules/login/login.saga';
import LoginPage from './LoginPage';

const LoginPageWrapper = injectSaga({saga: loginSaga, key: 'login'})(LoginPage);
export default LoginPageWrapper;
```

The `injectSaga` HoC takes an object as parameter that can have the following fields:
- saga: the saga that you want to attach to this component
- key: this is used internally to identify this saga. Just make sure to give an unique identifier for each component having sagas injected. This is used to avoid having several instances of the saga running (if several instances of a component are mounted) and to `cancel()` the saga on component unmount.
- mode: describes how the saga will be started or cancelled. Options are: 
    - RESTART_ON_REMOUNT (default): the saga will be started on component mount and cancelled with `task.cancel()` on component un-mount for improved performance.
    - ONCE_TILL_UNMOUNT: behaves like 'RESTART_ON_REMOUNT' but never runs the saga again if the component is unmounted.
    - DAEMON: starts the saga on component mount and never cancels it or starts again. From the moment this component is mounted, you'll have *exactly* one instance of this saga, that will run forever (unless you `cancel()` it yourself manually).

