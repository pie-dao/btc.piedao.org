import React from 'react';

import { HashRouter as Router } from 'react-router-dom';
import { ConnectModal } from '@pie-dao/eth';
import { createBrowserHistory } from 'history';
import { view } from '@risingstack/react-easy-state';

import { IntlProviderWrapper } from './IntlContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';

const instance = createBrowserHistory();

const App = (props) => (
  <Router history={instance}>
    <IntlProviderWrapper>
      <div className="App">
        <Header {...props} />
        <Routes {...props} />
        <Footer {...props} />
        <ConnectModal />
      </div>
    </IntlProviderWrapper>
  </Router>
);

export default view(App);
