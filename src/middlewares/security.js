const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

const securityMiddleware = [
  helmet(),
  cors(),
  xss(),
  limiter
];

module.exports = securityMiddleware; 