const Queue = require('bull');
const processFile = require('./processors/fileProcessor');
const logger = require('../utils/logger');

const fileQueue = new Queue('file-processing', process.env.REDIS_URL);

fileQueue.on('completed', (job) => {
  logger.info(`Job ${job.id} completed`);
});

fileQueue.on('failed', (job, err) => {
  logger.error(`Job ${job.id} failed`, err);
});

fileQueue.process('processFile', processFile);

module.exports = fileQueue; 