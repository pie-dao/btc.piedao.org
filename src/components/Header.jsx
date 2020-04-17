import React from 'react';
import PropTypes from 'prop-types';

import { ConnectButton } from '@pie-dao/eth';
import { useIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { store, view } from '@risingstack/react-easy-state';
import { IntlContext } from '../IntlContext';

import locales from '../locales/lang';

const headerStore = store({
  toggleMobileMenu: () => {
    headerStore.mobileMenuVisible = !headerStore.mobileMenuVisible;
  },
  mobileMenuVisible: false,

  toggleLanguageMenu: () => {
    headerStore.languageMenuVisible = !headerStore.languageMenuVisible;
  },
  languageMenuVisible: false,
});

const Header = ({ images, links }) => {
  const { docs, homepage, whitepaper } = links;
  const { logo } = images;
  const {
    mobileMenuVisible, toggleMobileMenu, languageMenuVisible, toggleLanguageMenu,
  } = headerStore;

  const intl = useIntl();
  const { switchLanguage } = React.useContext(IntlContext);

  return (
    <div className="header-container">
      <div className="left">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="right">
        <div className="relative">
          <button type="button" className="relative z-10 block link" onClick={toggleLanguageMenu}>
            {intl.locale}
            <span className="ml-1" style={{ fontSize: '0.5rem' }}>&#9660;</span>
          </button>
          {languageMenuVisible && (
            <button onClick={toggleLanguageMenu} className="fixed inset-0 h-full w-full bg-black opacity-60 cursor-default" tabIndex="-1" type="button">&nbsp;</button>
          )}
          {languageMenuVisible && (
            <div className="absolute left-0 ml-8 bg-white shadow-xl">
              {Object.keys(locales).map((locale) => {
                if (locale === intl.locale) return false;
                return <button type="button" className="block px-4 py-2" onClick={() => { toggleLanguageMenu(); switchLanguage(locale); }} key={locale}>{locale}</button>;
              })}
            </div>
          )}
        </div>

        <a
          className="link"
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="header.docs" defaultMessage="docs" />
        </a>
        <a
          className="link"
          href={whitepaper}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="header.whitepaper" defaultMessage="whitepaper" />
        </a>
        <ConnectButton />
        <div className="mobile-placeholder" />

        <button className="hamburger" type="button" onClick={toggleMobileMenu}>
          <img src="./assets/img/hamburgerIcon.svg" alt="hamburger icon" className="w-min-20px" />
        </button>
        {mobileMenuVisible && (
          <div className="overlay">
            <button type="button" className="close" onClick={toggleMobileMenu}>
              <FormattedMessage id="header.hamburger.close" defaultMessage="close" />
            </button>
            <nav>
              <ul>
                <li>
                  <Link
                    onClick={toggleMobileMenu}
                    to="/"
                  >
                    <FormattedMessage id="header.hamburger.home" defaultMessage="home" />
                  </Link>
                </li>
                <li>
                  <a
                    onClick={toggleMobileMenu}
                    className="navbar-item"
                    href={docs}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FormattedMessage id="header.hamburger.docs" defaultMessage="docs" />
                  </a>
                </li>
                <li>
                  <a
                    onClick={toggleMobileMenu}
                    className="navbar-item"
                    href={whitepaper}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FormattedMessage id="header.hamburger.whitepaper" defaultMessage="whitepaper" />
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
