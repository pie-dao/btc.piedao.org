import PropTypes from 'prop-types';
import React from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import { view } from '@risingstack/react-easy-state';

const ProductCard = ({
  name, links: { liquidity }, linkText, description, disabled,
}) => {
  const styles = {
    backgroundImage: `url(./assets/img/cards/${name}BG.png)`,
  };

  if (disabled) {
    styles.opacity = '50%';
  }

  const logoStyle = {
    backgroundImage: `url(./assets/img/cards/${name}Icon.png)`,
  };

  const handleClick = () => {
    window.location.href = liquidity;
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
  linkText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const Products = (props) => {
  const { formatMessage } = useIntl();

  return (
    <div className="products-container">
      <div className="content">
        <div className="title">
          <FormattedMessage id="products.title" defaultMessage="Choose the right diversification strategy for you" />
        </div>

        <div className="cards">
          <ProductCard
            {...props}
            name="BTC++"
            description={formatMessage({ id: 'products.btc++.description' })}
            linkText={formatMessage({ id: 'products.btc++.linkText' })}
            disabled={false}
          >
            <FormattedMessage id="products.btc++.description" defaultMessage="Diversify your Bitcoin positions among different representations of BTC (imBTC, pBTC, sBTC & wBTC)" />
            <FormattedMessage id="products.btc++.linkText" defaultMessage="Try it now" />
          </ProductCard>
          <ProductCard
            {...props}
            name="AWP++"
            description={formatMessage({ id: 'products.awp++.description' })}
            linkText={formatMessage({ id: 'products.awp++.linkText' })}
            disabled
          >
            <FormattedMessage id="products.awp++.description" defaultMessage="Diversify like Ray Dalio with a portfolio that keeps you safe in all weather. Bonus: with crypto assets." />
            <FormattedMessage id="products.awp++.linkText" defaultMessage="Coming soon" />
          </ProductCard>
          <ProductCard
            {...props}
            name="USD++"
            description={formatMessage({ id: 'products.usd++.description' })}
            linkText={formatMessage({ id: 'products.usd++.linkText' })}
            disabled
          >
            <FormattedMessage id="products.usd++.description" defaultMessage="Diversify your USD position among different representations of USD, such as DAI, USDC, USDT, etc." />
            <FormattedMessage id="products.usd++.linkText" defaultMessage="Coming soon" />
          </ProductCard>
        </div>
      </div>
    </div>
  );
};

export default view(Products);
