const i18next = require('i18next');

const i18nConfig = {
  fallbackLng: 'en',
  resources: {
    en: { translation: require('../translations/en.json') },
    es: { translation: require('../translations/es.json') }
  }
};

i18next.init(i18nConfig);

module.exports = i18next; 