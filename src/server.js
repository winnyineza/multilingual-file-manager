require('dotenv').config();
const app = require('./app');
const logger = require('./utils/logger');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Ensure Redis connection
    await redisClient.connect();
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});