import PropTypes from 'prop-types';
import React from 'react';

import { eth } from '@pie-dao/eth';
import { view } from '@risingstack/react-easy-state';

const ProductCard = ({ name, links: { liquidity }, text: { products } }) => {
  const { account, enable } = eth;
  const { description, linkText } = products[name];

  const styles = {
    backgroundImage: `url(./assets/img/cards/${name}BG.png)`,
  };

  if (linkText === 'Coming soon') {
    styles.opacity = '50%';
  }

  const logoStyle = {
    backgroundImage: `url(./assets/img/cards/${name}Icon.png)`,
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (account) {
      window.location.href = liquidity;
      return;
    }

    enable().then(() => {
      window.location.href = liquidity;
    });
  };

  return (
    <div className="product-card-container" style={styles}>
      <div className="logo" style={logoStyle} />
      <div className="title">
        {name}
      </div>
      <div className="description">
        {description}
      </div>
      <button
        className="btn"
        disabled={linkText === 'Coming soon'}
        onClick={handleClick}
        type="button"
      >
        {linkText}
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  links: PropTypes.shape({
    liquidity: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.shape({
    products: PropTypes.object.isRequired,
  }).isRequired,
};

const Products = (props) => {
  const { text: { products: { title } } } = props;

  return (
    <div className="products-container">
      <div className="content">
        <div className="title">
          {title}
        </div>

        <div className="cards">
          <ProductCard {...props} name="BTC++" />
          <ProductCard {...props} name="AWP++" />
          <ProductCard {...props} name="CASH++" />
        </div>
      </div>
    </div>
  );
};

Products.propTypes = {
  text: PropTypes.shape({
    products: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default view(Products);
