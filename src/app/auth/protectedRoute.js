import React, { Component } from "react";
import PropTypes from "prop-types";
import { AuthConsumer } from "./AuthContext";

import CallbackLoader from '../auth/CallbackLoader';

class RouteProtector extends Component {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    isAuthenticated     : PropTypes.bool.isRequired,
    isVerifying         : PropTypes.bool.isRequired,
    login               : PropTypes.func.isRequired,
    verifyAuthentication: PropTypes.func.isRequired
  };

  state = { isAuthenticated: false, isVerifying: true };

  componentDidMount() {
    this.props.verifyAuthentication();
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated, isVerifying } = prevProps;

    if (
      isAuthenticated !== this.props.isAuthenticated
      || isVerifying !== this.props.isVerifying
    ) {
      this.setState(
        {
          isVerifying    : this.props.isVerifying,
          isAuthenticated: this.props.isAuthenticated
        },
        () => {
          if (!this.state.isVerifying && !this.state.isAuthenticated)
            this.props.login();
        }
      );
    }  
  }

  render() {
    const { component, passThroughProps } = this.props;

    return this.state.isVerifying || !this.state.isAuthenticated ? (
      <CallbackLoader />
    ) : (
      this.state.isAuthenticated
        && React.createElement(component, passThroughProps)
    );
  }
}

export default ProtectedComponent => {
  return props => (
    <AuthConsumer>
      {({ isVerifying, isAuthenticated, login, verifyAuthentication }) => (
        <RouteProtector
          component={ProtectedComponent}
          isVerifying={isVerifying}
          isAuthenticated={isAuthenticated}
          login={login}
          verifyAuthentication={verifyAuthentication}
          {...props}
        />
      )}
    </AuthConsumer>
  );
};
