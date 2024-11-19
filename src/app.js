const express = require('express');
const userRoutes = require('./routes/userRoutes');
const i18nextMiddleware = require('i18next-express-middleware');
const i18next = require('i18next');
const dotenv = require('dotenv');

dotenv.config();

i18next.use(i18nextMiddleware.LanguageDetector).init({
  fallbackLng: 'en',
  resources: {
    en: { translation: require('./translations/en.json') },
    es: { translation: require('./translations/es.json') },
  },
});

const app = express();
app.use(express.json());
app.use(i18nextMiddleware.handle(i18next));
app.use('/api/users', userRoutes);

module.exports = app;