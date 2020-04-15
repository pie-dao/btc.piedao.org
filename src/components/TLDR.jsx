import React from 'react';

import { FormattedMessage } from 'react-intl';
import { view } from '@risingstack/react-easy-state';

const TLDR = () => (
  <div className="tldr-container">
    <div className="content">
      <div className="description">
        <FormattedMessage id="tldr.description" defaultMessage="BTC++ is a weighed allocation between the different representations of Bitcoin on Ethereum. Bitcoin, for DeFi, diversified." />
      </div>
    </div>
  </div>
);

export default view(TLDR);
