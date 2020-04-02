import BigNumber from 'bignumber.js';
import React from 'react';

import './styles.css';

import { BlockchainDatabase } from '@pie-dao/blockchain';
import { eth } from '@pie-dao/eth';
import { ethers } from 'ethers';
import { mint } from '@pie-dao/mint';
import { pieSmartPool } from '@pie-dao/abis';
import { render } from 'react-dom';

import App from './App';

const blocknativeDappId = '523b279d-0fe0-42e8-8977-e688c3686e57';
const simpleIdAppId = '76c97a89-5ff2-4730-beac-3320eed25ded';

const database = new BlockchainDatabase({ blocknativeDappId });
const decimalPlaces = 6;
const pool = '0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd';

// TODO: hook this up properly
const mintable = {
  address: '0x3212b29E33587A00FB1C83346f5dBFA69A458923',
  amountPerUnit: BigNumber(1),
  color: '#ffcd1c',
  symbol: 'BTC++',
  weight: BigNumber(100),
};

eth.on('accountChanged', async (message, { account }) => {
  console.log('accountChanged event received', account);

  const {
    approve,
    notify,
    signer,
    transactionOverrides,
  } = eth;
  const poolContract = new ethers.Contract(pool, pieSmartPool, signer);
  const poolAmount = ethers.utils.bigNumberify('1000000000000000000');
  const poolAmounts = await poolContract.calcTokensForAmount(poolAmount);

  const mappedAmounts = {};
  poolAmounts[0].forEach((token, index) => {
    mappedAmounts[token.toLowerCase()] = poolAmounts[1][index].toString();
  });

  const imBTCAddress = '0x3212b29E33587A00FB1C83346f5dBFA69A458923'.toLowerCase();
  const pBTCAddress = '0x5228a22e72ccc52d415ecfd199f99d0665e7733b'.toLowerCase();
  const sBTCAddress = '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6'.toLowerCase();
  const wBTCAddress = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'.toLowerCase();

  const tokens = {
    imBTC: {
      address: imBTCAddress,
      amountPerUnit: BigNumber(mappedAmounts[imBTCAddress]).dividedBy(10 ** 8),
      color: '#1caa98',
      symbol: 'imBTC',
      weight: BigNumber(25),
    },
    pBTC: {
      address: pBTCAddress,
      amountPerUnit: BigNumber(mappedAmounts[pBTCAddress]).dividedBy(10 ** 18),
      color: '#305cee',
      symbol: 'pBTC',
      weight: BigNumber(25),
    },
    sBTC: {
      address: sBTCAddress,
      amountPerUnit: BigNumber(mappedAmounts[sBTCAddress]).dividedBy(10 ** 18),
      color: '#6f51fd',
      symbol: 'sBTC',
      weight: BigNumber(25),
    },
    wBTC: {
      address: wBTCAddress,
      amountPerUnit: BigNumber(mappedAmounts[wBTCAddress]).dividedBy(10 ** 8),
      color: '#d6099b',
      symbol: 'wBTC',
      weight: BigNumber(25),
    },
  };

  console.log('TOKEN CONFIG', tokens);

  const submit = async () => {
    const amount = BigNumber(mint.slider).dividedBy(10 ** decimalPlaces).multipliedBy(10 ** 18);

    await approve({ spender: pool, token: imBTCAddress });
    await approve({ spender: pool, token: pBTCAddress });
    await approve({ spender: pool, token: sBTCAddress });
    await approve({ spender: pool, token: wBTCAddress });

    const overrides = transactionOverrides({ gasLimit: 1000000 });
    notify(await poolContract.joinPool(ethers.utils.bigNumberify(amount.toFixed()), overrides));
  };

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
  pool,
};

window.database = database;
window.eth = eth;

render(<App {...props} />, document.getElementById('App'));
