import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import ProtectedRouteHoC from "./auth/ProtectedRouteHoC";
import AuthRoutes from "./auth/AuthRoutes";
import SecuredRoutes from "./secured/SecuredRoutes";
import { AuthProvider } from "./auth/AuthContext";

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Fragment>
            <Switch>
              <Route path="/auth" component={AuthRoutes} />
              <Route path="/" component={ProtectedRouteHoC(SecuredRoutes)} />
              <Redirect to="/" />
            </Switch>
          </Fragment>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
