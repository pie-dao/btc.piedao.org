import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import React from 'react';

import { BlockchainDatabase } from '@pie-dao/blockchain';
import { eth } from '@pie-dao/eth';
import { store, view } from '@risingstack/react-easy-state';

const poolBalance = store({
  account: '',
  address: '',
  balance: BigNumber(0),
  symbol: '',

  init: async ({ account, address, database }) => {
    if (poolBalance.address) {
      return;
    }

    const { symbol } = await database.contract(address);

    poolBalance.address = address;
    poolBalance.symbol = symbol;

    database.subscribe(`${account}.${address}.balance`, (message, { balance }) => {
      poolBalance.balance = balance;
    });

    database.balance({ address: account, token: address });
  },
});

eth.on('accountChanged', (message, { account }) => {
  console.log('AccountChanged PoolBalance', account);
  poolBalance.account = account;
});

const PoolBalance = ({ database, pool }) => {
  const { account, balance, symbol } = poolBalance;

  if (!account) {
    return '';
  }

  poolBalance.init({ account, database, address: pool });

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
  pool: PropTypes.string.isRequired,
};

export default view(PoolBalance);
