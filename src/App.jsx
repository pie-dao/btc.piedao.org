import React from 'react';

import { HashRouter as Router } from 'react-router-dom';
import { ConnectModal } from '@pie-dao/eth';
import { createBrowserHistory } from 'history';
import { view } from '@risingstack/react-easy-state';
import { UseWalletProvider } from 'use-wallet';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';

const instance = createBrowserHistory();

const App = (props) => (
  <UseWalletProvider
    chainId={1}
    connectors={{
      walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
      walletlink: { url: 'https://mainnet.eth.aragon.network/' },
    }}
  >
    <Router history={instance}>
      <div className="App">
        <Header {...props} />
        <Routes {...props} />
        <Footer {...props} />
        <ConnectModal />
      </div>
    </Router>
  </UseWalletProvider>
);

export default view(App);
