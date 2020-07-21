import React from 'react';

import './styles.css';

import { BlockchainDatabase } from '@pie-dao/blockchain';
import { eth } from '@pie-dao/eth';
import { render } from 'react-dom';

import App from './App';

import { decimalPlaces, initialize } from './setup/tokens';

const blocknativeDappId = '523b279d-0fe0-42e8-8977-e688c3686e57';

const database = new BlockchainDatabase({ blocknativeDappId });

eth.on('accountChanged', async (message, { account }) => {
  console.log('accountChanged event received', account);

  initialize({ database });

  database.track({ address: account });
});

window.document.addEventListener('DOMContentLoaded', () => {
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

const text = {
  hero: {
    description:
      'Every Hall-of-Fame investor is obsessed with the question of how best to diversify to '
      + 'maximize returns and minimize risks.',
    linkText: 'Start now',
    title: 'Ready to diversify?',
  },
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
  products: {
    title: 'Choose the right diversification strategy for you',

    'AWP++': {
      description:
        'Diversify like Ray Dalio with a portfolio that keeps you safe in all weather. Bonus: '
        + 'with crypto assets.',
      linkText: 'Coming soon',
    },
    'BTC++': {
      description:
        'Diversify your Bitcoin positions among different representations of BTC '
        + '(imBTC, pBTC, sBTC & wBTC)',
      linkText: 'Try it now',
    },
    'USD++': {
      description:
        'Diversify your USD position among different representations of USD, such as DAI, USDC, '
        + 'USDT, etc.',
      linkText: 'Coming soon',
    },
  },
  tldr: {
    description:
      'BTC++ is a weighed allocation between the different representations of Bitcoin on '
      + 'Ethereum. Bitcoin, for DeFi, diversified.',
  },
};

const props = {
  config,
  database,
  images,
  links,
  text,
};

window.database = database;
window.eth = eth;

render(<App {...props} />, document.getElementById('App'));
