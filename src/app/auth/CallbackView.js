import React, { Component } from "react";
import PropTypes from "prop-types";
import to from "await-to-js";

import { Redirect } from "react-router-dom";

import { AuthConsumer } from "./AuthContext";
import FullLoader from "./../common/FullLoader";

export class Callback extends Component {
  static propTypes = {
    login                 : PropTypes.func.isRequired,
    handleAuthentication  : PropTypes.func.isRequired,
    loadAuthenticationData: PropTypes.func.isRequired
  };

  state = { isLoading: true };

  async componentDidMount() {
    const [err] = await to(this.props.handleAuthentication());
    if (err) {
      return this.props.login();
    }
    this.props.loadAuthenticationData();
    setTimeout(() => this.setState({ isLoading: false }), 2000);
  }

  render() {
    return this.state.isLoading ? <FullLoader /> : <Redirect to="/" />;
  }
}

export default () => (
  <AuthConsumer>
    {({ handleAuthentication, loadAuthenticationData, login }) => (
      <Callback
        handleAuthentication={handleAuthentication}
        loadAuthenticationData={loadAuthenticationData}
        login={login}
      />
    )}
  </AuthConsumer>
);
