import React from 'react';
import { view } from 'react-easy-state';

const year = (new Date()).getFullYear();

const Footer = () => (
  <div className="footer-container">
    <div className="left">
      <span className="footer-link">
        PieDAO&nbsp;
        { year }
      </span>
    </div>
    <div className="right">
      <a
        className="footer-link"
        href="https://discord.gg/eJTYNUF"
        target="_blank"
        rel="noopener noreferrer"
      >
        Discord
      </a>
      <a
        className="footer-link"
        href="https://twitter.com/PieDAO_DeFi?s=20"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <a
        className="footer-link"
        href="https://medium.com/piedao"
        target="_blank"
        rel="noopener noreferrer"
      >
        Medium
      </a>
      <a
        className="footer-link"
        href="https://forum.piedao.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Forum
      </a>
      <a
        className="footer-link"
        href="https://docs.piedao.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Documentation
      </a>
      <a
        className="footer-link"
        href="hhttps://github.com/pie-dao/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <img src="./assets/img/aragon.svg" className="aragon" alt="Aragon" />
    </div>
  </div>
);

export default view(Footer);
