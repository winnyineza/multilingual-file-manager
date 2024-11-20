const express = require('express');
const fileRoutes = require('./fileRoutes');
const userRoutes = require('./userRoutes');
const authMiddleware = require('../middlewares/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Public routes
router.use('/users', userRoutes);

// Protected routes
router.use('/files', authMiddleware, fileRoutes);

// Log all route errors
router.use((err, req, res, next) => {
  logger.error(`Route Error: ${req.method} ${req.url}`, err);
  next(err);
});

module.exports = router; 