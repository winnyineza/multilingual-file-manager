const express = require('express');
const i18nextMiddleware = require('i18next-express-middleware');
const i18nConfig = require('./config/i18n');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// i18n middleware
app.use(i18nextMiddleware.handle(i18nConfig));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: req.t('not_found') });
});

module.exports = app;