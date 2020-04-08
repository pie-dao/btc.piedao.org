import React from 'react';

import { Mint } from '@pie-dao/mint';
import { view } from '@risingstack/react-easy-state';

import PoolBalance from '../components/PoolBalance';

const Liquidity = (props) => (
  <div className="liquidity-container content">
    <Mint {...props} />
    <PoolBalance {...props} />
  </div>
);

export default view(Liquidity);
