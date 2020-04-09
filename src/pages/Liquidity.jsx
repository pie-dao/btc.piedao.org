import React from 'react';

import { eth } from '@pie-dao/eth';
import { Mint } from '@pie-dao/mint';
import { view } from '@risingstack/react-easy-state';

import PoolBalance from '../components/PoolBalance';

const handleClick = () => {
  window.location.href = 'https://uniswap.exchange/swap?'
    + 'outputCurrency=0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd';
};

const Liquidity = (props) => {
  if (eth.account) {
    return (
      <div className="liquidity-container content">
        <Mint {...props} />
        <PoolBalance {...props} />
        <button className="btn" type="button" onClick={handleClick}>
          or get BTC++ on Uniswap
        </button>
      </div>
    );
  }

  return (
    <div className="liquidity-container content">
      <button className="btn" type="button" onClick={handleClick}>Get BTC++ on Uniswap</button>
    </div>
  );
};

export default view(Liquidity);
