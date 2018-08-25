import React, { Component } from "react";
import PropTypes from "prop-types";
import to from "await-to-js";

import { Redirect } from "react-router-dom";

import { AuthConsumer } from "./AuthContext";
import FullLoader from "./../common/FullLoader";

export class CallbackView extends Component {
  static propTypes = {
    login                 : PropTypes.func.isRequired,
    handleAuthentication  : PropTypes.func.isRequired,
    loadAuthenticationData: PropTypes.func.isRequired
  };

  state = { isLoading: true };

  async componentDidMount() {
    const [err] = await to(this.props.handleAuthentication());
    if (!err) this.setState({ isLoading: false });
  }

  render() {
    return this.state.isLoading ? <FullLoader /> : <Redirect to="/" />;
  }
}

export default () => (
  <AuthConsumer>
    {({ handleAuthentication, loadAuthenticationData, login }) => (
      <CallbackView
        handleAuthentication={handleAuthentication}
        loadAuthenticationData={loadAuthenticationData}
        login={login}
      />
    )}
  </AuthConsumer>
);
