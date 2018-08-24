import React, { Component } from 'react';

import {Switch, Redirect, Route} from 'react-router-dom';

import Callback from './Callback';

export default class AuthRoutes extends Component {
  render() {
    return (
      <Switch>
      <Route exact path="/auth/callback" component={Callback} />
      <Redirect to="/auth/callback" />
    </Switch>
    );
  }
}