import PropTypes from 'prop-types';
import React from 'react';
import { IntlProvider } from 'react-intl';

import locales from './locales/lang';

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    this.switchLanguage = (locale) => {
      this.setState({ locale, messages: locales[locale] });
      localStorage.setItem('locale', locale);
    };

    // Setting up language as navigator one.
    let locale = localStorage.getItem('locale');
    if (!locale) {
      locale = 'en';
      const navigatorLang = navigator.language.split('-')[0];
      if (Object.keys(locales).includes(navigatorLang)) {
        locale = navigatorLang;
      }
      localStorage.setItem('locale', locale);
    }

    // pass everything in state to avoid creating object inside render method
    this.state = {
      locale,
      messages: locales[locale],
      switchLanguage: this.switchLanguage, // eslint-disable-line react/no-unused-state
    };
  }

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Context.Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale={locale}
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

IntlProviderWrapper.propTypes = {
  children: PropTypes.shape().isRequired,
};

export { IntlProviderWrapper, Context as IntlContext };
