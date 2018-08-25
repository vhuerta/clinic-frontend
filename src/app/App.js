import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import ProtectedRouteHoC from "./auth/ProtectedRouteHoC";
import AuthRoutes from "./auth/AuthRoutes";
import { AuthProvider, AuthConsumer } from "./auth/AuthContext";

const Home = () => (
  <AuthConsumer>
    {({ payload }) => (
      <Fragment>
        <h1>Home {payload.nickname}</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/pacientes">Pacientes</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={() => <h1>Dashboard</h1>} />
          <Route path="/pacientes" exact component={() => <h1>Pacientes</h1>} />
        </Switch>
      </Fragment>
    )}
  </AuthConsumer>
);

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Fragment>
            <Switch>
              <Route path="/auth" component={AuthRoutes} />
              <Route path="/" component={ProtectedRouteHoC(Home)} />
              <Redirect to="/" />
            </Switch>
          </Fragment>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
