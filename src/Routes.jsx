import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { view } from '@risingstack/react-easy-state';

import Landing from './pages/Landing';
import Liquidity from './pages/Liquidity';

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Landing {...props} />
    </Route>
    <Route exact path="/liquidity">
      <Liquidity {...props} />
    </Route>
  </Switch>
);

export default view(Routes);
