import React from 'react';
import PropTypes from 'prop-types';

import { ConnectButton } from '@pie-dao/eth';
import { Link } from 'react-router-dom';
import { store, view } from '@risingstack/react-easy-state';

const headerStore = store({
  toggle: () => {
    headerStore.mobileMenuVisible = !headerStore.mobileMenuVisible;
  },
  mobileMenuVisible: false,
});

const Header = ({ images, links }) => {
  const { docs, homepage } = links;
  const { logo } = images;
  const { mobileMenuVisible, toggle } = headerStore;

  return (
    <div className="header-container">
      <div className="left">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="right">
        <a
          className="link"
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          docs
        </a>
        <ConnectButton />
        <div className="mobile-placeholder" />

        <button className="hamburger" type="button" onClick={toggle}>
          <img src="./assets/img/hamburgerIcon.svg" alt="hamburger icon" className="w-min-20px" />
        </button>
        {mobileMenuVisible && (
          <div className="overlay">
            <button type="button" className="close" onClick={toggle}>
              Close
            </button>
            <nav>
              <ul>
                <li>
                  <Link
                    onClick={toggle}
                    to="/"
                  >
                    home
                  </Link>
                </li>
                <li>
                  <a
                    onClick={toggle}
                    className="navbar-item"
                    href={docs}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    docs
                  </a>
                </li>
                <li>
                  <ConnectButton />
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  images: PropTypes.shape({
    logo: PropTypes.string.isRequired,
  }).isRequired,
  links: PropTypes.shape({
    docs: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    whitepaper: PropTypes.string.isRequired,
  }).isRequired,
};

export default view(Header);
