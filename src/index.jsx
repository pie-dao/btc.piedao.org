import React from 'react';

import './styles.css';

import { BlockchainDatabase } from '@pie-dao/blockchain';
import { eth } from '@pie-dao/eth';
import { render } from 'react-dom';

import App from './App';

import { decimalPlaces, initialize } from './setup/tokens';

const blocknativeDappId = '523b279d-0fe0-42e8-8977-e688c3686e57';
const simpleIdAppId = '76c97a89-5ff2-4730-beac-3320eed25ded';

const database = new BlockchainDatabase({ blocknativeDappId });

eth.on('accountChanged', async (message, { account }) => {
  console.log('accountChanged event received', account);

  initialize({ database });

  database.track({ address: account });
});

window.document.addEventListener('DOMContentLoaded', () => {
  eth.init({ blocknativeDappId, simpleIdAppId });
});

const config = {
  mint: {
    decimalPlaces,
    step: 0.000001,
  },
};

const images = {
  logo: './assets/logo.png',
};

const text = {
  mint: {
    descriptor: 'Liquidity',
    chartHeader: 'Allocation',
    liquidityText:
      '<h1>WARNING! - BETA PRODUCT!</h1>'
      + '<p>BTC++ has not yet been audited. Balancer Pools are newly launched.</p>'
      + '<p>DeFi products, and this product in particular are risky.</p>'
      + '<p>Use at your own risk.</p>',
    verb: 'Add',
  },
};

const props = {
  config,
  database,
  images,
  text,
};

window.database = database;
window.eth = eth;

render(<App {...props} />, document.getElementById('App'));
