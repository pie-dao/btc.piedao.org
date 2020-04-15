import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { view } from '@risingstack/react-easy-state';

const year = (new Date()).getFullYear();

const Footer = ({
  links: {
    discord,
    docs,
    forum,
    github,
    medium,
    twitter,
  },
}) => (
  <div className="footer-container">
    <div className="left">
      <span className="footer-link">
        PieDAO&nbsp;
        { year }
      </span>
    </div>
    <div className="right">
      <a
        className="footer-link capitalize"
        href={discord}
        target="_blank"
        rel="noopener noreferrer"
      >
        Discord
      </a>
      <a
        className="footer-link capitalize"
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <a
        className="footer-link capitalize"
        href={medium}
        target="_blank"
        rel="noopener noreferrer"
      >
        Medium
      </a>
      <a
        className="footer-link capitalize"
        href={forum}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="footer.forum" defaultMessage="forum" />
      </a>
      <a
        className="footer-link capitalize"
        href={docs}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="footer.documentation" defaultMessage="documentation" />
      </a>
      <a
        className="footer-link capitalize"
        href={github}
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <img src="./assets/img/aragon.svg" className="aragon" alt="Aragon" />
    </div>
  </div>
);


Footer.propTypes = {
  links: PropTypes.shape({
    discord: PropTypes.string.isRequired,
    docs: PropTypes.string.isRequired,
    forum: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
  }).isRequired,
};


export default view(Footer);
