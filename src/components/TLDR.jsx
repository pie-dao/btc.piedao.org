import PropTypes from 'prop-types';
import React from 'react';

import { view } from '@risingstack/react-easy-state';

const TLDR = ({ text: { tldr: { description } } }) => (
  <div className="tldr-container">
    <div className="content">
      <div className="description">
        {description}
      </div>
    </div>
  </div>
);

TLDR.propTypes = {
  text: PropTypes.shape({
    tldr: PropTypes.shape({
      description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default view(TLDR);
