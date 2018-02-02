import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const withDispatch = (actionCreator, ...args) => WrappedComponent => {
  class Wrapper extends React.Component {
    componentDidMount() {
      this.props.hoc_actionDispatcher(...args);
    }

    render() {
      const { hoc_actionDispatcher, ...otherProps } = this.props;
      return <WrappedComponent {...otherProps} />;
    }
  }

  Wrapper.propTypes = {
    hoc_actionDispatcher: PropTypes.func,
  };

  const mapDispatchToProps = {
    hoc_actionDispatcher: actionCreator,
  };

  return connect(null, mapDispatchToProps)(Wrapper);
};

export default withDispatch;
