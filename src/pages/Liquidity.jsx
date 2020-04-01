import React from 'react';
import { Mint } from '@pie-dao/mint';
import { view } from '@risingstack/react-easy-state';

const Liquidity = (props) => (
  <div className="liquidity-container">
    <Mint {...props} />
  </div>
);

export default view(Liquidity);
