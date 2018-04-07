# JavaScript

## State management

This boilerplate manages application state using [Redux](redux.md) and keeps access performant
via [`reselect`](reselect.md).

For managing asynchronous flows (e.g. logging in) we use [`redux-saga`](https://github.com/redux-saga/redux-saga).

For routing, we use [`react-router` in combination with `react-router-redux`](routing.md).

We include a generator for components, containers, sagas, routes and selectors.
Run `yarn generate` to choose from the available generators, and automatically
add new parts of your application!

> Note: If you want to skip the generator selection process,
  `yarn generate <generator>` also works. (e.g. `yarn generate component`)

### Learn more

- [Redux](redux.md)
- [reselect](reselect.md)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [react-intl](i18n.md)
- [routing](routing.md)

## Architecture: `components` and `wrappers`

We adopted a split between stateless, reusable components called (wait for it...)
`components` and stateful parent components called `wrappers`. We do not use the
terminology `containers` because it is commonly attached to redux's `connect`, which
is only a higher order component amongst all the HoCs that can be in your wrapper.

### Learn more

See [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
by Dan Abramov for a great introduction to this approach.
