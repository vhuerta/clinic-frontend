import React, { Component } from "react";
import PropTypes from "prop-types";
import { AuthConsumer } from "./AuthContext";

import CallbackLoader from "../auth/CallbackLoader";

class RouteProtector extends Component {
  static propTypes = {
    children            : PropTypes.element.isRequired,
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
    const { children } = this.props;

    return this.state.isVerifying || !this.state.isAuthenticated ? (
      <CallbackLoader />
    ) : (
      this.state.isAuthenticated && children
    );
  }
}

export default ProtectedComponent => {
  return props => (
    <AuthConsumer>
      {({ isVerifying, isAuthenticated, login, verifyAuthentication }) => (
        <RouteProtector
          isVerifying={isVerifying}
          isAuthenticated={isAuthenticated}
          login={login}
          verifyAuthentication={verifyAuthentication}
        >
          <ProtectedComponent {...props} />
        </RouteProtector>
      )}
    </AuthConsumer>
  );
};
