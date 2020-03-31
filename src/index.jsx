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

const { approve } = eth;

const submit = (...args) => {
  console.log('submit', ...args); // TODO: Hook this up to the actual function
};

// TODO: hook this up properly
const mintable = {
  address: '0x3212b29E33587A00FB1C83346f5dBFA69A458923',
  amountPerUnit: BigNumber(1),
  symbol: 'BTC++',
  weight: BigNumber(100),
};

const tokens = {
  imBTC: {
    address: '0x3212b29E33587A00FB1C83346f5dBFA69A458923',
    amountPerUnit: BigNumber(0.35), // TODO: probably need to get this from the contract / pool
    symbol: 'imBTC',
    weight: BigNumber(35),
  },
  pBTC: {
    address: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
    amountPerUnit: BigNumber(0.1), // TODO: and this
    symbol: 'pBTC',
    weight: BigNumber(10),
  },
  sBTC: {
    address: '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6',
    amountPerUnit: BigNumber(0.2), // TODO: and this
    symbol: 'sBTC',
    weight: BigNumber(20),
  },
  wBTC: {
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    amountPerUnit: BigNumber(0.35), // TODO: and this
    symbol: 'wBTC',
    weight: BigNumber(35),
  },
};

eth.on('addressChanged', (message, { address }) => {
  console.log('addressChanged event received', address);
  database.track({ address });
  if (!mint.initialized) {
    mint.init({
      approve,
      database,
      mintable,
      submit,
      tokens,
    });
  }
});

eth.init({ blocknativeDappId, simpleIdAppId });

const images = {
  logo: './assets/logo.png',
};

const props = {
  images,
};

window.database = database;
window.eth = eth;

render(<App {...props} />, document.getElementById('App'));
