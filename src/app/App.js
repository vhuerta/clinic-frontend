import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import protectedRoute from "./auth/protectedRoute";
import Callback from "./auth/Callback";
import { AuthProvider, AuthConsumer } from "./auth/AuthContext";

const Home = () => (
  <AuthConsumer>
    {({ payload }) => <h1>Home {payload.nickname}</h1>}
  </AuthConsumer>
);
const Auth = () => (
  <Fragment>
    <Switch>
      <Route exact path="/auth/callback" component={Callback} />
      <Redirect to="/auth/callback" />
    </Switch>
  </Fragment>
);

class App extends Component {
  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <Router>
        <AuthProvider>
          <Fragment>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/" component={protectedRoute(Home)} />
              <Redirect to="/" />
            </Switch>
          </Fragment>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
