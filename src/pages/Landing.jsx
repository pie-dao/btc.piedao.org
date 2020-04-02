/* eslint arrow-body-style: 0 */

import React from 'react';
import { eth } from '@pie-dao/eth';
import { If } from '@pie-dao/if-unless';
import { store, view } from '@risingstack/react-easy-state';

const state = store({
  account: undefined,
});

eth.on('accountChanged', (message, { account }) => {
  state.account = account;
});

const Landing = () => {
  const { account } = state;

  return (
    <div className="landing-container">
      <span>
        Welcome to PieDAO. Something is coming soon...
        <If condition={!!account}>
          <br />
          <a href="/#/liquidity">Liquidity</a>
        </If>
      </span>
    </div>
  );
};

export default view(Landing);
