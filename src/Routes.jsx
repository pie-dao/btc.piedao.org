import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { view } from 'react-easy-state';

import Landing from './pages/Landing';

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Landing {...props} />
    </Route>
  </Switch>
);

export default view(Routes);
