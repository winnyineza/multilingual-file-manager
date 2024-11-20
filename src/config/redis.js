const Redis = require('redis');
const logger = require('../utils/logger');

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
  retryStrategy: (times) => {
    if (times > 3) {
      logger.error('Redis connection failed multiple times');
      return null;
    }
    return Math.min(times * 100, 3000);
  }
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisClient.on('connect', () => logger.info('Redis Client Connected'));

module.exports = redisClient; 