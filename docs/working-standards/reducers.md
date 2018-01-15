# How to use reducers

You can create a new reducer in its `modules/something/` folder. For it to be registered, you have 2 solutions.

## Register it in the root reducer

To have it listen all the time for actions, you can add it in the `modules/reducers.js` file. It will start and stop
with your application.

## Inject it in your component

To avoid having it run permanently by your application (which consume resources), you can inject it in your component
so that the reducer start when it mounts and stops when it unmounts. Often, this component would be a page but not
necessarily.

The mecanism to inject a reducer in a component is exactly the same as the one to inject a saga, just use `injectReducer`
instead of `injectSaga`: [more informations here](sagas.md).
