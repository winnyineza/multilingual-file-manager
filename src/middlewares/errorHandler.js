const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Error:', err);

  // Operational, trusted error: send message to client
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: req.t(err.message) || err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Handle Mongoose/MongoDB errors
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'fail',
      message: req.t('invalid_data_format')
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: Object.values(err.errors).map(e => e.message).join(', ')
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: req.t('invalid_token')
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'fail',
      message: req.t('token_expired')
    });
  }

  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      status: 'fail',
      message: req.t('file_too_large')
    });
  }

  // Programming or unknown errors: don't leak error details
  console.error('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? req.t('error_occurred')
      : err.message
  });
};

module.exports = errorHandler; 