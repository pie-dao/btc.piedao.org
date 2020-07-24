/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { validateIsBigNumber, shortenAddress } from '@pie-dao/utils';
import { eth } from '@pie-dao/eth';
import { erc20 } from '@pie-dao/abis';
import BigNumber from 'bignumber.js';
import { Link } from 'react-router-dom';
import { store, view } from '@risingstack/react-easy-state';
import { useWallet } from 'use-wallet';

const headerStore = store({
  toggle: () => {
    headerStore.mobileMenuVisible = !headerStore.mobileMenuVisible;
  },
  mobileMenuVisible: false,
});

const logPrefix = (functionName) => `@pie-dao/eth - eth#${functionName}`;

const Header = ({ images, links }) => {
  const wallet = useWallet();
  const blocknativeDappId = '523b279d-0fe0-42e8-8977-e688c3686e57';
  const simpleIdAppId = '76c97a89-5ff2-4730-beac-3320eed25ded';

  if (wallet.account && eth.account === undefined) {
    console.log('eth', eth);
    eth.init({ blocknativeDappId, simpleIdAppId });

    eth.approve = async ({ spender, token, amount = ethers.constants.MaxUint256 }) => {
      const {
        account,
        signer,
        transactionOverrides,
      } = eth;

      const prefix = logPrefix('approve');

      if (!account) {
        eth.setError('Your wallet must be connected before you can approve an asset for transfer.');
      }

      const value = BigNumber(amount.toString());

      validateIsBigNumber(value, { prefix });

      const contract = new ethers.Contract(token, erc20, signer);
      const allowance = await contract.allowance(account, spender);

      if (allowance.isZero()) {
        const amt = ethers.BigNumber.from(value.toFixed());
        const overrides = transactionOverrides({ gasLimit: 100000 });
        eth.notify(await contract.approve(spender, amt, overrides));
      }
    };

    eth.initializeAccount = async (account, chainId) => {
      if (eth.chainId !== chainId) {
        eth.wrongNetworkError();
        return;
      }

      if (!account) {
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      eth.account = account;
      eth.provider = provider;
      eth.signer = provider.getSigner();

      // eslint-disable-next-line no-undef
      PubSub.publish('accountChanged', { account });
    };
    eth.initializeAccount(wallet.account, 1);
  }

  const activate = async (connector) => {
    try {
      await wallet.activate(connector);
    } catch (err) {
      console.log(err.message);
    }
  };

  const { docs, homepage } = links;
  const { logo } = images;
  const { mobileMenuVisible, toggle } = headerStore;

  const shortAddress = eth.account ? shortenAddress(eth.account) : '';
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

        <div
          className="btn connect-button-container"
          onClick={() => activate('injected')}
          role="button"
          tabIndex="-100"
        >
          {eth.account ? (
            <>
              <p>{shortAddress}</p>
              <div className="icon-container">
                <div className="image-container" />
              </div>
            </>
          ) : (
              'Connect Web3'
            )}
        </div>

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
  }).isRequired,
};

export default view(Header);
