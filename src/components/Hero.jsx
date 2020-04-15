import PropTypes from 'prop-types';
import React from 'react';

import { FormattedMessage } from 'react-intl';

import { view } from '@risingstack/react-easy-state';

const Hero = ({
  images: { hero },
  links: { liquidity },
}) => (
  <div className="hero-container">
    <div className="content">
      <div className="title">
        <FormattedMessage id="hero.title" defaultMessage="Ready to diversify?" />
      </div>

      <img src={hero} alt="hero" />

      <div className="subtitle">
        <FormattedMessage id="hero.description" defaultMessage="Every Hall-of-Fame investor is obsessed with the question of how best to diversify to maximize returns and minimize risks." />
      </div>

      <a className="btn" href={liquidity}>
        <FormattedMessage id="hero.linktext" defaultMessage="Start now" />
      </a>
    </div>
  </div>
);

Hero.propTypes = {
  images: PropTypes.shape({
    hero: PropTypes.string.isRequired,
  }).isRequired,
  links: PropTypes.shape({
    liquidity: PropTypes.string.isRequired,
  }).isRequired,
};

export default view(Hero);
