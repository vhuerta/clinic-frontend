import React, { createContext, Component } from "react";
import to from "await-to-js";
import {
  getAuthenticationData,
  handleAuthentication,
  login,
  verifyAuthentication
} from "./AuthAPI";

const AuthContext = createContext();

const { Consumer: AuthConsumer } = AuthContext;

class AuthProvider extends Component {
  state = {
    isVerifying    : true,
    isAuthenticated: false,
    accessToken    : null,
    idToken        : null,
    expiresAt      : null,
    payload        : null
  };

  login = login;

  handleAuthentication = async () => {
    const [error] = await to(handleAuthentication());
    if (!error) {
      this.loadAuthenticationData();
    } else {
      this.login();
      throw error;
    }
  };

  loadAuthenticationData = () => {
    const {
      accessToken,
      idToken,
      expiresAt,
      payload
    } = getAuthenticationData();
    this.setState({ accessToken, idToken, expiresAt, payload });
  };

  verifyAuthentication = () => {
    this.setState({ isVerifying: true }, async () => {
      const isAuthenticated = await verifyAuthentication();
      this.setState({ isVerifying: false, isAuthenticated });
    });
  };

  componentDidMount() {
    this.loadAuthenticationData();
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          handleAuthentication  : this.handleAuthentication,
          loadAuthenticationData: this.loadAuthenticationData,
          isVerifying           : this.state.isVerifying,
          isAuthenticated       : this.state.isAuthenticated,
          login                 : this.login,
          verifyAuthentication  : this.verifyAuthentication,
          accessToken           : this.state.accessToken,
          idToken               : this.state.idToken,
          expiresAt             : this.state.expiresAt,
          payload               : this.state.payload
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthConsumer, AuthProvider };