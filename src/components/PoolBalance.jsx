import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import React from 'react';

import { BlockchainDatabase } from '@pie-dao/blockchain';
import { eth } from '@pie-dao/eth';
import { store, view } from '@risingstack/react-easy-state';

import { controllerAddress } from '../setup/tokens';

const poolBalance = store({
  account: '',
  address: '',
  balance: BigNumber(0),
  symbol: '',

  init: async ({ account, database }) => {
    if (poolBalance.address) {
      return;
    }

    const { symbol } = await database.contract(controllerAddress);

    poolBalance.address = controllerAddress;
    poolBalance.symbol = symbol;

    database.subscribe(`${account}.${controllerAddress}.balance`, (message, { balance }) => {
      poolBalance.balance = balance;
    });

    database.balance({ address: account, token: controllerAddress });
  },
});

eth.on('accountChanged', (message, { account }) => {
  console.log('AccountChanged PoolBalance', account);
  poolBalance.account = account;
});

const PoolBalance = ({ database }) => {
  const { account, balance, symbol } = poolBalance;

  if (!account) {
    return '';
  }

  poolBalance.init({ account, database });

  if (balance.isZero()) {
    return '';
  }

  return (
    <div className="pool-balance-container">
      <h1>
        Balance:
        &nbsp;
        {balance.toFixed()}
        &nbsp;
        {symbol}
      </h1>
    </div>
  );
};

PoolBalance.propTypes = {
  database: PropTypes.instanceOf(BlockchainDatabase).isRequired,
};

export default view(PoolBalance);
