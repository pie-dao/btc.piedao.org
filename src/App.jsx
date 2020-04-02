import React from 'react';

import { HashRouter as Router } from 'react-router-dom';
import { ConnectModal } from '@pie-dao/eth';
import { createBrowserHistory } from 'history';
import { view } from '@risingstack/react-easy-state';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';

const instance = createBrowserHistory();

const App = (props) => (
  <Router history={instance}>
    <div className="App">
      <Header {...props} />
      <Routes {...props} />
      <Footer {...props} />
      <ConnectModal />
    </div>
  </Router>
);

export default view(App);
