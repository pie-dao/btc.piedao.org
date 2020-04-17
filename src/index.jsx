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
  hero: './assets/img/hero.png',
};

const links = {
  discord: 'https://discord.gg/eJTYNUF',
  docs: 'https://docs.piedao.org/',
  forum: 'https://forum.piedao.org/',
  github: 'https://github.com/pie-dao/',
  homepage: 'https://docs.piedao.org/',
  liquidity: '#/liquidity',
  medium: 'https://medium.com/piedao',
  twitter: 'https://twitter.com/PieDAO_DeFi?s=20',
  whitepaper: 'https://pie283460.typeform.com/to/uy9NZt',
};

const props = {
  config,
  database,
  images,
  links,
};

window.database = database;
window.eth = eth;

render(<App {...props} />, document.getElementById('App'));
