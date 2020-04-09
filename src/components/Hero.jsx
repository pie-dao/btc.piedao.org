import PropTypes from 'prop-types';
import React from 'react';

import { view } from '@risingstack/react-easy-state';

const Hero = ({
  images: { hero },
  links: { liquidity },
  text: { hero: { description, linkText, title } },
}) => (
  <div className="hero-container">
    <div className="content">
      <div className="title">
        {title}
      </div>

      <img src={hero} alt="hero" />

      <div className="subtitle">
        {description}
      </div>

      <a className="btn" href={liquidity}>
        {linkText}
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
  text: PropTypes.shape({
    hero: PropTypes.shape({
      description: PropTypes.string.isRequired,
      linkText: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default view(Hero);
