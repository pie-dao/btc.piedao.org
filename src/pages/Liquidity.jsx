import React from 'react';
// import { eth } from '@pie-dao/eth';
// import { Mint } from '@pie-dao/mint';
import { view } from '@risingstack/react-easy-state';

// import PoolBalance from '../components/PoolBalance';
/*
const handleClick = () => {
  window.location.href = 'https://uniswap.exchange/swap?'
    + 'outputCurrency=0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd';
};

const handleClickBalancer = () => {
  window.location.href = 'https://balancer.exchange/#/swap/ether/0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd';
};
*/
const Liquidity = () => {
  const url = 'https://pools.piedao.org/#/pools/0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd';
  window.location.href = url;

  /*
  if (eth.account) {
    return (
      <div className="liquidity-container content">
        <Mint {...props} />
        <PoolBalance {...props} />
        <button className="btn" type="button" onClick={handleClick}>
          or get BTC++ on Uniswap
        </button>
        <button className="btn" type="button" onClick={handleClickBalancer}>
          or get BTC++ on Balancer
        </button>
      </div>
    );
  }

  return (
    <div className="liquidity-container content">
      <button className="btn" type="button" onClick={handleClick}>Get BTC++ on Uniswap</button>
      <button className="btn" type="button" onClick={handleClickBalancer}>
        Get BTC++ on Balancer
      </button>
    </div>

  );
  */
  return (
    <center>
      Redirecting to
      <br />
      <a href={url}>{url}</a>
    </center>
  );
};

export default view(Liquidity);
