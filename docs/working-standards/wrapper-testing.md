# Testing a wrapper

If a component is wrapped in one or several higher-order components (HoC), it is important to test this logic to make sure your wrapping layer is not foolishly modified!
The wrapper test is automatically generated with the wrapper.

## Mount and find

A utility is provided to help you test your wrappers: `tests/mountAndFind.jsx`. It allows to mount the wrapper and returns the **wrapped** component alongside with a mocked store.
In the generated test, you will find something like this:

```
jest.mock('../WrappedComponent', () => {
  const WrappedComponent = () => null;
  WrappedComponent.displayName = 'WrappedComponent';
  return WrappedComponent;
});
```
It is used to limit the depth of the wrapper rendering when mounting. This way, we only render the higher layers: the HoCs.


### Examples

Testing if a component got some prop from `mapStateToProps`:
```
it('renders an editable form if no audit provided', () => {
  const { component } = mountWrapped(
    <AuditFormWrapper form="mocked_form_name" />,
  );
  expect(component.props().readOnly).toBe(false);
});
```

Testing if a component got some prop from `mapDispatchToProps`:
```
it('renders a component with resetArchivedFilter function', () => {
  const { component, store } = mountWrapped(<AuditListPageWrapper />);

  const resetArchivedFilter = component.props().resetArchivedFilter;
  expect(resetArchivedFilter).toBeInstanceOf(Function);
  resetArchivedFilter();
  expect(store.getActions()).toContainEqual(
    change(AUDITS_FILTER.name, AUDITS_FILTER.fields.archived, false),
  );
});
```

Testing if a saga is correctly injected:
```
it('should inject a saga AuditListPage', () => {
  const { store } = mountWrapped(<AuditListPageWrapper />);
  expect(store.injectedSagas.AuditListPageWrapper).toBeDefined();
});
```

Testing if an action is dispatched on mount:
```
it('should inject a saga AuditListPage', () => {
  const { store } = mountWrapped(<AuditListPageWrapper />);
  expect(store.injectedSagas.AuditListPageWrapper).toBeDefined();
});
```
