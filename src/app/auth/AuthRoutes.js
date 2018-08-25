import React, { Component } from 'react';

import {Switch, Redirect, Route} from 'react-router-dom';

import CallbackView from './CallbackView';

export default class AuthRoutes extends Component {
  render() {
    return (
      <Switch>
      <Route exact path="/auth/callback" component={CallbackView} />
      <Redirect to="/auth/callback" />
    </Switch>
    );
  }
}