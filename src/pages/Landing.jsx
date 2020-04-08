/* eslint arrow-body-style: 0 */

import React from 'react';
import { eth } from '@pie-dao/eth';
import { store, view } from '@risingstack/react-easy-state';

import Hero from '../components/Hero';
import Products from '../components/Products';
import TLDR from '../components/TLDR';

const state = store({
  account: undefined,
});

eth.on('accountChanged', (message, { account }) => {
  state.account = account;
});

const Landing = (props) => (
  <div className="landing-container">
    <span>
      <Hero {...props} />
      <TLDR {...props} />
      <Products {...props} />
    </span>
  </div>
);

export default view(Landing);
