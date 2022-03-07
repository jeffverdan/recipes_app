import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';

const Routes = () => (
  <Switch>
    <Route exact to="/" component={ Login } />
  </Switch>
);

export default Routes;
