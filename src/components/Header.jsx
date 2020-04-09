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
  const { logo } = images;

  const { mobileMenuVisible } = headerStore;
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
          href={links.homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          docs
        </a>
        <a
          className="link"
          href={links.whitepaper}
          target="_blank"
          rel="noopener noreferrer"
        >
          whitepaper
        </a>
        <ConnectButton />
        <div className="mobile-placeholder" />

        <button className="hamburger" type="button" onClick={headerStore.toggle}>
          <img src="./assets/img/hamburgerIcon.svg" alt="hamburger icon" className="w-min-20px" />
        </button>
        {mobileMenuVisible && (
          <div className="overlay">
            <button type="button" className="close" onClick={headerStore.toggle}>
              Close
            </button>
            <nav>
              <ul>
                <li>
                  <Link
                    onClick={headerStore.toggle}
                    to="/"
                  >
                    home
                  </Link>
                </li>
                <li>
                  <a
                    onClick={headerStore.toggle}
                    className="navbar-item"
                    href={links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    docs
                  </a>
                </li>
                <li>
                  <a
                    onClick={headerStore.toggle}
                    className="navbar-item"
                    href={links.whitepaper}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    whitepaper
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
    homepage: PropTypes.string.isRequired,
    whitepaper: PropTypes.string.isRequired,
    docs: PropTypes.string.isRequired,
  }).isRequired,
};

export default view(Header);
