import BigNumber from 'bignumber.js';
import React from 'react';

import './styles.css';

import { BlockchainDatabase } from '@pie-dao/blockchain';
import { eth } from '@pie-dao/eth';
import { mint } from '@pie-dao/mint';
import { render } from 'react-dom';

import App from './App';

const blocknativeDappId = '523b279d-0fe0-42e8-8977-e688c3686e57';
const simpleIdAppId = '76c97a89-5ff2-4730-beac-3320eed25ded';

const database = new BlockchainDatabase({ blocknativeDappId });
const decimalPlaces = 6;

const { approve } = eth;

const submit = () => {
  const amount = BigNumber(mint.slider).dividedBy(10 ** decimalPlaces);
  console.log('submit', amount.toString()); // TODO: Hook this up to the actual function
};

// TODO: hook this up properly
const mintable = {
  address: '0x3212b29E33587A00FB1C83346f5dBFA69A458923',
  amountPerUnit: BigNumber(1),
  color: '#ffcd1c',
  symbol: 'BTC++',
  weight: BigNumber(100),
};

const tokens = {
  imBTC: {
    address: '0x3212b29E33587A00FB1C83346f5dBFA69A458923',
    amountPerUnit: BigNumber(0.25), // TODO: probably need to get this from the contract / pool
    color: '#1caa98',
    symbol: 'imBTC',
    weight: BigNumber(25),
  },
  pBTC: {
    address: '0x5228a22e72ccc52d415ecfd199f99d0665e7733b',
    amountPerUnit: BigNumber(0.25), // TODO: and this
    color: '#305cee',
    symbol: 'pBTC',
    weight: BigNumber(25),
  },
  sBTC: {
    address: '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6',
    amountPerUnit: BigNumber(0.25), // TODO: and this
    color: '#6f51fd',
    symbol: 'sBTC',
    weight: BigNumber(25),
  },
  wBTC: {
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    amountPerUnit: BigNumber(0.25), // TODO: and this
    color: '#d6099b',
    symbol: 'wBTC',
    weight: BigNumber(25),
  },
};

eth.on('accountChanged', (message, { account }) => {
  console.log('accountChanged event received', account);
  database.track({ address: account });
  if (!mint.initialized) {
    mint.init({
      approve,
      database,
      mintable,
      submit,
      tokens,
    });
  } else {
    // TODO: make this unnecessary
    window.location.reload();
  }
});

eth.init({ blocknativeDappId, simpleIdAppId });

const config = {
  mint: {
    decimalPlaces,
    step: 0.000001,
  },
};

const images = {
  logo: './assets/logo.png',
};

const props = {
  config,
  database,
  images,
};

window.database = database;
window.eth = eth;

render(<App {...props} />, document.getElementById('App'));
