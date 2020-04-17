const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  languages: ['en', 'es', 'ca'], // any language you need
  messagesDirectory: 'src/locales/extractedMessages',
  singleMessagesFile: true,
  translationsDirectory: 'src/locales/lang/',
});
